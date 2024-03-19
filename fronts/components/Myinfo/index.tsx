import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { Input, Button } from "components";
import { IoIosClose } from "react-icons/io";
import {
  changeNick,
  checkNick,
  checkPassword,
  password,
  resetCheackNickDone,
  resetCheackPasswordDone,
} from "redux/reducers/user";
import * as St from "./style";

interface IMyinfo {
  title: string;
  setPopup: React.Dispatch<
    React.SetStateAction<{ names: string; opens: boolean }>
  >;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePasswordCheck?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCurrentPassword?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setChange: React.Dispatch<
    React.SetStateAction<{
      password: string;
      passwordError: boolean;
      passwordCheck: string;
      passwordCheckError: boolean;
      nickName: string;
      nickNameError: boolean;
      currentPassword: string;
      currentPasswordError: boolean;
    }>
  >;
  change: {
    password: string;
    passwordError: boolean;
    passwordCheck: string;
    passwordCheckError: boolean;
    nickName: string;
    nickNameError: boolean;
    currentPassword: string;
    currentPasswordError: boolean;
  };
}

const Myinfo = ({
  title,
  setPopup,
  setChange,
  change,
  onChange,
  onChangeCurrentPassword,
  onChangePasswordCheck,
}: IMyinfo) => {
  const onClose = useCallback(() => {
    setPopup({ opens: false, names: "" });
    setChange({
      ...change,
      password: "",
      passwordError: false,
      passwordCheck: "",
      passwordCheckError: false,
      currentPassword: "",
      currentPasswordError: false,
      nickName: "",
      nickNameError: false,
    });
  }, []);

  const dispatch = useDispatch<AppDispatch>();

  const { cheackNickDone, cheackPasswordDone } = useSelector(
    (state: RootState) => state.user
  );

  const onButton = useCallback((v: string) => {
    if (title === "닉네임 변경") {
      return dispatch(checkNick({ nickName: v }));
    }
    if (title === "비밀번호 변경") {
      return dispatch(checkPassword({ password: v }));
    }
  }, []);

  const onInfo = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (title === "닉네임 변경") {
        if (!change.nickName || !change.nickName.trim()) {
          return alert("닉네임을 작성해주세요");
        }
        if (cheackNickDone === false) {
          return alert("중복체크를 해주세요");
        }
        dispatch(changeNick({ nickName: change.nickName }));
        dispatch(resetCheackNickDone());
        alert("닉네임이 변경되었습니다.");
        setPopup({ opens: false, names: "" });
      }
      if (title === "비밀번호 변경") {
        if (!change.currentPassword || !change.currentPassword.trim()) {
          return alert("기존 비밀번호를 작성해주세요");
        }

        if (cheackPasswordDone === false) {
          return alert("중복체크를 해주세요");
        }
        if (!change.password || !change.password.trim()) {
          return alert("비밀번호를 작성해주세요");
        }

        if (!change.passwordCheck || !change.passwordCheck.trim()) {
          return alert("비밀번호를 다시 한번 입력해주세요.");
        }

        if (change.passwordCheck !== change.password) {
          return alert("비밀번호가 일치하지 않습니다.");
        }

        dispatch(password({ password: change.password }));
        dispatch(resetCheackPasswordDone());
        setPopup({ opens: false, names: "" });
      }
    },
    [
      change.nickName,
      cheackNickDone,
      cheackPasswordDone,
      change.password,
      change.passwordCheck,
      change.currentPassword,
    ]
  );

  return (
    <St.MyInfoPopup>
      <St.Popup>
        <St.PopupTitle>
          <span>a</span>
          <em>{title}</em>
          <IoIosClose onClick={onClose} />
        </St.PopupTitle>
        <St.PopupCon onSubmit={onInfo}>
          {title === "닉네임 변경" && (
            <Input
              id="nickName"
              placeholder="닉네임을 입력해주세요."
              errorText="한글 영문을 조합해서 2글자 이상 8글자 미만으로 작성해주세요."
              type="text"
              check="info"
              onChange={onChange}
              value={change.nickName}
              error={change.nickNameError}
              able={
                !(change.nickName.length < 8 && change.nickName.length >= 2)
              }
              onButton={() => onButton(change.nickName)}
            />
          )}
          {title === "비밀번호 변경" && (
            <St.PasswordWrap>
              <div>
                <Input
                  placeholder="기존 비밀번호를 입력해주세요."
                  type="password"
                  errorText="올바르지 않은 비밀번호입니다."
                  onChange={(e) => onChangeCurrentPassword?.(e)}
                  value={change.currentPassword}
                  error={!change.currentPasswordError}
                  check="info"
                  onButton={() => onButton(change.currentPassword)}
                  able={!change.currentPasswordError}
                />
              </div>
              <div>
                <Input
                  placeholder="변경할 비밀번호를 입력해주세요."
                  type="password"
                  errorText="올바르지 않은 비밀번호입니다."
                  onChange={onChange}
                  value={change.password}
                  error={change.passwordError}
                />
              </div>
              <div>
                <Input
                  placeholder="비밀번호를 다시 한번 입력해주세요."
                  type="password"
                  errorText="비밀번호가 서로 일치하지 않습니다."
                  onChange={(e) => onChangePasswordCheck?.(e)}
                  value={change.passwordCheck}
                  error={change.passwordCheckError}
                />
              </div>
            </St.PasswordWrap>
          )}
          <St.Button>
            <Button
              bg="f7f7f7"
              font="1.2"
              width="8"
              onButton={() => onClose()}
              type="button"
            >
              취소
            </Button>
            <Button bg="blue" font="1.2" color="fff" width="8" type="submit">
              변경
            </Button>
          </St.Button>
        </St.PopupCon>
      </St.Popup>
    </St.MyInfoPopup>
  );
};

export default Myinfo;
