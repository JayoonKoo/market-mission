import { RouterState } from "connected-react-router";
import { AnyAction, Reducer } from "redux";

export interface RootState {
  auth: AuthState;
  router: Reducer<RouterState<unknown>, AnyAction>;
}

export type AuthState = {
  token: string | null;
  loading: boolean;
  error: Error | null;
  user?: User;
};

export type LoginReqType = {
  email: string;
  password: string;
};

export type User = {
  email: string;
  displayName: string;
  profileImg: string;
};

// {
// 	"user": {
// 		"email": "thesecon@gmail.com",
// 		"displayName": "ParkYoungWoong",
// 		"profileImg": "https://storage.googleapis.com/heropy-api/vAKjlJ-Gx5v163442.png"
// 	},
// 	"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjlQS3I...(생략)"
// }

export type LoginResType = {
  user: User;
  accessToken: string;
};
