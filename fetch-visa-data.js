// ============================================================
// TripSheetz: Fetch visa data from Travel Buddy API
// and generate SQL INSERT statements
//
// HOW TO RUN:
// 1. Replace YOUR_RAPIDAPI_KEY below with your actual key
// 2. Open terminal in your project folder
// 3. Run: node fetch-visa-data.js
// 4. It will create a file called visa-data-inserts.sql
// 5. Copy the contents into Supabase SQL Editor and run
// ============================================================

const fs = require('fs');

// ⚠️ REPLACE THIS with your RapidAPI key
const RAPIDAPI_KEY = 'b3899ef015msh6974b4aba343c6ep14bd0bjsn8bca43054b69';

const passports = ['US', 'GB', 'CA', 'AU', 'DE', 'KR', 'CN', 'IN', 'JP', 'BR'];
const destinations = ['JP', 'TH', 'FR', 'IT', 'US', 'KR', 'AU', 'MX', 'DE', 'SG'];

// Build all pairs (skip same-country pairs)
const pairs = [];
for (const passport of passports) {
  for (const destination of destinations) {
    if (passport !== destination) {
      pairs.push({ passport, destination });
    }
  }
}

console.log(`Total API calls needed: ${pairs.length}`);

function escapeSQL(val) {
  if (val === null || val === undefined) return 'NULL';
  return `'${String(val).replace(/'/g, "''")}'`;
}

function buildInsert(passport, destination, data) {
  const d = data.data;
  const primary = d.visa_rules?.primary_rule || {};
  const secondary = d.visa_rules?.secondary_rule || null;
  const reg = d.mandatory_registration || null;

  return `(${escapeSQL(passport)}, ${escapeSQL(destination)}, ${escapeSQL(primary.name || null)}, ${escapeSQL(primary.duration || null)}, ${escapeSQL(primary.color || null)}, ${escapeSQL(secondary?.name || null)}, ${escapeSQL(secondary?.duration || null)}, ${escapeSQL(secondary?.color || null)}, ${escapeSQL(secondary?.link || null)}, ${escapeSQL(d.destination?.passport_validity || null)}, ${escapeSQL(reg?.name || null)}, ${escapeSQL(reg?.color || null)}, ${escapeSQL(reg?.link || null)}, ${escapeSQL(d.destination?.embassy_url || null)}, NOW())`;
}

async function fetchVisa(passport, destination) {
  const response = await fetch('https://visa-requirement.p.rapidapi.com/v2/visa/check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-rapidapi-host': 'visa-requirement.p.rapidapi.com',
      'x-rapidapi-key': RAPIDAPI_KEY,
    },
    body: JSON.stringify({ passport, destination }),
  });

  if (!response.ok) {
    throw new Error(`API error ${response.status} for ${passport} -> ${destination}`);
  }

  return response.json();
}

async function main() {
  const inserts = [];
  let success = 0;
  let failed = 0;

  for (let i = 0; i < pairs.length; i++) {
    const { passport, destination } = pairs[i];
    console.log(`[${i + 1}/${pairs.length}] Fetching ${passport} -> ${destination}...`);

    try {
      const data = await fetchVisa(passport, destination);
      inserts.push(buildInsert(passport, destination, data));
      success++;
    } catch (err) {
      console.error(`  FAILED: ${err.message}`);
      failed++;
    }

    // Rate limit: wait 500ms between calls to be polite
    if (i < pairs.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  // Build SQL file
  const sql = `-- ============================================================
-- TripSheetz: Visa requirements data from Travel Buddy API
-- Generated: ${new Date().toISOString()}
-- Pairs: ${success} successful, ${failed} failed
-- ============================================================

INSERT INTO visa_requirements (
  passport_code, destination_code, visa_status, visa_duration, visa_color,
  secondary_rule_name, secondary_rule_duration, secondary_rule_color, secondary_rule_link,
  passport_validity, mandatory_registration_name, mandatory_registration_color,
  mandatory_registration_link, embassy_url, last_verified
) VALUES
${inserts.join(',\n')};
`;

  fs.writeFileSync('visa-data-inserts.sql', sql);
  console.log(`\nDone! ${success} rows written to visa-data-inserts.sql`);
  console.log(`${failed} failures`);
  console.log(`\nCopy the contents of visa-data-inserts.sql into Supabase SQL Editor and run it.`);
}

main();
