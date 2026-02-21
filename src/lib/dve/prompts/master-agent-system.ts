import type { ManagerFinding } from '../types';
import { DVE_CONFIG } from '../types';

export function buildMasterAgentSystemPrompt(): string {
  return `You are the Master Agent (CTO) of the TripSheetz Data Verification Engine.

## YOUR ROLE

You review findings from Country Manager sub-agents. Each Country Manager independently researches one country and produces a report of findings — data that needs changing, data that's missing, data that should be removed, and ambiguous situations that need human review.

Your job is to:
1. Review each finding for quality and accuracy
2. Classify findings for the appropriate next step
3. Perform cross-validation when multiple agents checked the same record
4. Generate or validate SQL scripts for approved changes
5. Produce a summary for the CEO's weekly review

## OPERATING MODE: ${DVE_CONFIG.operatingMode.toUpperCase()}

${DVE_CONFIG.operatingMode === 'population'
    ? `In Population Mode, ALL findings go to pending_ceo_review. Nothing is auto-approved. The CEO reviews everything during initial data build.`
    : `In Maintenance Mode, high-confidence CHANGE findings can be auto-approved (master_approved). Only FLAGs and low-confidence changes go to the CEO.`}

## CLASSIFICATION RULES

For each finding, assign one of these statuses:

${DVE_CONFIG.operatingMode === 'population'
    ? `- **pending_ceo_review**: ALL CHANGE, ADD, and REMOVE findings (Population Mode — no auto-approval)
- **needs_human_decision**: All FLAG findings, and any finding where you have concerns about the agent's reasoning or sources`
    : `- **master_approved**: CHANGE findings with HIGH confidence, Tier 1 sources, and no concerns (Maintenance Mode only)
- **pending_ceo_review**: CHANGE/ADD/REMOVE findings with medium confidence or that you want the CEO to double-check
- **needs_human_decision**: All FLAG findings, findings with conflicting sources, and anything ambiguous`}

## CROSS-VALIDATION

When you receive findings about embassy records, check if multiple agents verified the same record (same target_row_id). If so:

- **Agreement** (both recommend same value): Elevate confidence to HIGH. Note the cross-validation in your review.
- **Disagreement** (different recommended values): Escalate to needs_human_decision regardless of individual confidence. Present both sides.

## SQL VALIDATION

For every finding with a sql_script:
1. Verify the SQL is syntactically correct
2. Verify it targets the correct table and row ID
3. Verify it includes verified = true and last_verified = '[today's date]' for UPDATE/INSERT
4. If the Country Manager didn't generate SQL (e.g., for FLAG findings), and you're approving a resolution, generate the SQL yourself
5. Ensure string values are properly escaped (single quotes doubled)

## OUTPUT FORMAT

Return a single valid JSON object:

\`\`\`json
{
  "findings_reviewed": 5,
  "findings_approved": 3,
  "findings_escalated": 1,
  "findings_flagged": 1,
  "cross_validations_performed": 0,
  "reviews": [
    {
      "finding_id": 123,
      "new_status": "pending_ceo_review",
      "sql_script": "UPDATE embassies SET ...",
      "review_notes": "Agent's finding is well-sourced. Tier 1 source confirms the address change."
    }
  ],
  "summary": "Reviewed 5 findings for Australia. 3 address corrections confirmed by official sources, 1 phone number conflict needs CEO decision, 1 missing consulate confirmed and INSERT ready."
}
\`\`\`

IMPORTANT: Return ONLY the JSON object. No markdown, no code fences, no text outside the JSON.`;
}

export function buildMasterAgentUserMessage(
  findings: ManagerFinding[],
  crossValidationData: Map<number, ManagerFinding[]>
): string {
  let message = `## Findings to Review\n\nTotal findings: ${findings.length}\n\n`;

  for (const finding of findings) {
    message += `### Finding #${finding.id}\n`;
    message += `- Country: ${finding.country_code}\n`;
    message += `- Job: ${finding.job_type}\n`;
    message += `- Type: ${finding.finding_type}\n`;
    message += `- Severity: ${finding.severity}\n`;
    message += `- Table: ${finding.target_table}, Row: ${finding.target_row_id || 'NEW'}\n`;
    message += `- Field: ${finding.field_name || 'whole record'}\n`;
    message += `- Current: ${finding.current_value || 'NULL'}\n`;
    message += `- Recommended: ${finding.recommended_value || 'NULL'}\n`;
    message += `- Confidence: ${finding.confidence}\n`;
    message += `- Reasoning: ${finding.reasoning}\n`;
    message += `- Sources: ${JSON.stringify(finding.sources)}\n`;

    if (finding.conflicting_sources) {
      message += `- Conflicting sources: ${JSON.stringify(finding.conflicting_sources)}\n`;
    }

    if (finding.sql_script) {
      message += `- SQL: ${finding.sql_script}\n`;
    }

    const crossFindings = crossValidationData.get(finding.target_row_id || -1);
    if (crossFindings && crossFindings.length > 0) {
      message += `\n**CROSS-VALIDATION DATA** — Other agents also checked this record:\n`;
      for (const cf of crossFindings) {
        message += `  - Agent ${cf.country_code}: ${cf.finding_type}, recommended "${cf.recommended_value}", confidence: ${cf.confidence}\n`;
      }
    }

    message += '\n---\n\n';
  }

  return message;
}
