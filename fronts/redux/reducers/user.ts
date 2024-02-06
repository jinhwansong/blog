import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import {  baseAxios } from "utils/instance";
import * as I from "types";



interface UserInitialState {
  // 내상태
  me: null | I.User;
  // 유저정보 불러오기
  userInfo: null | I.User;
  // 회원가입
  userInfoLoding: boolean;
  userInfoDone: boolean;
  userInfoError: null | undefined | string;

  // 내 정보 불러오기
  myInfoLoding: boolean;
  myInfoDone: boolean;
  myInfoError: null | undefined | string;
  // 로그인
  loginLoding: boolean;
  loginDone: boolean;
  loginError: null | undefined | string;
  // 로그아웃
  logOutLoding: boolean;
  logOutDone: boolean;
  logOutError: null | undefined | string;
  // 회원가입
  signUpLoding: boolean;
  signUpDone: boolean;
  signUpError: null | unknown;

  // 이메일체크
  cheackIdLoding: boolean;
  cheackIdDone: boolean;
  cheackIdError: null | unknown;
  // 닉네임체크
  cheackNickLoding: boolean;
  cheackNickDone: boolean;
  cheackNickError: null | unknown;

  // 닉네임변경
  changeNickLoding: boolean;
  changeNickDone: boolean;
  changeNickError: null | unknown;
  // 비밀번호 비교
  cheackPasswordLoding: boolean;
  cheackPasswordDone: boolean;
  cheackPasswordError: null | unknown;
  // 비밀번호변경
  changePasswordLoding: boolean;
  changePasswordDone: boolean;
  changePasswordError: null | unknown;
}
const initialState: UserInitialState = {
  // 내 상태
  me: null,
  // 유저 정보 불러오기
  userInfo: null,
  // 유저 정보 불러오기
  userInfoLoding: false,
  userInfoDone: false,
  userInfoError: null,
  // 내 정보 불러오기
  myInfoLoding: false,
  myInfoDone: false,
  myInfoError: null,
  // 로그인
  loginLoding: false,
  loginDone: false,
  loginError: null,
  // 로그아웃
  logOutLoding: false,
  logOutDone: false,
  logOutError: null,
  // 회원가입
  signUpLoding: false,
  signUpDone: false,
  signUpError: null,

  // 이메일체크
  cheackIdLoding: false,
  cheackIdDone: false,
  cheackIdError: null,
  // 닉네임체크
  cheackNickLoding: false,
  cheackNickDone: false,
  cheackNickError: null,

  // 닉네임변경
  changeNickLoding: false,
  changeNickDone: false,
  changeNickError: null,
  // 비밀번호 비교
  cheackPasswordLoding: false,
  cheackPasswordDone: false,
  cheackPasswordError: null,
  // 비밀번호변경
  changePasswordLoding: false,
  changePasswordDone: false,
  changePasswordError: null,
};

// 로그인
export const login = createAsyncThunk("user/login", async (data: I.User) => {
  const response = await baseAxios.post("/user/login", data);
  return response;
});
// 로그아웃
export const logOut = createAsyncThunk("user/logout", async () => {
  const response = await baseAxios.post("/user/logout");
  return response;
});
// 유저정보
export const userInfo = createAsyncThunk("user/userinfo", async () => {
  const response = await baseAxios.get("/user/info");
  return response;
});
// 내정보
export const myInfo = createAsyncThunk("user/myinfo", async () => {
  const response = await baseAxios.get("/user");
  return response;
});
// 회원가입
export const signUp = createAsyncThunk(
  "user/signup",
  async (data: I.User) => {
   const response = await baseAxios.post("/user", data);
   return response;
  }
);
// 이메일 체크
export const chackId = createAsyncThunk(
  "user/chackId",
  async (data: I.User) => {
    const response = await baseAxios.post("/user/checkId", {
      email: data.email,
    });
    return response;
  }
);
// 닉네임 체크
export const checkNick = createAsyncThunk(
  "user/checkNick",
  async (data: I.User) => {
    const response = await baseAxios.post("/user/checkNick", {
      nickName: data.nickName,
    });
    return response;
  }
);
// 닉네임 변경
export const changeNick = createAsyncThunk("user/changeNick", async (data: I.User) => {
  const response = await baseAxios.patch("/user/nickname", {
    nickName: data.nickName,
  });
  return response;
});
// 비밀번호확인
export const checkPassword = createAsyncThunk(
  "user/checkPassword",
  async (data: I.User) => {
    const response = await baseAxios.post("/user/passwordCheck", {
      password: data.password,
    });
    return response;
  }
);
// 비밀번호변경
export const password = createAsyncThunk("user/password", async (data: I.User) => {
  const response = await baseAxios.patch("/user/password", {
    password: data.password,
  });
  return response;
});


const UserReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetSignUpDone: (state) => {
      state.signUpDone = false;
    },
    resetCheackNickDone: (state) => {
      state.cheackNickDone = false;
    },
    resetCheackPasswordDone: (state) => {
      state.cheackPasswordDone = false;
    },
  },

  extraReducers: (builder) =>
    builder
      // 로그인
      .addCase(login.pending, (draft) => {
        draft.loginLoding = true;
        draft.loginError = null;
        draft.loginDone = false;
      })
      .addCase(login.fulfilled, (draft, action) => {
        draft.loginLoding = false;
        draft.loginDone = true;
        draft.me = action.payload.data;
      })
      .addCase(login.rejected, (draft, action) => {
        draft.loginLoding = false;
        draft.loginError = action.error.message;
      })
      // 로그아웃
      .addCase(logOut.pending, (draft) => {
        draft.logOutLoding = true;
        draft.logOutError = null;
        draft.logOutDone = false;
      })
      .addCase(logOut.fulfilled, (draft) => {
        draft.logOutLoding = false;
        draft.logOutDone = true;
        draft.loginDone = false;
        draft.me = null;
      })
      .addCase(logOut.rejected, (draft, action) => {
        draft.logOutLoding = false;
        draft.logOutError = action.error.message;
      })
      // 유저정보
      .addCase(userInfo.pending, (draft) => {
        draft.userInfoLoding = true;
        draft.userInfoError = null;
        draft.userInfoDone = false;
      })
      .addCase(userInfo.fulfilled, (draft, action) => {
        draft.userInfoLoding = false;
        draft.userInfoDone = true;
        draft.me = action.payload.data;
      })
      .addCase(userInfo.rejected, (draft, action) => {
        draft.userInfoLoding = false;
        draft.userInfoError = action.error.message;
      })
      // 내정보 새로고침시 계속 불러오기
      .addCase(myInfo.pending, (draft) => {
        draft.myInfoLoding = true;
        draft.myInfoError = null;
        draft.myInfoDone = false;
      })
      .addCase(myInfo.fulfilled, (draft, action) => {
        draft.myInfoLoding = false;
        draft.myInfoDone = true;
        draft.me = action.payload.data;
      })
      .addCase(myInfo.rejected, (draft, action) => {
        draft.myInfoLoding = false;
        draft.myInfoError = action.error.message;
      })
      // 회원가입
      .addCase(signUp.pending, (draft) => {
        draft.signUpLoding = true;
        draft.signUpError = null;
        draft.signUpDone = false;
      })
      .addCase(signUp.fulfilled, (draft) => {
        draft.signUpLoding = false;
        draft.signUpDone = true;
      })
      .addCase(signUp.rejected, (draft, action) => {
        draft.signUpLoding = false;
        draft.signUpDone = false;
        draft.signUpError = action.payload;
      })
      // 이메일체크
      .addCase(chackId.pending, (draft) => {
        draft.cheackIdLoding = true;
        draft.cheackIdError = null;
        draft.cheackIdDone = false;
      })
      .addCase(chackId.fulfilled, (draft) => {
        draft.cheackIdLoding = false;
        draft.cheackIdDone = true;
      })
      .addCase(chackId.rejected, (draft, action) => {
        draft.cheackIdLoding = false;
        draft.cheackIdDone = false;
        draft.cheackIdError = action.payload;
      })
      // 닉네임체크
      .addCase(checkNick.pending, (draft) => {
        draft.cheackNickLoding = true;
        draft.cheackNickError = null;
        draft.cheackNickDone = false;
      })
      .addCase(checkNick.fulfilled, (draft) => {
        draft.cheackNickLoding = false;
        draft.cheackNickDone = true;
      })
      .addCase(checkNick.rejected, (draft, action) => {
        draft.cheackNickLoding = false;
        draft.cheackNickError = action.payload;
      })

      // 닉네임변경
      .addCase(changeNick.pending, (draft) => {
        draft.changeNickLoding = true;
        draft.changeNickError = null;
        draft.changeNickDone = false;
      })
      .addCase(changeNick.fulfilled, (draft, action) => {
        draft.changeNickLoding = false;
        draft.changeNickDone = true;
        if (draft.me?.nickName) {
          draft.me.nickName = action.payload.data.nickName;
        }
      })
      .addCase(changeNick.rejected, (draft, action) => {
        draft.changeNickLoding = false;
        draft.changeNickDone = false;
        draft.changeNickError = action.payload;
      })
      // 비밀번호 체크
      .addCase(checkPassword.pending, (draft) => {
        draft.cheackPasswordLoding = true;
        draft.cheackPasswordError = null;
        draft.cheackPasswordDone = false;
      })
      .addCase(checkPassword.fulfilled, (draft) => {
        draft.cheackPasswordLoding = false;
        draft.cheackPasswordDone = true;
      })
      .addCase(checkPassword.rejected, (draft, action) => {
        draft.cheackPasswordLoding = false;
        draft.cheackPasswordDone = false;
        draft.cheackPasswordError = action.payload;
      })

      // 비밀번호 변경
      .addCase(password.pending, (draft) => {
        draft.changePasswordLoding = true;
        draft.changePasswordError = null;
        draft.changePasswordDone = false;
      })
      .addCase(password.fulfilled, (draft, action) => {
        draft.changePasswordLoding = false;
        draft.changePasswordDone = true;
      })
      .addCase(password.rejected, (draft, action) => {
        draft.changePasswordLoding = false;
        draft.changePasswordDone = false;
        draft.changePasswordError = action.payload;
      }),
});
export const { resetSignUpDone, resetCheackNickDone, resetCheackPasswordDone } =
  UserReducer.actions;
export default UserReducer