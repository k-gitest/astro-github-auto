import type { APIRoute } from "astro";
import { supabase } from '@/lib/supabase';

export const GET: APIRoute = async ({ request }) => {

  let dataDB = []
  try {

    if (request.headers.get("Content-Type") === "application/json") {
      //const body = await request.json();
      
    } else {
      return new Response("不明なデータ形式です", { status: 400 });
    }
    
    let { data, error } = await supabase
      .from('todo')
      .select("*")

      // Filters
      .eq('column', 'Equal to')
      .gt('column', 'Greater than')
      .lt('column', 'Less than')
      .gte('column', 'Greater than or equal to')
      .lte('column', 'Less than or equal to')
      .like('column', '%CaseSensitive%')
      .ilike('column', '%CaseInsensitive%')
      .is('column', null)
      .in('column', ['Array', 'Values'])
      .neq('column', 'Not equal to')

      // Arrays
      .contains('array_column', ['array', 'contains'])
      .containedBy('array_column', ['contained', 'by'])

    if (error) {
        return new Response(error.message, { status: 400 });
    } else {
      dataDB = data ?? [];
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
      todo: dataDB
    })
  );
};