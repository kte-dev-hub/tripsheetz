import Anthropic from '@anthropic-ai/sdk';
import { buildCountryManagerSystemPrompt } from './prompts/country-manager-system';
import { buildEmbassyVerificationPrompt } from './prompts/jobs/embassy-verification';
import type { Embassy, ManagerSource, CountryManagerOutput } from './types';
import { DVE_CONFIG } from './types';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function runCountryManager(
  countryCode: string,
  countryName: string,
  currentEmbassies: Embassy[],
  sources: ManagerSource[]
): Promise<CountryManagerOutput> {
  const systemPrompt = buildCountryManagerSystemPrompt(countryCode, countryName);
  const jobPrompt = buildEmbassyVerificationPrompt(
    countryCode,
    countryName,
    currentEmbassies,
    sources
  );

  const userMessage = `${jobPrompt}

Now research and verify all embassy/consulate data for ${countryName} (${countryCode}). Use web search to find official sources. Check every record and every field. Return your findings as JSON.`;

  console.log(`[DVE] Starting Country Manager for ${countryName} (${countryCode})`);
  console.log(`[DVE] Records to verify: ${currentEmbassies.length}`);

  const response = await anthropic.messages.create({
    model: DVE_CONFIG.countryManagerModel,
    max_tokens: 20000,
    system: systemPrompt,
    tools: [
      {
        type: 'web_search_20250305',
        name: 'web_search',
      },
    ],
    messages: [
      {
        role: 'user',
        content: userMessage,
      },
    ],
  });

  const textBlocks = response.content.filter(
    (block): block is Anthropic.TextBlock => block.type === 'text'
  );

  const fullText = textBlocks.map((b) => b.text).join('');

  console.log(`[DVE] Country Manager for ${countryCode} responded. Parsing output...`);

  return parseCountryManagerOutput(fullText);
}

function parseCountryManagerOutput(rawText: string): CountryManagerOutput {
  let jsonText = rawText.trim();

  const jsonMatch = jsonText.match(/```(?:json)?\s*\n?([\s\S]*?)\n?\s*```/);
  if (jsonMatch) {
    jsonText = jsonMatch[1].trim();
  }

  if (!jsonText.startsWith('{')) {
    const startIdx = jsonText.indexOf('{');
    const endIdx = jsonText.lastIndexOf('}');
    if (startIdx !== -1 && endIdx !== -1) {
      jsonText = jsonText.substring(startIdx, endIdx + 1);
    }
  }

  try {
    const parsed = JSON.parse(jsonText) as CountryManagerOutput;

    if (!parsed.country_code || !parsed.job_type || !Array.isArray(parsed.findings)) {
      throw new Error('Missing required fields in Country Manager output');
    }

    return parsed;
  } catch (e) {
    console.error('[DVE] Failed to parse Country Manager output:', e);
    console.error('[DVE] Raw text (first 1000 chars):', rawText.substring(0, 1000));
    throw new Error(`JSON_PARSE_FAILED: ${(e as Error).message}\n\nRAW_RESPONSE (first 5000 chars):\n${rawText.substring(0, 5000)}`);
  }
}
