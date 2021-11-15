export type AuthState = {
  token: string | null;
  loading: boolean;
  error: Error | null;
};
