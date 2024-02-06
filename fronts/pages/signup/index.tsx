import React, {  useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import {
  resetSignUpDone,
  signUp,
  chackId,
  checkNick,
} from "redux/reducers/user";

import { FaCheck } from "react-icons/fa";
import { useValid } from "hooks";
import { Button, Input, LayOut } from "components";
import * as St from "./style";



const Signup = () => {

  const { signUpDone, me } = useSelector(
    (state: RootState) => state.user
  );
  const email = ["naver.com", "gmail.com", "daum.net"];
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>();
  const [signUps, setSignUps] = useState({
    email: "",
    emailError: false,
    password: "",
    passwordError: false,
    passwordCheck: "",
    passwordCheckError: false,
    name: "",
    nameError: false,
    nickName: "",
    nickNameError: false,
    term: [] as string[],
    termAll: false,
  });
  const {
    onChangeEmail,
    onChangePassword,
    onChangePasswordCheck,
    onChangeNickName,
    onChangeName,
  } = useValid(signUps, setSignUps);
  
  // 체크
  const onChangeTerm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = e.target;
      const term = checked
        ? [...signUps.term, name]
        : signUps.term.filter((v) => v !== name);
      
      setSignUps((prev) => ({
        ...prev,
        term,
        termAll: term.length === 3
      }));
    },
    [signUps.term, signUps.termAll, signUps.term.length]
  );
  const onChangeTermAll = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { checked } = e.target;
      setSignUps((prev) => ({ ...prev, termAll: checked,}));
      if (checked) {
        setSignUps((prev) => ({
          ...prev,
          term: ["term1", "term2", "term3"],
        }));
      }else{ 
        setSignUps((prev) => ({...prev, term: []}))
      }
    },
    [signUps.termAll, signUps.term]
  );
 
 useEffect(() => {
   if (me && me.email) {
     router.replace("/");
   }
 }, [me]);
  useEffect(() => {
    if (signUpDone) {
      router.replace("/login");
      dispatch(resetSignUpDone());
    }
  }, [signUpDone]);
  // 회원가입
  const onSignUp = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (
        signUps.email.split("@")[1] !== "naver.com" &&
        signUps.email.split("@")[1] !== "daum.net" &&
        signUps.email.split("@")[1] !== "gmail.com"
      )
        return alert("네이버,다음,구글 이메일만 사용이 가능합니다.");
        if (!signUps.name || !signUps.name.trim()) return alert("이름을 작성해주세요");
        if (!signUps.nickName || !signUps.nickName.trim()) return alert("닉네임을 작성해주세요");
        if (!signUps.password || !signUps.password.trim())
          return alert("비밀번호를 작성해주세요");
          dispatch(
            signUp({
              email: signUps.email,
              name: signUps.name,
              nickName: signUps.nickName,
              password: signUps.password,
            })
          );
      
    },
    [signUps]
  );

  // 중복체크 
  const onButton = useCallback(
    (v: string) => {
      if (v === "email") return dispatch(chackId({ email: signUps.email }));
      if (v === "nickName")
        return dispatch(checkNick({ nickName: signUps.nickName }));
    },
    [signUps.email, signUps.nickName]
  );
  return (
    <>
      <Head>
        <title>내 회원가입 | 진환이 블로그</title>
      </Head>
      <LayOut>
        <St.Form onSubmit={onSignUp}>
          <St.Title>회원가입</St.Title>
          <div>
            <Input
              label="이메일"
              id="email"
              placeholder="이메일을 입력해주세요."
              type="email"
              value={signUps.email}
              onChange={onChangeEmail}
              erorr={signUps.emailError}
              erorrText="올바른 이메일을 입력해주세요."
              cheack="cheack"
              onButton={() => onButton("email")}
              able={!email.includes(signUps.email.split("@")[1])}
            />
          </div>
          <div>
            <Input
              label="이름"
              id="name"
              placeholder="이름을 입력해주세요."
              type="text"
              value={signUps.name}
              onChange={onChangeName}
              erorr={signUps.nameError}
              erorrText="한글 영문을 조합해서 2글자 이상 8글자
                미만으로 작성해주세요"
            />
          </div>

          <div>
            <Input
              label="닉네임"
              id="nickName"
              placeholder="닉네임을 입력해주세요."
              type="text"
              value={signUps.nickName}
              onChange={onChangeNickName}
              erorr={signUps.nickNameError}
              onButton={() => onButton("nickName")}
              able={
                !(signUps.nickName.length < 8 && 2 <= signUps.nickName.length)
              }
              cheack="cheack"
              erorrText="한글 영문을 조합해서 2글자 이상 8글자
                미만으로 작성해주세요"
            />
          </div>
          <div>
            <Input
              label="비밀번호"
              id="password"
              placeholder="비밀번호을 입력해주세요."
              type="password"
              value={signUps.password}
              onChange={onChangePassword}
              erorr={signUps.passwordError}
              erorrText="올바르지 않은 비밀번호입니다."
            />
          </div>
          <div>
            <Input
              label="비밀번호 확인"
              id="passwordCheck"
              placeholder="비밀번호를 다시 한번 입력해주세요."
              type="password"
              value={signUps.passwordCheck}
              onChange={onChangePasswordCheck}
              erorr={signUps.passwordCheckError}
              erorrText="비밀번호가 서로 일치하지 않습니다."
            />
            <St.PasswordText>
              영문 대소문자, 숫자, 특수문자를 3가지 이상으로 조합해 8자 이상
              16자 이하로 입력해주세요.
            </St.PasswordText>
          </div>
          <div>
            <St.CheckLabel htmlFor="term" $check={signUps.termAll}>
              <span>{signUps.termAll && <FaCheck />}</span>
              전체 동의
            </St.CheckLabel>
            <St.Checkbox
              id="term"
              checked={signUps.termAll}
              onChange={onChangeTermAll}
              name="term"
              type="checkbox"
            />
            <St.CheckboxUl>
              <li>
                <St.CheckLabels
                  htmlFor="term1"
                  $check={signUps.term.includes("term1")}
                >
                  <span>{signUps.term.includes("term1") && <FaCheck />}</span>만
                  14세 이상입니까(필수)
                </St.CheckLabels>
                <St.Checkbox
                  id="term1"
                  checked={signUps.term.includes("term1") ? true : false}
                  onChange={onChangeTerm}
                  name="term1"
                  type="checkbox"
                />
              </li>
              <li>
                <St.CheckLabels
                  htmlFor="term2"
                  $check={signUps.term.includes("term2")}
                >
                  <span>{signUps.term.includes("term2") && <FaCheck />}</span>
                  회원가입 하시겠습니까(필수)
                </St.CheckLabels>
                <St.Checkbox
                  id="term2"
                  checked={signUps.term.includes("term2") ? true : false}
                  onChange={onChangeTerm}
                  name="term2"
                  type="checkbox"
                />
              </li>
              <li>
                <St.CheckLabels
                  htmlFor="term3"
                  $check={signUps.term.includes("term3")}
                >
                  <span>{signUps.term.includes("term3") && <FaCheck />}</span>
                  회원가입 하시겠습니까
                </St.CheckLabels>
                <St.Checkbox
                  id="term3"
                  checked={signUps.term.includes("term3") ? true : false}
                  onChange={onChangeTerm}
                  name="term3"
                  type="checkbox"
                />
              </li>
            </St.CheckboxUl>
          </div>
          <div>
            <Button
              themes="disabled"
              width="full"
              height="5"
              font="1.2"
              radius="1"
              hoverbg={
                signUps.emailError ||
                signUps.passwordError ||
                signUps.passwordCheckError ||
                signUps.nameError ||
                signUps.nickNameError ||
                !signUps.termAll
                  ? "f7f7f7"
                  : "blue"
              }
              hovercolor={
                signUps.emailError ||
                signUps.passwordError ||
                signUps.passwordCheckError ||
                signUps.nameError ||
                signUps.nickNameError ||
                !signUps.termAll
                  ? "black"
                  : "fff"
              }
              color={
                signUps.emailError ||
                signUps.passwordError ||
                signUps.passwordCheckError ||
                signUps.nameError ||
                signUps.nickNameError ||
                !signUps.termAll
                  ? "black"
                  : "fff"
              }
              bg={
                signUps.emailError ||
                signUps.passwordError ||
                signUps.passwordCheckError ||
                signUps.nameError ||
                signUps.nickNameError ||
                !signUps.termAll
                  ? "f7f7f7"
                  : "blue"
              }
              disabled={
                signUps.emailError ||
                signUps.passwordError ||
                signUps.passwordCheckError ||
                signUps.nameError ||
                signUps.nickNameError ||
                !signUps.termAll
              }
              type="submit"
            >
              가입하기
            </Button>
          </div>
        </St.Form>
      </LayOut>
    </>
  );
};
export default Signup;
