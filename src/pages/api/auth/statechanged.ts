import type { APIRoute } from "astro";
import { supabase } from '@/lib/supabase';

export const GET: APIRoute = async () => {
  let user;
  let authState;
  const waitForAuthStateChange = () => {
    return new Promise<void>((resolve) => {
      supabase.auth.onAuthStateChange((event, session) => {
        user = session?.user;
        authState = event;
        resolve();
      });
    });
  };

  await waitForAuthStateChange();

  return new Response(
    JSON.stringify({
      auth: authState,
      user: user
    })
  );
};
