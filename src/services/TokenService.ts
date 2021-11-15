const LOCAL_STORAGE_TOKEN_KEY_NAME = "token";

export default class TokenService {
  public static get(): string | null {
    return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY_NAME);
  }
}
