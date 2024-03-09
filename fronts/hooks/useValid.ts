import React,{ useCallback } from "react";

interface IuseValid {
  email?: string;
  emailError?: boolean;
  password: string;
  passwordError: boolean;
  passwordCheck?: string;
  passwordCheckError?: boolean;
  name?: string;
  nameError?: boolean;
  nickName?: string;
  nickNameError?: boolean;
  currentPassword?: string;
  currentPasswordError?: boolean;
}


const useValid = <T extends IuseValid>(
  signUp: T,
  setSignUp: React.Dispatch<React.SetStateAction<T>>
) => {
  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const emailError = signUp.email && !signUp.email.includes("@");
      setSignUp((prev) => ({ ...prev, email: e.target.value, emailError }));
    },
    [signUp.emailError, signUp.email]
  );
  const passwordValid = /^.*(?=^.{7,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/
  const onChangeCurrentPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordError = passwordValid.test(signUp.currentPassword as string);
      setSignUp((prev) => ({
        ...prev,
        currentPassword: e.target.value,
        currentPasswordError: !passwordError,
      }));
    },
    [signUp.passwordError, signUp.password]
  );
  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordError = passwordValid.test(signUp.password);
      setSignUp((prev) => ({
        ...prev,
        password: e.target.value,
        passwordError: !passwordError,
      }));
    },
    [signUp.passwordError, signUp.password]
  );
  const onChangePasswordCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSignUp((prev) => ({
        ...prev,
        passwordCheck: e.target.value,
        passwordCheckError: signUp.password !== e.target.value,
      }));
    },
    [
      signUp.password,
      signUp.passwordCheck,
      signUp.passwordError,
      signUp.passwordCheckError,
    ]
  );
  
const onChangeName = useCallback(
  (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChangeName(name, value);
  },
  [signUp.name]
);
const onChangeNickName = useCallback(
  (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    handleChangeName(name, value);
  },
  [signUp.nickName]
);
const handleChangeName = useCallback(
  (name: string, value: string) => {
    const nameError = /^[가-힣a-zA-Z]{2,7}$/.test(value);
    setSignUp((prev) => ({
      ...prev,
      [name]: value,
      [`${name}Error`]: !nameError,
    }));
  },
  [signUp.nickName, signUp.name, signUp.nickNameError, signUp.nameError]
);


  return {
    onChangeEmail,
    onChangePassword,
    onChangePasswordCheck,
    onChangeNickName,
    onChangeName,
    onChangeCurrentPassword,
  };
};
export default useValid