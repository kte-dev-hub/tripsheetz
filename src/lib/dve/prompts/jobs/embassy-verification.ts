import type { Embassy, ManagerSource } from '../../types';

export function buildEmbassyVerificationPrompt(
  countryCode: string,
  countryName: string,
  currentEmbassies: Embassy[],
  sources: ManagerSource[]
): string {
  const embassyData = currentEmbassies.length > 0
    ? currentEmbassies.map((e) => `
  - ID: ${e.id}
    nationality_code: ${e.nationality_code}
    type: ${e.type}
    official_name: ${e.official_name || 'NULL'}
    city: ${e.city}
    address: ${e.address}
    local_address: ${e.local_address || 'NULL'}
    phone: ${e.phone || 'NULL'}
    emergency_phone: ${e.emergency_phone || 'NULL'}
    email: ${e.email || 'NULL'}
    website: ${e.website || 'NULL'}
    google_maps_url: ${e.google_maps_url || 'NULL'}
    verified: ${e.verified}
    last_verified: ${e.last_verified || 'NULL'}`).join('\n')
    : '  (No embassy records currently in database for this country)';

  const tier1Sources = sources.filter(s => s.source_tier === 1);
  const tier2Sources = sources.filter(s => s.source_tier === 2);
  const tier3Sources = sources.filter(s => s.source_tier === 3);

  const sourceText = `
### Tier 1 Sources (use for values):
${tier1Sources.map(s => `- ${s.country_code}: ${s.source_name} — ${s.source_url}${s.notes ? ` (${s.notes})` : ''}`).join('\n')}

### Tier 2 Sources (cross-reference only):
${tier2Sources.map(s => `- ${s.source_name} — ${s.source_url}${s.notes ? ` (${s.notes})` : ''}`).join('\n')}

### Tier 3 Sources (BANNED — never use):
${tier3Sources.map(s => `- ${s.source_name} — ${s.source_url}`).join('\n')}`;

  const nationalityCodes = [...new Set(currentEmbassies.map(e => e.nationality_code))];
  const today = new Date().toISOString().split('T')[0];

  return `
## JOB: embassy_verification (v1)

### TASK
Verify all embassy and consulate records for ${countryName} (${countryCode}) as a DESTINATION country. This means verifying all foreign embassies and consulates that are located IN ${countryName}.

### NATIONALITY GROUPS TO VERIFY
The database currently contains records for these nationality groups in ${countryName}: ${nationalityCodes.length > 0 ? nationalityCodes.join(', ') : 'NONE — this country has no embassy data yet'}.

${nationalityCodes.length === 0 ? `Since there are no records yet, you must research from scratch. For each nationality group that has a Tier 1 source listed below, search for their diplomatic missions in ${countryName} and report them as ADD findings.` : ''}

### KNOWN SOURCES
${sourceText}

### CURRENT DATABASE RECORDS
${embassyData}

### STEP 1 — COMPLETENESS CHECK

For EACH nationality_code that has a Tier 1 source listed above:

1. Search for the official list of that nationality's diplomatic missions in ${countryName}
2. Use the Tier 1 source for that nationality (the sending country's MFA/MOFA website)
3. If available, cross-reference with ${countryName}'s foreign ministry directory (Tier 2)
4. Compare against what's in the database
5. Identify:
   - Missing posts (exist in reality but not in database) → ADD finding
   - Posts that should be removed (closed, downgraded, or honorary consulates) → REMOVE finding
   - Honorary consulates incorrectly included → REMOVE finding

SCOPE RULES:
- IN scope: Career diplomatic posts — embassies, high commissions, consulates-general, consulates
- OUT of scope: Honorary consulates (limited services, change frequently, run by private citizens)

How to identify honorary consulates: Government directories label them as "Honorary Consul" or "Honorary Consul-General" with an individual's name. Career posts list multiple staff with diplomatic titles.

### STEP 2 — FIELD-BY-FIELD VERIFICATION

For EACH existing row in the database, verify every field:

1. **official_name** — Full diplomatic title from official source (e.g., "Embassy of the United States of America" not "US Embassy")
2. **address** — Exact match to official website contact page. English, include suite/level/floor. KEEP floor, level, suite, and unit numbers in addresses. Addresses like "Level 19, 44 Market Street, Sydney, NSW 2000" are correct and intentional — TripSheetz includes these details so travelers can find the exact office. Do NOT strip or remove floor/level/suite/unit prefixes. Only flag an address as wrong if the street address itself is incorrect.
3. **local_address** — Local script version. Required for JP, KR, TH destinations only. NULL for others.
4. **phone** — International format, verified against official contact page. Format: +[country_code]-[number] with hyphens (e.g., +61-2-6270-4100)
5. **emergency_phone** — After-hours number. NULL if not published. Do NOT guess or use main line as substitute.
6. **email** — Official contact email. NULL if web form only.
7. **website** — Specific post URL, not parent ministry. Must use https. No trailing slash. Verify it is a real URL that matches the official source.
8. **google_maps_url** — Should be generated from verified address using format: https://www.google.com/maps/search/?api=1&query=[URL_ENCODED_ADDRESS]. Strip suite/level/floor from the URL (Google Maps resolves better on street addresses).

### SQL GENERATION RULES

For CHANGE findings, generate an UPDATE statement:
\`\`\`sql
UPDATE embassies SET [field] = '[value]', verified = true, last_verified = '${today}' WHERE id = [ROW_ID];
\`\`\`

For ADD findings, generate an INSERT statement:
\`\`\`sql
INSERT INTO embassies (country_code, nationality_code, type, official_name, city, address, local_address, phone, emergency_phone, email, website, google_maps_url, verified, last_verified)
VALUES ('[country_code]', '[nationality_code]', '[type]', '[official_name]', '[city]', '[address]', [local_address_or_NULL], [phone_or_NULL], [emergency_phone_or_NULL], [email_or_NULL], [website_or_NULL], [google_maps_url_or_NULL], true, '${today}');
\`\`\`

For REMOVE findings, generate a DELETE statement:
\`\`\`sql
DELETE FROM embassies WHERE id = [ROW_ID];
\`\`\`

Always use the row ID in WHERE clauses. Never match by nationality_code + city — it's not guaranteed unique.

### CONFLICT RESOLUTION

- If Tier 1 sources conflict with each other: Check recency, triangulate with additional Tier 1/2 sources
- If still unresolved: FLAG the finding. Do not guess. Include both conflicting values and their sources.
- If only a Tier 2 or Tier 3 source has the data: FLAG it. Do not recommend a value from non-Tier-1 sources.

### OUTPUT FORMAT

Return a single valid JSON object with this exact structure:

\`\`\`json
{
  "country_code": "${countryCode}",
  "job_type": "embassy_verification",
  "run_summary": "Human-readable summary of what you checked and found...",
  "records_checked": 0,
  "records_correct": 0,
  "records_need_change": 0,
  "records_flagged": 0,
  "records_missing": 0,
  "records_to_remove": 0,
  "findings": [
    {
      "finding_type": "CHANGE",
      "severity": "critical",
      "target_table": "embassies",
      "target_row_id": 42,
      "field_name": "address",
      "current_value": "old value",
      "recommended_value": "new value",
      "confidence": "high",
      "reasoning": "Explanation of why this change is needed...",
      "sources": [
        {
          "url": "https://...",
          "name": "Source Name",
          "tier": 1,
          "date_accessed": "${today}"
        }
      ],
      "conflicting_sources": null,
      "sql_script": "UPDATE embassies SET address = 'new value', verified = true, last_verified = '${today}' WHERE id = 42;"
    }
  ]
}
\`\`\`

IMPORTANT: Return ONLY the JSON object. No markdown formatting, no code fences, no explanatory text before or after. Just valid JSON.`;
}
