/**
 * Metrico — create / update / remove team members (service role).
 *
 * Secrets: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_ANON_KEY
 *
 * Body:
 *  { action: "create"|"update"|"remove",
 *    email, password?, display_name?, member_role?, target_user_id? }
 */
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ROLES = new Set(["sales", "accountant", "site", "viewer"]);

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ status: "error", message: "unauthorized" }, 401);

    const anon = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const { data: userData, error: userErr } = await anon.auth.getUser();
    if (userErr || !userData?.user) return json({ status: "error", message: "unauthorized" }, 401);
    const ownerId = userData.user.id;

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: ownerProfile } = await admin
      .from("profiles")
      .select("plan, plan_expires_at, team_owner_id")
      .eq("user_id", ownerId)
      .maybeSingle();

    const plan = String(ownerProfile?.plan || "start");
    const exp = ownerProfile?.plan_expires_at ? new Date(ownerProfile.plan_expires_at).getTime() : null;
    const planOk = plan === "team" && (!exp || exp > Date.now()) && !ownerProfile?.team_owner_id;
    if (!planOk) return json({ status: "error", message: "team_plan_required" }, 403);

    await admin.rpc("ensure_team_for_owner", { p_owner: ownerId }).catch(() => {});

    const body = await req.json();
    const action = String(body.action || "create");

    if (action === "create") {
      const email = String(body.email || "").trim().toLowerCase();
      const password = String(body.password || "");
      const displayName = String(body.display_name || "").trim() || email.split("@")[0];
      const role = String(body.member_role || "sales");
      if (!email || !email.includes("@")) return json({ status: "error", message: "invalid_email" }, 400);
      if (password.length < 6) return json({ status: "error", message: "weak_password" }, 400);
      if (!ROLES.has(role)) return json({ status: "error", message: "invalid_role" }, 400);

      const { data: created, error: createErr } = await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { display_name: displayName, team_member: true },
      });
      if (createErr || !created?.user) {
        return json({ status: "error", message: createErr?.message || "create_failed" }, 400);
      }

      const memberId = created.user.id;
      await admin.from("profiles").upsert({
        user_id: memberId,
        activated: true,
        plan: "start",
        team_owner_id: ownerId,
        member_role: role,
        display_name: displayName,
        role: "user",
      }, { onConflict: "user_id" });

      return json({
        status: "ok",
        member: { user_id: memberId, email, display_name: displayName, member_role: role },
      });
    }

    if (action === "update") {
      const target = String(body.target_user_id || "");
      if (!target) return json({ status: "error", message: "missing_target" }, 400);
      const { data: mem } = await admin.from("profiles").select("team_owner_id").eq("user_id", target).maybeSingle();
      if (!mem || mem.team_owner_id !== ownerId) return json({ status: "error", message: "not_member" }, 403);

      const patch: Record<string, unknown> = {};
      if (body.member_role && ROLES.has(String(body.member_role))) patch.member_role = body.member_role;
      if (body.display_name != null) patch.display_name = String(body.display_name).trim();
      if (Object.keys(patch).length) {
        await admin.from("profiles").update(patch).eq("user_id", target);
      }
      if (body.password && String(body.password).length >= 6) {
        await admin.auth.admin.updateUserById(target, { password: String(body.password) });
      }
      return json({ status: "ok" });
    }

    if (action === "remove") {
      const target = String(body.target_user_id || "");
      if (!target || target === ownerId) return json({ status: "error", message: "invalid_target" }, 400);
      const { data: mem } = await admin.from("profiles").select("team_owner_id").eq("user_id", target).maybeSingle();
      if (!mem || mem.team_owner_id !== ownerId) return json({ status: "error", message: "not_member" }, 403);
      await admin.auth.admin.deleteUser(target);
      return json({ status: "ok" });
    }

    return json({ status: "error", message: "unknown_action" }, 400);
  } catch (e) {
    return json({ status: "error", message: String(e?.message || e) }, 500);
  }
});
