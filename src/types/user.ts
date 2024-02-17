export type User = {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: string;
  phone: string;
  confirmed_at: string;
  last_sign_in_at: string;
  app_metadata: { provider: string; providers: string[] };
  user_metadata: Record<string, unknown>;
  identities: Record<string, unknown>[];
  created_at: string;
  updated_at: string;
}

export type Session = {
  access_token: string;
  refresh_token: string;
  user: User;
  token_type: string;
  expires_in: number;
  expires_at: number;
}

