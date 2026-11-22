#!/usr/bin/env node
import { TagLendingClient } from '../index.js';
const cmds = ['company', 'licensing', 'contact', 'programs'];
const cmd = process.argv[2];
if (!cmds.includes(cmd)) {
  console.log('Usage: taglending <company|licensing|contact|programs>\nRead-only public facts about TAG Lending Group LLC (NMLS #2329372). No rates or pricing.\nDocs: https://taglendinggroup.com/developers');
  process.exit(cmd ? 1 : 0);
}
try { console.log(JSON.stringify(await new TagLendingClient()[cmd](), null, 2)); }
catch (e) { console.error(JSON.stringify({ error: e.message, status: e.status }, null, 2)); process.exit(1); }
