import { getFindingsForDigest } from './supabase';
import type { DigestReport, ManagerFinding, FindingStatus } from './types';

export async function generateDigest(periodDays: number = 7): Promise<DigestReport> {
  const periodEnd = new Date();
  const periodStart = new Date(periodEnd.getTime() - periodDays * 24 * 60 * 60 * 1000);

  const findings = await getFindingsForDigest(periodStart.toISOString());

  const findingsByStatus: Record<string, number> = {};
  const findingsBySeverity: Record<string, number> = {};
  const autoApprovedSql: string[] = [];
  const pendingCeoReview: ManagerFinding[] = [];
  const needsHumanDecision: ManagerFinding[] = [];
  const countriesChecked = new Set<string>();

  for (const f of findings) {
    findingsByStatus[f.status] = (findingsByStatus[f.status] || 0) + 1;
    findingsBySeverity[f.severity] = (findingsBySeverity[f.severity] || 0) + 1;
    countriesChecked.add(f.country_code);

    if (f.status === 'master_approved' && f.sql_script) {
      autoApprovedSql.push(f.sql_script);
    } else if (f.status === 'pending_ceo_review') {
      pendingCeoReview.push(f);
    } else if (f.status === 'needs_human_decision') {
      needsHumanDecision.push(f);
    }
  }

  const summaryLines: string[] = [
    `# TripSheetz DVE Weekly Digest`,
    `**Period:** ${periodStart.toISOString().split('T')[0]} to ${periodEnd.toISOString().split('T')[0]}`,
    `**Countries checked:** ${countriesChecked.size}`,
    `**Total findings:** ${findings.length}`,
    '',
    '## Summary by Severity',
    `- Critical: ${findingsBySeverity['critical'] || 0}`,
    `- Important: ${findingsBySeverity['important'] || 0}`,
    `- Minor: ${findingsBySeverity['minor'] || 0}`,
    '',
    '## Summary by Status',
    ...Object.entries(findingsByStatus).map(([status, count]) => `- ${status}: ${count}`),
  ];

  if (autoApprovedSql.length > 0) {
    summaryLines.push('', '## Auto-Approved SQL (ready to execute)', '```sql');
    summaryLines.push(...autoApprovedSql);
    summaryLines.push('```');
  }

  if (pendingCeoReview.length > 0) {
    summaryLines.push('', `## Pending CEO Review (${pendingCeoReview.length} findings)`);
    for (const f of pendingCeoReview) {
      summaryLines.push(`### ${f.country_code} — ${f.finding_type} (${f.severity})`);
      summaryLines.push(`- Field: ${f.field_name || 'whole record'}`);
      summaryLines.push(`- Current: ${f.current_value || 'NULL'}`);
      summaryLines.push(`- Recommended: ${f.recommended_value || 'NULL'}`);
      summaryLines.push(`- Reasoning: ${f.reasoning}`);
      if (f.sql_script) {
        summaryLines.push(`- SQL: \`${f.sql_script}\``);
      }
      summaryLines.push('');
    }
  }

  if (needsHumanDecision.length > 0) {
    summaryLines.push('', `## Needs Human Decision (${needsHumanDecision.length} flags)`);
    for (const f of needsHumanDecision) {
      summaryLines.push(`### ${f.country_code} — FLAG (${f.severity})`);
      summaryLines.push(`- Field: ${f.field_name || 'whole record'}`);
      summaryLines.push(`- Current: ${f.current_value || 'NULL'}`);
      summaryLines.push(`- Reasoning: ${f.reasoning}`);
      if (f.conflicting_sources) {
        summaryLines.push(`- Conflicting sources: ${JSON.stringify(f.conflicting_sources, null, 2)}`);
      }
      summaryLines.push('');
    }
  }

  return {
    generated_at: periodEnd.toISOString(),
    period_start: periodStart.toISOString(),
    period_end: periodEnd.toISOString(),
    countries_checked: countriesChecked.size,
    total_findings: findings.length,
    findings_by_status: findingsByStatus as Record<FindingStatus, number>,
    findings_by_severity: findingsBySeverity,
    auto_approved_sql: autoApprovedSql,
    pending_ceo_review: pendingCeoReview,
    needs_human_decision: needsHumanDecision,
    summary_text: summaryLines.join('\n'),
  };
}
