# Supabase Edge Functions — Metrico

## create-payment

Starts a Zarinpal checkout for annual Plus / Pro / Ark (purchase or renewal).

### SQL first

Run `supabase/payment-gateway.sql` in the SQL Editor (discount codes + `payment_orders`).

### Deploy

```bash
supabase functions deploy create-payment --no-verify-jwt
supabase secrets set ZARINPAL_MERCHANT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
supabase secrets set PAYMENT_CALLBACK_URL=https://mehrzad1420.github.io/metrico_by_cursor/landing/payment-return.html
# optional sandbox:
# supabase secrets set ZARINPAL_SANDBOX=true
```

Without `ZARINPAL_MERCHANT_ID`, the function still creates a `payment_orders` row and returns `needs_config` so the FA UI can show a manual follow-up message. English UI intentionally shows “under development” and does not charge cards yet.

### Client

- Landing: `landing/js/pricing.js` (FA checkout modal)
- App: Subscription Plan screen buy / renew

---

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
