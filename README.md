# TRS Sentinel Core

Production truth engine for tracking workforce displacement.

## Architecture
- `src/logic/ghostDrift.js` - Trust scoring algorithm (9 lines)
- `src/sentinel/simulator.js` - Signal processor (25 lines) 
- GitHub Actions - Automated processing every 6 hours
- Supabase - Production database

## Status
**PRODUCTION** - Live system processing workforce displacement data.
