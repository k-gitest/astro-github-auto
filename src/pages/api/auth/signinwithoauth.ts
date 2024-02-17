import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";

export const POST: APIRoute = async () => {

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: import.meta.env.SUPABASE_AUTH_REDIRECT,
    },
  })

  if (error) {
    return new Response("認証に失敗しました", { status: 500 });
  }

  return new Response(JSON.stringify({url: data?.url, status: 200 }));
  
};