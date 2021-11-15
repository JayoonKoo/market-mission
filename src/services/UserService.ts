import { LoginReqType, LoginResType, User } from "../types";
import axios from "axios";

const USER_API_URL =
  "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/login";
const USER_API_AUTH =
  "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/me";

const headers = {
  "content-type": "application/json",
  apikey: "FcKdtJs202110",
  username: "KooJaYoon",
};

export default class UserService {
  public static async login(reqData: LoginReqType): Promise<LoginResType> {
    const response = await axios.post(USER_API_URL, reqData, {
      headers,
    });

    return response.data;
  }

  public static async auth(token: string): Promise<User> {
    const response = await axios({
      url: USER_API_AUTH,
      method: "POST",
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
}
