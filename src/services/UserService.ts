import { LoginReqType, LoginResType, SignUpReqType, User } from "../types";
import axios from "axios";

const headers = {
  "content-type": "application/json",
  apikey: "FcKdtJs202110",
  username: "KooJaYoon",
};

export default class UserService {
  private static getUrl(endPoint: string): string {
    return `https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/${endPoint}`;
  }

  public static async login(reqData: LoginReqType): Promise<LoginResType> {
    const url = UserService.getUrl("login");
    const response = await axios.post(url, reqData, {
      headers,
    });

    return response.data;
  }

  public static async auth(token: string): Promise<User> {
    const url = UserService.getUrl("me");
    const response = await axios({
      url,
      method: "POST",
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }

  public static async signup(reqData: SignUpReqType): Promise<LoginReqType> {
    const url = UserService.getUrl("signup");

    const response = await axios({
      url,
      method: "POST",
      headers,
      data: {
        ...reqData,
      },
    });

    return response.data;
  }

  public static async logout(token: string): Promise<boolean> {
    const url = UserService.getUrl("logout");
    const response = await axios({
      url,
      method: "POST",
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
}
