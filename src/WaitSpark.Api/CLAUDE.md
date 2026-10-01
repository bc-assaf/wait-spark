# WaitSpark API

## API Endpoints Structure


## Tech Stack:
- dotNet 10
- EF Core
- Supabase

## Rules

- Do not implement logic or call database from controllers. Always inject a service (no interfaces are required)
- Define column validation, and indexes as annotations. Do not use fluid API for these.
