import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";
import { validateFormData } from '@/lib/authvalidation';

export const POST: APIRoute = async ({ request, cookies }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  const validationError = validateFormData({
    email: formData.get('email')?.toString(),
    password: formData.get('password')?.toString(),
  });

  if (!email || !password || validationError) {
    return new Response("emailかpasswordに問題があります", { status: 400 });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return new Response("ログイン情報が無効です", { status: 500 });
  }

  const { access_token, refresh_token } = data.session;

  cookies.set("sb-access-token", access_token, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  cookies.set("sb-refresh-token", refresh_token, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  const getAccessToken = cookies.get('sb-access-token')
  const getRefreshToken = cookies.get('sb-refresh-token')

  if (!getAccessToken || !getRefreshToken) {
    return new Response("データが取得できませんでした", { status: 500 });
  }

  return new Response(data?.session?.user?.id, { status: 200 });
};