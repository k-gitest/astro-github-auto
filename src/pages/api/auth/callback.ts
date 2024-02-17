import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";

export const GET: APIRoute = async ({ url, cookies, redirect }) => {

  const code = url.searchParams.get("code");

  if (!code) {
    return new Response("認証コードがありません", { status: 400 });
  }

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return new Response("認証できませんでした", { status: 500 });
  }

  const { access_token, refresh_token } = data.session;

  cookies.set("sb-access-token", access_token, {
    path: "/",
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
  cookies.set("sb-refresh-token", refresh_token, {
    path: "/",
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });

  return redirect("/dashboard");
};