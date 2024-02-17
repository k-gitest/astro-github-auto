/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly SUPABASE_URL: string
  readonly SUPABASE_ANON_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare namespace App {
  interface Locals {
    path?: string;
    id: string;
    aud?: string | undefined;
    role?: string | undefined;
    email: string;
    email_confirmed_at?: string | undefined;
    phone?: string | undefined;
    confirmed_at?: string | undefined;
    last_sign_in_at?: string | undefined;
    app_metadata?: UserAppMetadata | undefined;
    user_metadata?: UserMetadata | undefined;
    identities?: UserIdentity[] | undefined;
    created_at?: string | undefined;
    updated_at?: string | undefined;
  }
}
