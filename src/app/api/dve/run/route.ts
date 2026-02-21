import { NextRequest, NextResponse } from 'next/server';
import { runPipelineForCountry } from '@/lib/dve/orchestrator';

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (body.secret !== process.env.DVE_MANUAL_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const countryCode = body.country_code;
  if (!countryCode) {
    return NextResponse.json({ error: 'country_code required' }, { status: 400 });
  }

  try {
    console.log(`[DVE] Manual run triggered for ${countryCode}`);
    const result = await runPipelineForCountry(countryCode);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    const err = error as Error;
    console.error(`[DVE] Manual run error for ${countryCode}:`, err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export const maxDuration = 800;
