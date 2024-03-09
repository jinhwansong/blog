import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { GetServerSideProps } from "next";
import axios from "axios";
import { AppDispatch, RootState } from "redux/store";
import { useSelector, useDispatch } from "react-redux";
import { myInfo, login } from "redux/reducers/user";
import { Input, LayOut, Button } from "components";
import { useValid } from "hooks";
import * as St from "./style";
import wrapper from "../../redux/store";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loginDone, me } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const [inLogin, setInLogin] = useState({
    email: "",
    emailError: false,
    password: "",
    passwordError: false,
  });
  const { onChangeEmail, onChangePassword } = useValid(inLogin, setInLogin);
  useEffect(() => {
    if (me && me.email) {
      router.replace("/");
    }
  }, [me]);

  useEffect(() => {
    if (loginDone) {
      router.replace("/");
    }
  }, [loginDone]);
  const onLogin = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (inLogin.email.trim() === "") return alert("이메일을 작성해 주세요");
      if (inLogin.password.trim() === "")
        return alert("비밀번호를 작성해 주세요");
      dispatch(login({ email: inLogin.email, password: inLogin.password }));
    },
    [inLogin.email, inLogin.password]
  );
  return (
    <>
      <Head>
        <title>내 로그인 | 진환이 블로그</title>
      </Head>
      <LayOut>
        <St.LoginWrap>
          <St.Form onSubmit={onLogin}>
            <St.Title>로그인</St.Title>
            <div>
              <Input
                label="이메일"
                id="email"
                placeholder="이메일을 입력해주세요."
                type="email"
                value={inLogin.email}
                onChange={onChangeEmail}
                error={inLogin.emailError}
                errorText="올바른 이메일을 입력해주세요."
              />
            </div>
            <div>
              <Input
                label="비밀번호"
                id="password"
                placeholder="비밀번호을 입력해주세요."
                type="password"
                value={inLogin.password}
                onChange={onChangePassword}
                error={inLogin.passwordError}
                errorText="올바르지 않은 비밀번호입니다."
              />
            </div>
            <div>
              <Button
                width="full"
                height="5"
                font="1.2"
                radius="1"
                hoverbg="blue"
                hovercolor="fff"
                color="fff"
                bg="blue"
                type="submit"
              >
                로그인
              </Button>
            </div>
          </St.Form>
          <St.Other>
            <Link href={"/"}>비밀번호 재설정</Link> <p>|</p>
            <Link href={"/signup"}>회원가입</Link>
          </St.Other>
        </St.LoginWrap>
      </LayOut>
    </>
  );
};

// ssr
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ req }) => {
    const cookie = req ? req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    await store.dispatch(myInfo());
    return {
      props: {},
    };
  });

export default Login;
