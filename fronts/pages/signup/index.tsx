import React, {  useCallback, useState } from "react";
import Head from "next/head";
import * as St from "./style"
import { useValid } from "hooks";
import { FaCheck } from "react-icons/fa";
import { Button, Input, LayOut } from "components";

const Signup = () => {
  const [signUp, setSignUp] = useState({
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
  } = useValid(signUp, setSignUp);

  const onSignUp = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }, []);
  const onChangeTerm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = e.target;
      const term = checked
        ? [...signUp.term, name]
        : signUp.term.filter((v) => v !== name);
      
      setSignUp((prev) => ({
        ...prev,
        term,
        termAll: term.length === 3
      }));
    },
    [signUp.term, signUp.termAll, signUp.term.length]
  );
  
  const onChangeTermAll = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { checked } = e.target;
      setSignUp((prev) => ({ ...prev, termAll: checked,}));
      if (checked) {
        setSignUp((prev) => ({
          ...prev,
          term: ["term1", "term2", "term3"],
        }));
      }else{ 
        setSignUp((prev) => ({...prev, term: []}))
      }
    },
    [signUp.termAll, signUp.term]
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
              value={signUp.email}
              onChange={onChangeEmail}
              erorr={signUp.emailError}
              erorrText="올바른 이메일을 입력해주세요."
            />
          </div>
          <div>
            <Input
              label="이름"
              id="name"
              placeholder="이름을 입력해주세요."
              type="text"
              value={signUp.name}
              onChange={onChangeName}
              erorr={signUp.nameError}
              erorrText="이름에는 공백과 특수문자가 포함될 수 없고 2글자 이상 8글자
                미만으로 작성해주세요"
            />
          </div>

          <div>
            <Input
              label="닉네임"
              id="nickName"
              placeholder="닉네임을 입력해주세요."
              type="text"
              value={signUp.nickName}
              onChange={onChangeNickName}
              erorr={signUp.nickNameError}
              erorrText="닉네임에는 공백과 특수문자가 포함될 수 없고 2글자 이상 8글자
                미만으로 작성해주세요"
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
            <Input
              label="비밀번호 확인"
              id="passwordCheck"
              placeholder="비밀번호를 다시 한번 입력해주세요."
              type="password"
              value={signUp.passwordCheck}
              onChange={onChangePasswordCheck}
              erorr={signUp.passwordCheckError}
              erorrText="비밀번호가 서로 일치하지 않습니다."
            />
            <St.PasswordText>
              영문 대소문자, 숫자, 특수문자를 3가지 이상으로 조합해 8자 이상
              16자 이하로 입력해주세요.
            </St.PasswordText>
          </div>
          <div>
            <St.CheckLabel htmlFor="term" $check={signUp.termAll}>
              <span>{signUp.termAll && <FaCheck />}</span>
              전체 동의
            </St.CheckLabel>
            <St.Checkbox
              id="term"
              checked={signUp.termAll}
              onChange={onChangeTermAll}
              name="term"
              type="checkbox"
            />
            <St.CheckboxUl>
              <li>
                <St.CheckLabels
                  htmlFor="term1"
                  $check={signUp.term.includes("term1")}
                >
                  <span>{signUp.term.includes("term1") && <FaCheck />}</span>만
                  14세 이상입니까(필수)
                </St.CheckLabels>
                <St.Checkbox
                  id="term1"
                  checked={signUp.term.includes("term1") ? true : false}
                  onChange={onChangeTerm}
                  name="term1"
                  type="checkbox"
                />
              </li>
              <li>
                <St.CheckLabels
                  htmlFor="term2"
                  $check={signUp.term.includes("term2")}
                >
                  <span>{signUp.term.includes("term2") && <FaCheck />}</span>
                  회원가입 하시겠습니까(필수)
                </St.CheckLabels>
                <St.Checkbox
                  id="term2"
                  checked={signUp.term.includes("term2") ? true : false}
                  onChange={onChangeTerm}
                  name="term2"
                  type="checkbox"
                />
              </li>
              <li>
                <St.CheckLabels
                  htmlFor="term3"
                  $check={signUp.term.includes("term3")}
                >
                  <span>{signUp.term.includes("term3") && <FaCheck />}</span>
                  회원가입 하시겠습니까
                </St.CheckLabels>
                <St.Checkbox
                  id="term3"
                  checked={signUp.term.includes("term3") ? true : false}
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
                signUp.email.length <= 1 ||
                signUp.emailError ||
                signUp.password.length <= 1 ||
                signUp.passwordCheck.length <= 1 ||
                signUp.name.length <= 1 ||
                signUp.nickName.length <= 1 ||
                signUp.passwordError ||
                signUp.passwordCheckError ||
                signUp.nameError ||
                signUp.nickNameError ||
                !signUp.termAll
                  ? "f7f7f7"
                  : "blue"
              }
              hovercolor={
                signUp.email.length <= 1 ||
                signUp.emailError ||
                signUp.password.length <= 1 ||
                signUp.passwordCheck.length <= 1 ||
                signUp.name.length <= 1 ||
                signUp.nickName.length <= 1 ||
                signUp.passwordError ||
                signUp.passwordCheckError ||
                signUp.nameError ||
                signUp.nickNameError ||
                !signUp.termAll
                  ? "black"
                  : "fff"
              }
              color={
                signUp.email.length <= 1 ||
                signUp.emailError ||
                signUp.password.length <= 1 ||
                signUp.passwordCheck.length <= 1 ||
                signUp.name.length <= 1 ||
                signUp.nickName.length <= 1 ||
                signUp.passwordError ||
                signUp.passwordCheckError ||
                signUp.nameError ||
                signUp.nickNameError ||
                !signUp.termAll
                  ? "black"
                  : "fff"
              }
              bg={
                signUp.email.length <= 1 ||
                signUp.emailError ||
                signUp.password.length <= 1 ||
                signUp.passwordCheck.length <= 1 ||
                signUp.name.length <= 1 ||
                signUp.nickName.length <= 1 ||
                signUp.passwordError ||
                signUp.passwordCheckError ||
                signUp.nameError ||
                signUp.nickNameError ||
                !signUp.termAll
                  ? "f7f7f7"
                  : "blue"
              }
              disabled={
                signUp.email.length <= 1 ||
                signUp.password.length <= 1 ||
                signUp.passwordCheck.length <= 1 ||
                signUp.name.length <= 1 ||
                signUp.nickName.length <= 1 ||
                signUp.emailError ||
                signUp.passwordError ||
                signUp.passwordCheckError ||
                signUp.nameError ||
                signUp.nickNameError ||
                !signUp.termAll
              }
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
