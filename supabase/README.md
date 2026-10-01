# Dev Notes

## Message Queue
For self-hosted/local, the "Expose Queues via PostgREST" toggle in Studio is known to be unreliable.
On local/Docker setups it often doesn't even have write access to actually apply the change, which is why it shows greyed out.

For self-hosted/local, exposed schemas aren't controlled by a database role setting you can reach via SQL editor at all — they're set directly in your config file, and the SQL approach fails because SQL can create the schema and functions, but it can't change what schema list PostgREST was started with.

**If using Supabase CLI (supabase start):**
Edit `supabase/config.toml`, find the [api] section, and add `pgmq_public`:

```ini
[api]
enabled = true
port = 54321
schemas = ["public", "graphql_public", "pgmq_public"]
```

```bash
supabase stop
supabase start
```

Grant access permission to the queues:
```sql
grant usage on schema pgmq to postgres, anon, authenticated, service_role;
grant all on all tables in schema pgmq to postgres, service_role;
```

## OTP for New Sign ups

```ini
# If enabled, users need to confirm their email address before signing in.
enable_confirmations = true

...

[auth.email.template.confirmation] # sent to new sign-ups
content_path = "./supabase/templates/confirmation.html"
subject = "Your verification code"
```

Restart Supabase:
```bash
supabase stop
supabase start
```

# Auth

Make sure to configure the correct website address!

```ini
[auth]
enabled = true
# The base URL of your website. Used as an allow-list for redirects and for constructing URLs used
# in emails.
site_url = "http://localhost:5173"
# The public URL that Auth serves on. Defaults to the API external URL with `/auth/v1` appended.
# external_url = ""
# A list of *exact* URLs that auth providers are permitted to redirect to post authentication.
additional_redirect_urls = ["https://localhost:5173", "http://localhost:5173/**"]
```


# Google Auth Provider

```ini
[auth.external.google]
enabled = true
client_id = "env(SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID)"
secret = "env(SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET)"
# Optional: skip nonce check if needed for certain local flows
skip_nonce_check = true
```
Actual values are stored in `.env` (git ignored):

```sh
SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID="..."
SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET=...

```

