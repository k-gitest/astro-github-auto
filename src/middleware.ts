import { defineMiddleware } from "astro/middleware";
import type { MiddlewareHandler } from 'astro';
import { supabase } from "@/lib/supabase";

const registerPage = '/register(|/)'
const signinPage = '/signin(|/)'
const protectedRoutes = '/dashboard(|/)';

export const onRequest: MiddlewareHandler = defineMiddleware(async ({ locals, url, cookies, redirect }, next) => {

  const accessToken = cookies.get("sb-access-token");
  const refreshToken = cookies.get("sb-refresh-token");

  if (url.pathname.match(signinPage) || url.pathname.match(registerPage)) {

    if (accessToken && refreshToken) {
      return redirect("/dashboard");
    }

  }

  if (url.pathname.match(protectedRoutes)) {
    if (!accessToken || !refreshToken) {
      return redirect("/signin");
    }

    const { data, error } = await supabase.auth.setSession({
      refresh_token: refreshToken.value,
      access_token: accessToken.value,
    });

    if (error) {
      cookies.delete("sb-access-token", {
        path: "/",
      });
      cookies.delete("sb-refresh-token", {
        path: "/",
      });

      return redirect("/signin");
    }

    locals.id = data?.user?.id!;
    locals.aud = data?.user?.aud;
    locals.role = data?.user?.role;
    locals.email = data?.user?.email!;
    locals.email_confirmed_at = data?.user?.email_confirmed_at;
    locals.phone = data?.user?.phone;
    locals.confirmed_at = data?.user?.confirmed_at;
    locals.last_sign_in_at = data?.user?.last_sign_in_at;
    locals.app_metadata = data?.user?.app_metadata;
    locals.user_metadata = data?.user?.user_metadata;
    locals.identities = data?.user?.identities;
    locals.created_at = data?.user?.created_at;
    locals.updated_at = data?.user?.updated_at;

  }
  return next()

});