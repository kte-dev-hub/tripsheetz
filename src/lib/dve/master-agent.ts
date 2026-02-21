import Anthropic from '@anthropic-ai/sdk';
import {
  buildMasterAgentSystemPrompt,
  buildMasterAgentUserMessage,
} from './prompts/master-agent-system';
import type { ManagerFinding, MasterAgentReview } from './types';
import { DVE_CONFIG } from './types';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function runMasterAgent(
  findings: ManagerFinding[],
  crossValidationData: Map<number, ManagerFinding[]>
): Promise<MasterAgentReview> {
  const systemPrompt = buildMasterAgentSystemPrompt();
  const userMessage = buildMasterAgentUserMessage(findings, crossValidationData);

  console.log(`[DVE] Starting Master Agent review. Findings to review: ${findings.length}`);

  const response = await anthropic.messages.create({
    model: DVE_CONFIG.masterAgentModel,
    max_tokens: 16000,
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

  console.log(`[DVE] Master Agent responded. Parsing review...`);

  return parseMasterAgentOutput(fullText);
}

function parseMasterAgentOutput(rawText: string): MasterAgentReview {
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
    const parsed = JSON.parse(jsonText) as MasterAgentReview;

    if (!Array.isArray(parsed.reviews)) {
      throw new Error('Missing reviews array in Master Agent output');
    }

    return parsed;
  } catch (e) {
    console.error('[DVE] Failed to parse Master Agent output:', e);
    console.error('[DVE] Raw text (first 1000 chars):', rawText.substring(0, 1000));
    throw new Error(`Failed to parse Master Agent output: ${(e as Error).message}`);
  }
}
