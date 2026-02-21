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
## JOB: embassy_verification (v2)

### TASK
Verify all embassy and consulate records for ${countryName} (${countryCode}) as a DESTINATION country. This means verifying all foreign embassies and consulates that are located IN ${countryName}.

### NATIONALITY GROUPS TO VERIFY
The database currently contains records for these nationality groups in ${countryName}: ${nationalityCodes.length > 0 ? nationalityCodes.join(', ') : 'NONE — this country has no embassy data yet'}.

${nationalityCodes.length === 0 ? `Since there are no records yet, you must research from scratch. For each nationality group that has a Tier 1 source listed below, search for their diplomatic missions in ${countryName} and report them as ADD findings.` : ''}

### KNOWN SOURCES
${sourceText}

### CURRENT DATABASE RECORDS
${embassyData}

### DATABASE SCHEMA RULES

The embassies table has these constraints — your findings MUST respect them:

- **type** field only accepts two values: "embassy" or "consulate". Nothing else. A consulate-general is stored as type = "consulate" with the full distinction captured in the official_name field (e.g., official_name = "Consulate General of the Republic of Korea"). Do NOT recommend changing type to "consulate-general" or any other value.
- **country_code** is the destination country (where the post is physically located): ${countryCode}
- **nationality_code** is the sending country (whose government runs the post)

### STEP 1 — COMPLETENESS CHECK

For EACH nationality_code that has a Tier 1 source listed above:

1. Search for the COMPLETE official list of that nationality's diplomatic missions in ${countryName}
2. Start with the Tier 1 source for that nationality (the sending country's MFA/MOFA website)
3. Cross-reference with ${countryName}'s foreign ministry directory (Tier 2) if available
4. Search for any additional Tier 1/2 sources that list diplomatic missions
5. Compare the full list against what's in the database
6. Identify:
   - Missing posts (exist in reality but not in database) → ADD finding
   - Posts that should be removed (closed, downgraded to honorary, or were always honorary) → REMOVE finding

SCOPE RULES:
- IN scope: Career diplomatic posts — embassies, high commissions, consulates-general, consulates
- OUT of scope: Honorary consulates (limited services, change frequently, run by private citizens)

How to identify honorary consulates: Government directories label them as "Honorary Consul" or "Honorary Consul-General" with an individual's name rather than a diplomatic staff list. Career posts list multiple staff with diplomatic titles. If you're unsure, note it in your reasoning and make your best judgment.

### STEP 2 — FIELD-BY-FIELD VERIFICATION

For EACH existing row in the database, verify every field. For each field, check multiple sources where possible and document what each source shows.

1. **official_name** — Full diplomatic title from official source (e.g., "Embassy of the United States of America" not "US Embassy"). This field captures the full formal name including distinctions like "Consulate General" vs "Consulate."

2. **address** — Check the official website contact page, the host country directory, AND Google Maps. All three should agree. English format, include suite/level/floor. KEEP floor, level, suite, and unit numbers — addresses like "Level 19, 44 Market Street, Sydney, NSW 2000" are correct and intentional so travelers can find the exact office. Only flag an address as wrong if the street address itself is incorrect or the post has relocated.

3. **local_address** — Local script version. Required for JP, KR, TH destinations only. NULL for others. Check the embassy's own website — many list both English and local script addresses.

4. **phone** — International format, verified against official contact page AND cross-referenced with at least one other source. Format: +[country_code]-[number] with hyphens (e.g., +61-2-6270-4100). If sources show different numbers, investigate whether one is outdated due to a switchboard change.

5. **emergency_phone** — After-hours/emergency number. Check the embassy's contact page, consular services page, and any "emergency" or "after hours" section. Many posts publish these but they're easy to miss — look carefully. NULL only if genuinely not published anywhere. Do NOT use the main line as a substitute.

6. **email** — Official contact email. NULL if web form only. Check both the contact page and any consular services page.

7. **website** — Specific post URL, not parent ministry. Must use https. No trailing slash. Verify the URL actually resolves by confirming it appears in your search results. If a website has moved to a new URL, recommend the current working URL.

8. **google_maps_url** — Generated from verified address using format: https://www.google.com/maps/search/?api=1&query=[URL_ENCODED_ADDRESS]. Strip suite/level/floor from the URL (Google Maps resolves better on street addresses).

### CAPTURE EVERYTHING USEFUL

While verifying one field, you may discover issues with other fields on the same record. For example, while checking a phone number you might notice the emergency phone is listed on the same page. Report ALL issues you find, not just the one you were looking for. Every piece of useful data you encounter should be captured in your findings.

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

Remember: the type field only accepts 'embassy' or 'consulate'. Use 'embassy' for embassies and high commissions. Use 'consulate' for consulates-general and consulates.

Always use the row ID in WHERE clauses. Never match by nationality_code + city — it's not guaranteed unique.

### CONFLICT RESOLUTION

When sources disagree:
1. Check the recency of each source — when was it last updated?
2. Look for a third source to break the tie
3. Look for evidence of recent changes (relocations, name changes, new phone systems)
4. Check if aggregator/banned sites show the old value (this often indicates which value is outdated)
5. Make your best recommendation as a CHANGE finding with appropriate confidence level
6. Document ALL sources consulted and what each one showed
7. Only use FLAG if you've done all of the above and the evidence is genuinely split with no way to determine which is correct

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
      "reasoning": "Checked Japan MOFA (Tier 1, updated Jan 2026) — shows X. Korean MOFA (Tier 1, page dated 2024) — also shows X. Google Maps (Tier 2, current) confirms X. Old address Y appears on embassypages.com (Tier 3, banned). Recommend X.",
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
