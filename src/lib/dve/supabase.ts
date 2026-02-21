import { createClient } from '@supabase/supabase-js';
import type {
  CountryManager, ManagerJob, ManagerRun, ManagerFinding,
  ManagerSource, Embassy, AgentFinding,
  FindingStatus
} from './types';

let _supabase: ReturnType<typeof createClient> | null = null;

function getSupabase() {
  if (!_supabase) {
    _supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }
  return _supabase;
}

// ============================================================
// READ: Country Managers
// ============================================================

export async function getNextCountriesDue(limit: number): Promise<ManagerJob[]> {
  const now = new Date().toISOString();

  const { data, error } = await getSupabase()
    .from('manager_jobs' as any)
    .select('*')
    .or(`next_scheduled_at.is.null,next_scheduled_at.lte.${now}`)
    .neq('status', 'in_progress')
    .order('next_scheduled_at', { ascending: true, nullsFirst: true })
    .limit(limit);

  if (error) throw new Error(`getNextCountriesDue failed: ${error.message}`);
  return data || [];
}

export async function getCountryManager(countryCode: string): Promise<CountryManager | null> {
  const { data, error } = await getSupabase()
    .from('country_managers' as any)
    .select('*')
    .eq('country_code', countryCode)
    .single();

  if (error) return null;
  return data;
}

// ============================================================
// READ: Manager Sources
// ============================================================

export async function getSourcesForCountry(
  countryCode: string,
  _jobType: string
): Promise<ManagerSource[]> {
  const { data, error } = await getSupabase()
    .from('manager_sources' as any)
    .select('*')
    .or(`country_code.eq.${countryCode}`)
    .order('source_tier', { ascending: true });

  if (error) throw new Error(`getSourcesForCountry failed: ${error.message}`);
  return data || [];
}

export async function getAllSources(): Promise<ManagerSource[]> {
  const { data, error } = await getSupabase()
    .from('manager_sources' as any)
    .select('*')
    .order('country_code', { ascending: true })
    .order('source_tier', { ascending: true });

  if (error) throw new Error(`getAllSources failed: ${error.message}`);
  return data || [];
}

// ============================================================
// READ: Embassy Data (the table being verified)
// ============================================================

export async function getEmbassiesForCountry(countryCode: string): Promise<Embassy[]> {
  const { data, error } = await getSupabase()
    .from('embassies' as any)
    .select('*')
    .eq('country_code', countryCode)
    .order('nationality_code', { ascending: true })
    .order('type', { ascending: true })
    .order('city', { ascending: true });

  if (error) throw new Error(`getEmbassiesForCountry failed: ${error.message}`);
  return data || [];
}

export async function getEmbassiesByNationality(nationalityCode: string): Promise<Embassy[]> {
  const { data, error } = await getSupabase()
    .from('embassies' as any)
    .select('*')
    .eq('nationality_code', nationalityCode)
    .order('country_code', { ascending: true })
    .order('type', { ascending: true })
    .order('city', { ascending: true });

  if (error) throw new Error(`getEmbassiesByNationality failed: ${error.message}`);
  return data || [];
}

// ============================================================
// WRITE: Manager Runs
// ============================================================

export async function createRun(
  countryCode: string,
  jobType: string,
  runNumber: number
): Promise<ManagerRun> {
  const { data, error } = await getSupabase()
    .from('manager_runs' as any)
    .insert([{
      country_code: countryCode,
      job_type: jobType,
      run_number: runNumber,
      status: 'in_progress',
    }] as any)
    .select()
    .single();

  if (error) throw new Error(`createRun failed: ${error.message}`);
  return data;
}

export async function completeRun(
  runId: number,
  result: {
    status: 'completed' | 'error' | 'partial';
    records_checked?: number;
    records_correct?: number;
    records_need_change?: number;
    records_flagged?: number;
    records_missing?: number;
    records_to_remove?: number;
    error_message?: string;
    summary?: string;
  }
): Promise<void> {
  const { error } = await getSupabase()
    .from('manager_runs' as any)
    .update({
      ...result,
      completed_at: new Date().toISOString(),
    } as any)
    .eq('id', runId);

  if (error) throw new Error(`completeRun failed: ${error.message}`);
}

// ============================================================
// WRITE: Manager Findings
// ============================================================

export async function insertFindings(
  runId: number,
  countryCode: string,
  jobType: string,
  findings: AgentFinding[]
): Promise<ManagerFinding[]> {
  const rows = findings.map((f) => ({
    run_id: runId,
    country_code: countryCode,
    job_type: jobType,
    finding_type: f.finding_type,
    severity: f.severity,
    target_table: f.target_table,
    target_row_id: f.target_row_id,
    field_name: f.field_name,
    current_value: f.current_value,
    recommended_value: f.recommended_value,
    confidence: f.confidence,
    reasoning: f.reasoning,
    sources: f.sources,
    conflicting_sources: f.conflicting_sources,
    sql_script: f.sql_script,
    status: 'pending_review' as FindingStatus,
  }));

  const { data, error } = await getSupabase()
    .from('manager_findings' as any)
    .insert(rows as any)
    .select();

  if (error) throw new Error(`insertFindings failed: ${error.message}`);
  return data || [];
}

export async function updateFindingStatus(
  findingId: number,
  newStatus: FindingStatus,
  sqlScript: string | null,
  reviewNotes: string
): Promise<void> {
  const { error } = await getSupabase()
    .from('manager_findings' as any)
    .update({
      status: newStatus,
      sql_script: sqlScript,
      reviewer_notes: reviewNotes,
      reviewed_at: new Date().toISOString(),
    } as any)
    .eq('id', findingId);

  if (error) throw new Error(`updateFindingStatus failed: ${error.message}`);
}

// ============================================================
// WRITE: Manager Jobs (update after run)
// ============================================================

export async function markJobInProgress(countryCode: string, jobType: string): Promise<void> {
  const { error } = await getSupabase()
    .from('manager_jobs' as any)
    .update({
      status: 'in_progress',
      updated_at: new Date().toISOString(),
    } as any)
    .eq('country_code', countryCode)
    .eq('job_type', jobType);

  if (error) throw new Error(`markJobInProgress failed: ${error.message}`);
}

export async function markJobCompleted(
  countryCode: string,
  jobType: string,
  durationSeconds: number,
  tier: number | null
): Promise<void> {
  const now = new Date();
  let nextRun: Date;

  if (tier && tier <= 3) {
    nextRun = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  } else {
    nextRun = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
  }

  const { error } = await getSupabase()
    .from('manager_jobs' as any)
    .update({
      status: 'completed',
      last_run_at: now.toISOString(),
      last_run_duration_seconds: durationSeconds,
      next_scheduled_at: nextRun.toISOString(),
      updated_at: now.toISOString(),
    } as any)
    .eq('country_code', countryCode)
    .eq('job_type', jobType);

  if (error) throw new Error(`markJobCompleted failed: ${error.message}`);

  const { error: rpcError } = await getSupabase().rpc('increment_total_runs' as any, {
    p_country_code: countryCode,
    p_job_type: jobType,
  } as any);

  if (rpcError) {
    console.warn('increment_total_runs RPC not found, using direct query');
    await getSupabase()
      .from('manager_jobs' as any)
      .update({ total_runs: 1 } as any)
      .eq('country_code', countryCode)
      .eq('job_type', jobType);
  }
}

export async function markJobErrored(countryCode: string, jobType: string): Promise<void> {
  const { error } = await getSupabase()
    .from('manager_jobs' as any)
    .update({
      status: 'error',
      updated_at: new Date().toISOString(),
    } as any)
    .eq('country_code', countryCode)
    .eq('job_type', jobType);

  if (error) throw new Error(`markJobErrored failed: ${error.message}`);
}

// ============================================================
// READ: Findings for Digest
// ============================================================

export async function getFindingsForDigest(since: string): Promise<ManagerFinding[]> {
  const { data, error } = await getSupabase()
    .from('manager_findings' as any)
    .select('*')
    .gte('created_at', since)
    .order('severity', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) throw new Error(`getFindingsForDigest failed: ${error.message}`);
  return data || [];
}

export async function getCrossValidationFindings(
  targetTable: string,
  targetRowId: number,
  excludeCountryCode: string
): Promise<ManagerFinding[]> {
  const { data, error } = await getSupabase()
    .from('manager_findings' as any)
    .select('*')
    .eq('target_table', targetTable)
    .eq('target_row_id', targetRowId)
    .neq('country_code', excludeCountryCode)
    .in('status', ['pending_review', 'master_approved', 'pending_ceo_review']);

  if (error) throw new Error(`getCrossValidationFindings failed: ${error.message}`);
  return data || [];
}

// ============================================================
// UTILITY: Get run number for a country+job
// ============================================================

export async function getNextRunNumber(countryCode: string, jobType: string): Promise<number> {
  const { data, error } = await getSupabase()
    .from('manager_runs' as any)
    .select('run_number')
    .eq('country_code', countryCode)
    .eq('job_type', jobType)
    .order('run_number', { ascending: false })
    .limit(1);

  if (error) throw new Error(`getNextRunNumber failed: ${error.message}`);
  return data && data.length > 0 ? data[0].run_number + 1 : 1;
}
