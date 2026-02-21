import { NextRequest, NextResponse } from 'next/server';
import { generateDigest } from '@/lib/dve/report-generator';
import { sendDigestEmail } from '@/lib/dve/email';

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (body.secret !== process.env.DVE_MANUAL_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const days = body.days || 7;
    const digest = await generateDigest(days);
    const emailSent = await sendDigestEmail(digest);

    return NextResponse.json({
      success: true,
      email_sent: emailSent,
      digest_summary: {
        countries_checked: digest.countries_checked,
        total_findings: digest.total_findings,
        findings_by_status: digest.findings_by_status,
        auto_approved_sql_count: digest.auto_approved_sql.length,
        pending_ceo_review_count: digest.pending_ceo_review.length,
        needs_human_decision_count: digest.needs_human_decision.length,
      },
    });
  } catch (error) {
    const err = error as Error;
    console.error('[DVE] Digest error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export const maxDuration = 60;
