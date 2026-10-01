# Wait Spark Server

Wait Spark is an app for managing waiting rooms displays' content and interactive games.

## Components and Tech Stack

| Project                | Purpose                                                              | Stack                                | Deploy               |
| ---------------------- | -------------------------------------------------------------------- | ------------------------------------ | -------------------- |
| `WaitSpark.Api`        | REST API used by all clients                                         | .NET                                 | Container on Railway |
| `WaitSpark.Data`       | Data model and DbContext                                             | .NET class library, EF Core          | n/a (library)        |
| `WaitSpark.Scraper`    | Background service scraping the client's website and social accounts | .NET                                 | Container on Railway |
| `WaitSpark.UI.Portal`  | SPA for onboarding and configuration                                 | React, Vite, [MUI](https://mui.com/) | TODO                 |
| `WaitSpark.UI.Display` | SPA rendering the waiting rooms displays                             | React                                | TODO                 |
| `WaitSpark.UI.Guest`   | SPA used by guests (visitors/customers) to join the game             | React                                | TODO                 |

## SDKs

- .NET apps use the Supabase C# Client Library (see https://supabase.com/docs/reference/csharp/introduction)
- React apps use `@supabase/supabase-js`

## Other Services

- Supabase: Authentication, real time notifications, message queue, database (PostgreSQL)
- Billing: Paddle
- Scraping Service: ScrapingBee

## Rules

- Use the latest stable .NET and React versions
- Access the database using standard EF Core, *not* the Supabase SDK
- EF Core owns schema migrations (in `WaitSpark.Data`); do not manage the schema with the Supabase CLI
- `supabase/` holds Supabase CLI config only (`config.toml`, auth email templates); run `supabase` commands from the repo root. Local secrets go in `supabase/.env` (git ignored, copy from a teammate or the Supabase/Google dashboards)
- Connect to the database directly (not through the Supabase pooler)
- Row-level security (RLS) is not used: clients never access the database, all data access goes through the API
- Paddle webhooks are received by the API at `/api/v1/billing/paddle/callbacks`
- Never commit secrets (Supabase, Paddle, ScrapingBee keys); configuration comes from environment variables

## Authentication

- The SPA signs in directly with Supabase using supabase-js, with email/password or Google. The client stores the session and refreshes the access token automatically.
- Only the publishable key goes in the SPA.
- .NET validates the JWT locally using standard JwtBearer middleware against Supabase's public keys.
- The JWT `sub` claim (the Supabase user id) maps to the `Uid` column of the `Users` table (`WaitSpark.Data/Entities/User.cs`). Since RLS is off, the API must scope every query by this user.

## Branching

- `main`: production
- `release`: release candidates
- `develop`: integration branch
- `feature_*`: feature branches, branched from and merged back into `develop`

## Commands

Run from `src/`:

- API: `dotnet build WaitSpark.Api`, `dotnet run --project WaitSpark.Api` (http://localhost:5188)
- New EF migration: `dotnet ef migrations add <Name> -p WaitSpark.Data -s WaitSpark.Api`

Run from `src/WaitSpark.UI.Portal/`:

- `npm run dev` (http://localhost:5173), `npm test`, `npm run lint`, `npm run build`

Run from `docs/`: `npm start`, `npm run build`. Algolia search needs `ALGOLIA_APP_ID`, `ALGOLIA_API_KEY`, `ALGOLIA_INDEX_NAME` (see `docs/.env.example`).

TODO: Scraper and other UI projects.

## Domain Structure

- www.waitspark.com: Landing page
  - .../terms_and_conditions
  - .../privacy_policy
- app.waitspark.com: The admin app (`WaitSpark.UI.Portal`)
  - .../signin
  - .../signup
  - .../dashboard
  - .../subscription
  - .../displays
- tv.waitspark.com: The display app (`WaitSpark.UI.Display`)
- play.waitspark.com: The end-user app (`WaitSpark.UI.Guest`)
  - .../join?code={join_code}
  - .../game/{id}
