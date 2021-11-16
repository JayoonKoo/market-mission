import { call, put, takeEvery } from "@redux-saga/core/effects";
import { push } from "connected-react-router";
import { Action, createActions, handleActions } from "redux-actions";
import TokenService from "../../services/TokenService";
import UserService from "../../services/UserService";
import {
  AuthState,
  LoginReqType,
  LoginResType,
  SignUpReqType,
  User,
} from "../../types";

const initialState: AuthState = {
  token: null,
  loading: false,
  errorMsg: null,
  user: undefined,
};

const prefix = "market-mission/auth";

export const { pending, success, fail } = createActions(
  "PENDING",
  "SUCCESS",
  "FAIL",
  { prefix }
);

const reducer = handleActions<AuthState, LoginResType>(
  {
    PENDING: (state) => ({
      ...state,
      loading: true,
      errorMsg: null,
    }),
    SUCCESS: (state, action) => ({
      token: action.payload.accessToken,
      loading: false,
      errorMsg: null,
      user: action.payload.user,
    }),
    FAIL: (state, action: any) => ({
      ...state,
      loading: false,
      errorMsg: action.payload,
    }),
  },
  initialState,
  { prefix }
);

export default reducer;

// saga

export const { login, logout, auth, signup } = createActions(
  "LOGIN",
  "LOGOUT",
  "AUTH",
  "SIGNUP",
  { prefix }
);

function* loginSaga(action: Action<LoginReqType>) {
  try {
    yield put(pending());
    const loginUser: LoginResType = yield call(
      UserService.login,
      action.payload
    );
    TokenService.set(loginUser.accessToken);
    yield put(success(loginUser));
    yield put(push("/"));
  } catch (error: any) {
    const madeError = error?.response?.data || "UNKWON_ERROR";
    yield put(fail(madeError));
  }
}

function* authConfirmSaga() {
  try {
    yield put(pending());
    const token = TokenService.get();
    console.log(token);

    if (token === null) {
      yield put(success({ accessToken: token, user: undefined }));
    } else {
      const currentUser: User = yield call(UserService.auth, token);
      yield put(success({ accessToken: token, user: currentUser }));
    }
  } catch (error: any) {
    const madeError = error?.response?.data || "UNKWON_ERROR";
    yield put(fail(madeError));
  }
}

function* signUpSaga(action: Action<SignUpReqType>) {
  try {
    yield put(pending());
    yield call(UserService.signup, action.payload);

    yield put(
      success({
        user: undefined,
        accessToken: null,
      })
    );
    yield put(push("/"));
  } catch (error: any) {
    const madeError = error?.response?.data || "UNKWON_ERROR";
    yield put(fail(madeError));
  }
}

function* logoutSaga() {
  try {
    yield put(pending());
    const token = TokenService.get();
    if (token === null) throw new Error("토큰이 없습니다.");
    yield call(UserService.logout, token);
    yield put(success({ user: undefined, accessToken: null }));
  } catch (error: any) {
    yield put(fail(error?.message || error?.response?.data || "UNKWON_ERROR"));
  }
}

export function* authSaga() {
  yield takeEvery(`${prefix}/LOGIN`, loginSaga);
  yield takeEvery(`${prefix}/AUTH`, authConfirmSaga);
  yield takeEvery(`${prefix}/SIGNUP`, signUpSaga);
  yield takeEvery(`${prefix}/LOGOUT`, logoutSaga);
}
