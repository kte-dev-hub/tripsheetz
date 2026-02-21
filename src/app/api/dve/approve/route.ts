import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/dve/supabase';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (body.secret !== process.env.DVE_MANUAL_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getSupabase();

  let findingIds: number[] = [];

  if (body.finding_ids && Array.isArray(body.finding_ids)) {
    findingIds = body.finding_ids;
  } else if (body.country_code && body.approve_all) {
    const { data: findings, error } = await supabase
      .from('manager_findings')
      .select('id')
      .eq('country_code', body.country_code)
      .eq('status', 'pending_ceo_review');

    if (error) {
      return NextResponse.json({ error: `Failed to fetch findings: ${error.message}` }, { status: 500 });
    }

    findingIds = (findings || []).map((f: any) => f.id);
  } else {
    return NextResponse.json({
      error: 'Provide either finding_ids array or country_code + approve_all: true'
    }, { status: 400 });
  }

  if (findingIds.length === 0) {
    return NextResponse.json({ message: 'No findings to approve', approved: 0 });
  }

  const { data: findings, error: fetchError } = await supabase
    .from('manager_findings')
    .select('id, sql_script, field_name, country_code, target_row_id, finding_type')
    .in('id', findingIds)
    .eq('status', 'pending_ceo_review');

  if (fetchError) {
    return NextResponse.json({ error: `Failed to fetch findings: ${fetchError.message}` }, { status: 500 });
  }

  const results: { id: number; field_name: string | null; success: boolean; error?: string }[] = [];

  for (const finding of (findings || [])) {
    if (!finding.sql_script) {
      results.push({ id: finding.id, field_name: finding.field_name, success: false, error: 'No SQL script' });
      continue;
    }

    try {
      if (finding.finding_type === 'REMOVE') {
        const deleteMatch = finding.sql_script.match(/DELETE\s+FROM\s+(\w+)\s+WHERE\s+id\s*=\s*(\d+)/i);
        if (deleteMatch) {
          const table = deleteMatch[1];
          const id = parseInt(deleteMatch[2]);
          const { error: deleteError } = await supabase.from(table).delete().eq('id', id);
          if (deleteError) {
            results.push({ id: finding.id, field_name: finding.field_name, success: false, error: deleteError.message });
            continue;
          }
        } else {
          results.push({ id: finding.id, field_name: finding.field_name, success: false, error: 'Could not parse DELETE SQL' });
          continue;
        }
      } else if (finding.finding_type === 'ADD') {
        const parsed = parseInsertSql(finding.sql_script);
        if (parsed) {
          const { error: insertError } = await supabase.from(parsed.table).insert(parsed.values);
          if (insertError) {
            results.push({ id: finding.id, field_name: finding.field_name, success: false, error: insertError.message });
            continue;
          }
        } else {
          results.push({ id: finding.id, field_name: finding.field_name, success: false, error: 'Could not parse INSERT SQL' });
          continue;
        }
      } else {
        const parsed = parseUpdateSql(finding.sql_script);
        if (parsed) {
          const { error: updateError } = await supabase
            .from(parsed.table)
            .update(parsed.values)
            .eq('id', parsed.id);

          if (updateError) {
            results.push({ id: finding.id, field_name: finding.field_name, success: false, error: updateError.message });
            continue;
          }
        } else {
          results.push({ id: finding.id, field_name: finding.field_name, success: false, error: 'Could not parse UPDATE SQL' });
          continue;
        }
      }

      await supabase
        .from('manager_findings')
        .update({ status: 'approved', reviewed_at: new Date().toISOString() })
        .eq('id', finding.id);

      results.push({ id: finding.id, field_name: finding.field_name, success: true });
    } catch (err) {
      const error = err as Error;
      results.push({ id: finding.id, field_name: finding.field_name, success: false, error: error.message });
    }
  }

  const succeeded = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success);

  return NextResponse.json({
    approved: succeeded,
    failed: failed.length,
    total: results.length,
    failures: failed.length > 0 ? failed : undefined,
  });
}

function parseUpdateSql(sql: string): { table: string; values: Record<string, any>; id: number } | null {
  try {
    const tableMatch = sql.match(/UPDATE\s+(\w+)\s+SET\s+/i);
    if (!tableMatch) return null;
    const table = tableMatch[1];

    const idMatch = sql.match(/WHERE\s+id\s*=\s*(\d+)/i);
    if (!idMatch) return null;
    const id = parseInt(idMatch[1]);

    const setMatch = sql.match(/SET\s+([\s\S]*?)\s+WHERE/i);
    if (!setMatch) return null;
    const setClause = setMatch[1];

    const values: Record<string, any> = {};

    let remaining = setClause.trim();

    while (remaining.length > 0) {
      const fieldMatch = remaining.match(/^(\w+)\s*=\s*/);
      if (!fieldMatch) break;

      const field = fieldMatch[1];
      remaining = remaining.slice(fieldMatch[0].length).trim();

      let value: any;

      if (remaining.startsWith("'")) {
        let i = 1;
        let str = '';
        while (i < remaining.length) {
          if (remaining[i] === "'" && remaining[i + 1] === "'") {
            str += "'";
            i += 2;
          } else if (remaining[i] === "'") {
            i++;
            break;
          } else {
            str += remaining[i];
            i++;
          }
        }
        value = str;
        remaining = remaining.slice(i).trim();
      } else {
        const tokenMatch = remaining.match(/^(\S+)/);
        if (!tokenMatch) break;
        const token = tokenMatch[1].replace(/,$/, '');
        remaining = remaining.slice(tokenMatch[0].length).trim();

        if (token.toLowerCase() === 'true') value = true;
        else if (token.toLowerCase() === 'false') value = false;
        else if (token.toLowerCase() === 'null') value = null;
        else value = isNaN(Number(token)) ? token : Number(token);
      }

      values[field] = value;

      if (remaining.startsWith(',')) {
        remaining = remaining.slice(1).trim();
      }
    }

    if (Object.keys(values).length === 0) return null;

    return { table, values, id };
  } catch {
    return null;
  }
}

function parseInsertSql(sql: string): { table: string; values: Record<string, any> } | null {
  try {
    const tableMatch = sql.match(/INSERT\s+INTO\s+(\w+)\s*\(/i);
    if (!tableMatch) return null;
    const table = tableMatch[1];

    const colsMatch = sql.match(/\(([^)]+)\)\s*VALUES/i);
    if (!colsMatch) return null;
    const columns = colsMatch[1].split(',').map(c => c.trim());

    const valsMatch = sql.match(/VALUES\s*\(([\s\S]+)\)\s*;?\s*$/i);
    if (!valsMatch) return null;
    const valsStr = valsMatch[1];

    const vals: any[] = [];
    let remaining = valsStr.trim();

    while (remaining.length > 0) {
      if (remaining.startsWith("'")) {
        let i = 1;
        let str = '';
        while (i < remaining.length) {
          if (remaining[i] === "'" && remaining[i + 1] === "'") {
            str += "'";
            i += 2;
          } else if (remaining[i] === "'") {
            i++;
            break;
          } else {
            str += remaining[i];
            i++;
          }
        }
        vals.push(str);
        remaining = remaining.slice(i).trim();
      } else {
        const tokenMatch = remaining.match(/^(\S+)/);
        if (!tokenMatch) break;
        const token = tokenMatch[1].replace(/,$/, '');
        remaining = remaining.slice(tokenMatch[0].length).trim();

        if (token.toLowerCase() === 'true') vals.push(true);
        else if (token.toLowerCase() === 'false') vals.push(false);
        else if (token.toLowerCase() === 'null') vals.push(null);
        else vals.push(isNaN(Number(token)) ? token : Number(token));
      }

      if (remaining.startsWith(',')) {
        remaining = remaining.slice(1).trim();
      }
    }

    if (columns.length !== vals.length) return null;

    const values: Record<string, any> = {};
    columns.forEach((col, i) => {
      if (vals[i] !== null) {
        values[col] = vals[i];
      }
    });

    return { table, values };
  } catch {
    return null;
  }
}
