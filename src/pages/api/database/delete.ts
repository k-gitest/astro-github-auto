import type { APIRoute } from "astro";
import { supabase } from '@/lib/supabase';

export const DELETE: APIRoute = async ({ request }) => {

  //let dataDB = []
  try {
    
    if (request.headers.get("Content-Type") === "application/json") {
      //const body = await request.json();

    } else {
      return new Response("不明なデータ形式です", { status: 400 });
    }

    const { error } = await supabase
      .from('todo')
      .delete()
      .eq('todo', 'someValue')

    if (error) {
        return new Response(error.message, { status: 400 });
    } else {
      //dataDB = data
    }

  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    } else {
      return new Response("Unknown error occurred", { status: 500 });
    }
  }

  return new Response(
    JSON.stringify({
      status: 200
    })
  );
};