import { NextRequest, NextResponse } from 'next/server';
import { runPipeline } from '@/lib/dve/orchestrator';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log('[DVE] Cron triggered. Starting pipeline...');
    const results = await runPipeline();

    return NextResponse.json({
      success: true,
      countries_processed: results.length,
      results,
    });
  } catch (error) {
    const err = error as Error;
    console.error('[DVE] Cron pipeline error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export const maxDuration = 300;
