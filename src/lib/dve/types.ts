// ============================================================
// DATABASE ROW TYPES (match Supabase table schemas exactly)
// ============================================================

export interface CountryManager {
  id: number;
  country_code: string;
  country_name: string;
  tier: number | null;
  status: 'active' | 'paused' | 'not_started';
  created_at: string;
  updated_at: string;
}

export interface ManagerJob {
  id: number;
  country_code: string;
  job_type: string;
  job_version: number;
  status: 'not_started' | 'in_progress' | 'completed' | 'error';
  last_run_at: string | null;
  last_run_duration_seconds: number | null;
  next_scheduled_at: string | null;
  total_runs: number;
  created_at: string;
  updated_at: string;
}

export interface ManagerRun {
  id: number;
  country_code: string;
  job_type: string;
  run_number: number;
  started_at: string;
  completed_at: string | null;
  status: 'in_progress' | 'completed' | 'error' | 'partial';
  records_checked: number | null;
  records_correct: number | null;
  records_need_change: number | null;
  records_flagged: number | null;
  records_missing: number | null;
  records_to_remove: number | null;
  error_message: string | null;
  summary: string | null;
}

export interface ManagerFinding {
  id: number;
  run_id: number;
  country_code: string;
  job_type: string;
  finding_type: 'CHANGE' | 'FLAG' | 'ADD' | 'REMOVE';
  severity: 'critical' | 'important' | 'minor';
  target_table: string;
  target_row_id: number | null;
  field_name: string | null;
  current_value: string | null;
  recommended_value: string | null;
  confidence: 'high' | 'medium' | 'low';
  reasoning: string;
  sources: Source[];
  conflicting_sources: ConflictingSource[] | null;
  sql_script: string | null;
  status: FindingStatus;
  reviewed_at: string | null;
  reviewer_notes: string | null;
  created_at: string;
}

export type FindingStatus =
  | 'pending_review'
  | 'master_approved'
  | 'pending_ceo_review'
  | 'needs_human_decision'
  | 'approved'
  | 'rejected'
  | 'deferred';

export interface ManagerSource {
  id: number;
  country_code: string;
  source_name: string;
  source_url: string;
  source_tier: 1 | 2 | 3;
  source_type: string;
  job_types: string[] | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

// ============================================================
// EMBASSY TABLE (the data table being verified)
// ============================================================

export interface Embassy {
  id: number;
  country_code: string;
  nationality_code: string;
  type: string;
  city: string;
  address: string;
  phone: string | null;
  emergency_phone: string | null;
  email: string | null;
  website: string | null;
  verified: boolean;
  last_verified: string | null;
  local_address: string | null;
  google_maps_url: string | null;
  official_name: string | null;
}

// ============================================================
// SOURCE TYPES (used in findings JSON fields)
// ============================================================

export interface Source {
  url: string;
  name: string;
  tier: number;
  date_accessed: string;
}

export interface ConflictingSource {
  url: string;
  name: string;
  value_found: string;
  date_accessed: string;
}

// ============================================================
// COUNTRY MANAGER AGENT OUTPUT (what Sonnet returns)
// ============================================================

export interface CountryManagerOutput {
  country_code: string;
  job_type: string;
  run_summary: string;
  records_checked: number;
  records_correct: number;
  records_need_change: number;
  records_flagged: number;
  records_missing: number;
  records_to_remove: number;
  findings: AgentFinding[];
}

export interface AgentFinding {
  finding_type: 'CHANGE' | 'FLAG' | 'ADD' | 'REMOVE';
  severity: 'critical' | 'important' | 'minor';
  target_table: string;
  target_row_id: number | null;
  field_name: string | null;
  current_value: string | null;
  recommended_value: string | null;
  confidence: 'high' | 'medium' | 'low';
  reasoning: string;
  sources: Source[];
  conflicting_sources: ConflictingSource[] | null;
  sql_script: string | null;
}

// ============================================================
// MASTER AGENT OUTPUT (what Opus returns)
// ============================================================

export interface MasterAgentReview {
  findings_reviewed: number;
  findings_approved: number;
  findings_rejected: number;
  findings_escalated: number;
  cross_validations_performed: number;
  reviews: MasterReviewItem[];
  summary: string;
}

export interface MasterReviewItem {
  finding_id: number;
  new_status: FindingStatus;
  recommendation: string;
  sql_script: string | null;
  review_notes: string;
  confidence: 'high' | 'medium' | 'low';
}

// ============================================================
// PIPELINE TYPES
// ============================================================

export interface PipelineResult {
  country_code: string;
  country_name: string;
  jobs_run: string[];
  total_findings: number;
  findings_by_type: Record<string, number>;
  findings_by_severity: Record<string, number>;
  duration_seconds: number;
  status: 'success' | 'partial' | 'error';
  error_message?: string;
}

export interface DigestReport {
  generated_at: string;
  period_start: string;
  period_end: string;
  countries_checked: number;
  total_findings: number;
  findings_by_status: Record<FindingStatus, number>;
  findings_by_severity: Record<string, number>;
  auto_approved_sql: string[];
  pending_ceo_review: ManagerFinding[];
  needs_human_decision: ManagerFinding[];
  summary_text: string;
}

// ============================================================
// CONFIG
// ============================================================

export type OperatingMode = 'population' | 'maintenance';

export const DVE_CONFIG = {
  operatingMode: 'population' as OperatingMode,

  countryManagerModel: 'claude-sonnet-4-5-20250929',
  masterAgentModel: 'claude-opus-4-6',

  maxCountriesPerRun: 4,

  functionTimeout: 300,

  ceoEmail: 'jasonchoi.us@gmail.com',

  digestDay: 0,
} as const;
