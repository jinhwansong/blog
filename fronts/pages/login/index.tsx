import React, { useState } from "react";
import Head from "next/head";
import { Input, LayOut, Button } from "components";
import {useValid} from "hooks";
import * as St from "./style";
import Link from "next/link";

const Login = ()=>{
    const [signUp, setSignUp] = useState({
    email: "",
    emailError: false,
    password: "",
    passwordError: false,
  });
  const { onChangeEmail, onChangePassword } = useValid(signUp, setSignUp);
    return (
      <>
        <Head>
          <title>내 로그인 | 진환이 블로그</title>
        </Head>
        <LayOut>
          <St.Form>
            <St.Title>로그인</St.Title>
            <div>
              <Input
                label="이메일"
                id="email"
                placeholder="이메일을 입력해주세요."
                type="email"
                value={signUp.email}
                onChange={onChangeEmail}
                erorr={signUp.emailError}
                erorrText="올바른 이메일을 입력해주세요."
              />
            </div>
            <div>
              <Input
                label="비밀번호"
                id="password"
                placeholder="비밀번호을 입력해주세요."
                type="password"
                value={signUp.password}
                onChange={onChangePassword}
                erorr={signUp.passwordError}
                erorrText="올바르지 않은 비밀번호입니다."
              />
            </div>
            <div>
              <Button
                themes="disabled"
                width="full"
                height="5"
                font="1.2"
                radius="1"
                hoverbg={
                  signUp.email.length <= 1 ||
                  signUp.password.length <= 1 ||
                  signUp.emailError ||
                  signUp.passwordError
                    ? "f7f7f7"
                    : "blue"
                }
                hovercolor={
                  signUp.email.length <= 1 ||
                  signUp.password.length <= 1 ||
                  signUp.emailError ||
                  signUp.passwordError
                    ? "black"
                    : "fff"
                }
                color={
                  signUp.email.length <= 1 ||
                  signUp.password.length <= 1 ||
                  signUp.emailError ||
                  signUp.passwordError
                    ? "black"
                    : "fff"
                }
                bg={
                  signUp.email.length <= 1 ||
                  signUp.password.length <= 1 ||
                  signUp.emailError ||
                  signUp.passwordError
                    ? "f7f7f7"
                    : "blue"
                }
                disabled={
                  signUp.email.length <= 1 ||
                  signUp.password.length <= 1 ||
                  signUp.emailError ||
                  signUp.passwordError
                }
              >
                가입하기
              </Button>
            </div>
          </St.Form>
          <St.Other>
            <Link href={"/"}>비밀번호 재설정</Link> <p>|</p>{" "}
            <Link href={"/signup"}>회원가입</Link>
          </St.Other>
        </LayOut>
      </>
    );
}
export default Login;