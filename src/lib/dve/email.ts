import { DVE_CONFIG } from './types';
import type { DigestReport } from './types';

export async function sendDigestEmail(digest: DigestReport): Promise<boolean> {
  const apiKey = process.env.SENDGRID_API_KEY;

  if (!apiKey) {
    console.warn('[DVE] SENDGRID_API_KEY not set. Skipping email. Digest saved to logs.');
    console.log('[DVE] Digest summary:\n', digest.summary_text);
    return false;
  }

  const subject = `TripSheetz DVE Digest — ${digest.countries_checked} countries, ${digest.total_findings} findings`;

  const htmlBody = digest.summary_text
    .replace(/\n/g, '<br>')
    .replace(/```sql/g, '<pre style="background:#f5f5f5;padding:10px;border-radius:4px;">')
    .replace(/```/g, '</pre>')
    .replace(/# (.*)/g, '<h1>$1</h1>')
    .replace(/## (.*)/g, '<h2>$1</h2>')
    .replace(/### (.*)/g, '<h3>$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.*?)`/g, '<code style="background:#f0f0f0;padding:2px 4px;">$1</code>');

  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: DVE_CONFIG.ceoEmail }] }],
        from: { email: 'dve@tripsheetz.com', name: 'TripSheetz DVE' },
        subject,
        content: [
          { type: 'text/plain', value: digest.summary_text },
          { type: 'text/html', value: htmlBody },
        ],
      }),
    });

    if (response.ok) {
      console.log(`[DVE] Digest email sent to ${DVE_CONFIG.ceoEmail}`);
      return true;
    } else {
      const errorText = await response.text();
      console.error(`[DVE] SendGrid error: ${response.status} ${errorText}`);
      return false;
    }
  } catch (error) {
    console.error('[DVE] Failed to send email:', error);
    return false;
  }
}
