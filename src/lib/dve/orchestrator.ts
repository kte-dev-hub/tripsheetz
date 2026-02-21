import {
  getNextCountriesDue,
  getCountryManager,
  getEmbassiesForCountry,
  getAllSources,
  createRun,
  completeRun,
  insertFindings,
  markJobInProgress,
  markJobCompleted,
  markJobErrored,
  getNextRunNumber,
  getCrossValidationFindings,
  updateFindingStatus,
} from './supabase';
import { runCountryManager } from './country-manager';
import { runMasterAgent } from './master-agent';
import type { PipelineResult, ManagerFinding } from './types';
import { DVE_CONFIG } from './types';

export async function runPipeline(
  maxCountries: number = DVE_CONFIG.maxCountriesPerRun
): Promise<PipelineResult[]> {
  const results: PipelineResult[] = [];

  const dueJobs = await getNextCountriesDue(maxCountries);
  console.log(`[DVE] Found ${dueJobs.length} jobs due for verification`);

  if (dueJobs.length === 0) {
    console.log('[DVE] No countries due for verification. Exiting.');
    return results;
  }

  for (const job of dueJobs) {
    const startTime = Date.now();
    const result: PipelineResult = {
      country_code: job.country_code,
      country_name: '',
      jobs_run: [job.job_type],
      total_findings: 0,
      findings_by_type: {},
      findings_by_severity: {},
      duration_seconds: 0,
      status: 'success',
    };

    try {
      const manager = await getCountryManager(job.country_code);
      if (!manager) {
        throw new Error(`Country manager not found for ${job.country_code}`);
      }
      result.country_name = manager.country_name;

      console.log(`[DVE] Processing ${manager.country_name} (${job.country_code}) — ${job.job_type}`);

      await markJobInProgress(job.country_code, job.job_type);

      const embassies = await getEmbassiesForCountry(job.country_code);
      const sources = await getAllSources();

      const runNumber = await getNextRunNumber(job.country_code, job.job_type);
      const run = await createRun(job.country_code, job.job_type, runNumber);

      console.log(`[DVE] Dispatching Country Manager for ${job.country_code}...`);

      const cmOutput = await runCountryManager(
        job.country_code,
        manager.country_name,
        embassies,
        sources
      );

      console.log(`[DVE] Country Manager returned ${cmOutput.findings.length} findings`);

      let insertedFindings: ManagerFinding[] = [];
      if (cmOutput.findings.length > 0) {
        insertedFindings = await insertFindings(
          run.id,
          job.country_code,
          job.job_type,
          cmOutput.findings
        );
      }

      await completeRun(run.id, {
        status: 'completed',
        records_checked: cmOutput.records_checked,
        records_correct: cmOutput.records_correct,
        records_need_change: cmOutput.records_need_change,
        records_flagged: cmOutput.records_flagged,
        records_missing: cmOutput.records_missing,
        records_to_remove: cmOutput.records_to_remove,
        summary: cmOutput.run_summary,
      });

      if (insertedFindings.length > 0) {
        console.log(`[DVE] Dispatching Master Agent to review ${insertedFindings.length} findings...`);

        const crossValidationData = new Map<number, ManagerFinding[]>();
        for (const finding of insertedFindings) {
          if (finding.target_row_id) {
            const crossFindings = await getCrossValidationFindings(
              finding.target_table,
              finding.target_row_id,
              finding.country_code
            );
            if (crossFindings.length > 0) {
              crossValidationData.set(finding.target_row_id, crossFindings);
            }
          }
        }

        const masterReview = await runMasterAgent(insertedFindings, crossValidationData);

        console.log(`[DVE] Master Agent reviewed. Approved: ${masterReview.findings_approved}, Flagged: ${masterReview.findings_flagged}`);

        for (const review of masterReview.reviews) {
          await updateFindingStatus(
            review.finding_id,
            review.new_status,
            review.sql_script,
            review.review_notes
          );
        }
      }

      const durationSeconds = Math.round((Date.now() - startTime) / 1000);
      await markJobCompleted(job.country_code, job.job_type, durationSeconds, manager.tier);

      result.total_findings = cmOutput.findings.length;
      result.duration_seconds = durationSeconds;
      for (const f of cmOutput.findings) {
        result.findings_by_type[f.finding_type] = (result.findings_by_type[f.finding_type] || 0) + 1;
        result.findings_by_severity[f.severity] = (result.findings_by_severity[f.severity] || 0) + 1;
      }

      console.log(`[DVE] Completed ${manager.country_name} in ${durationSeconds}s`);

    } catch (error) {
      const err = error as Error;
      console.error(`[DVE] Error processing ${job.country_code}:`, err.message);

      result.status = 'error';
      result.error_message = err.message;
      result.duration_seconds = Math.round((Date.now() - startTime) / 1000);

      await markJobErrored(job.country_code, job.job_type);
    }

    results.push(result);
  }

  return results;
}

export async function runPipelineForCountry(countryCode: string): Promise<PipelineResult> {
  const manager = await getCountryManager(countryCode);
  if (!manager) {
    throw new Error(`Country not found: ${countryCode}`);
  }

  const results = await runPipelineInternal(countryCode, manager.country_name, manager.tier);
  return results;
}

async function runPipelineInternal(
  countryCode: string,
  countryName: string,
  tier: number | null
): Promise<PipelineResult> {
  const startTime = Date.now();
  const jobType = 'embassy_verification';

  const result: PipelineResult = {
    country_code: countryCode,
    country_name: countryName,
    jobs_run: [jobType],
    total_findings: 0,
    findings_by_type: {},
    findings_by_severity: {},
    duration_seconds: 0,
    status: 'success',
  };

  try {
    await markJobInProgress(countryCode, jobType);

    const embassies = await getEmbassiesForCountry(countryCode);
    const sources = await getAllSources();
    const runNumber = await getNextRunNumber(countryCode, jobType);
    const run = await createRun(countryCode, jobType, runNumber);

    const cmOutput = await runCountryManager(countryCode, countryName, embassies, sources);

    let insertedFindings: ManagerFinding[] = [];
    if (cmOutput.findings.length > 0) {
      insertedFindings = await insertFindings(run.id, countryCode, jobType, cmOutput.findings);
    }

    await completeRun(run.id, {
      status: 'completed',
      records_checked: cmOutput.records_checked,
      records_correct: cmOutput.records_correct,
      records_need_change: cmOutput.records_need_change,
      records_flagged: cmOutput.records_flagged,
      records_missing: cmOutput.records_missing,
      records_to_remove: cmOutput.records_to_remove,
      summary: cmOutput.run_summary,
    });

    if (insertedFindings.length > 0) {
      const crossValidationData = new Map<number, ManagerFinding[]>();
      for (const finding of insertedFindings) {
        if (finding.target_row_id) {
          const crossFindings = await getCrossValidationFindings(
            finding.target_table,
            finding.target_row_id,
            finding.country_code
          );
          if (crossFindings.length > 0) {
            crossValidationData.set(finding.target_row_id, crossFindings);
          }
        }
      }

      const masterReview = await runMasterAgent(insertedFindings, crossValidationData);
      for (const review of masterReview.reviews) {
        await updateFindingStatus(
          review.finding_id,
          review.new_status,
          review.sql_script,
          review.review_notes
        );
      }
    }

    const durationSeconds = Math.round((Date.now() - startTime) / 1000);
    await markJobCompleted(countryCode, jobType, durationSeconds, tier);

    result.total_findings = cmOutput.findings.length;
    result.duration_seconds = durationSeconds;
    for (const f of cmOutput.findings) {
      result.findings_by_type[f.finding_type] = (result.findings_by_type[f.finding_type] || 0) + 1;
      result.findings_by_severity[f.severity] = (result.findings_by_severity[f.severity] || 0) + 1;
    }
  } catch (error) {
    const err = error as Error;
    result.status = 'error';
    result.error_message = err.message;
    result.duration_seconds = Math.round((Date.now() - startTime) / 1000);
    await markJobErrored(countryCode, jobType);
  }

  return result;
}
