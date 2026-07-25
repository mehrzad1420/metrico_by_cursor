# Supabase Edge Functions — Metrico

## secure-delete-account

Verifies email OTP **on the server**, then deletes the user with the service role (cascade via Auth).

### Deploy

```bash
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase functions deploy secure-delete-account --no-verify-jwt
```

`SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` are injected automatically in hosted Edge Functions.

### Client

The app calls `sb.functions.invoke("secure-delete-account", { body: { otp } })` with the user JWT. If the function is not deployed, it falls back to `mark_account_deletion_verified` + `delete_my_account` RPC (weaker).

### Security

- Do not expose the service role key in the SPA.
- Restrict CORS in production if you use a custom domain.
