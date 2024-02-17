import type { APIRoute } from "astro";
import { supabase } from '@/lib/supabase';

export const GET: APIRoute = async () => {

  let dataDB = []
  try {
  
    const { data: fetchedData, error } = await supabase.from('todo').select('*')
    
    if (error) {
        return new Response(error.message, { status: 400 });
    } else {
      dataDB = fetchedData
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