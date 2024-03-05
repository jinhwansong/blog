import React, { useCallback} from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { Input, Button } from "components";
import { IoIosClose } from "react-icons/io";
import { changeNick, checkNick, checkPassword, password, resetCheackNickDone, resetCheackPasswordDone } from "redux/reducers/user";
import * as St from "./style";
import { useSelector } from "react-redux";


interface IMyinfo {
  title: string;
  setPopup: React.Dispatch<
    React.SetStateAction<{
      name: string;
      open: boolean;
    }>
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

const Myinfo = (props: IMyinfo) => {
  const onClose = useCallback(
    () => {
      props.setPopup({ open: false, name: "" });
      props.setChange({
        ...props.change,
        password: "",
        passwordError: false,
        passwordCheck: "",
        passwordCheckError: false,
        currentPassword: "",
        currentPasswordError: false,
        nickName: "",
        nickNameError: false,
      });
    },
    []
  );
  const dispatch = useDispatch<AppDispatch>()
  const { cheackNickDone, cheackPasswordDone } = useSelector(
    (state: RootState) => state.user
  );
  const onButton = useCallback((v:string)=>{
    if (props.title === "닉네임 변경") return dispatch(checkNick({ nickName: v }));
    if (props.title === "비밀번호 변경")
      return dispatch(checkPassword({ password: v }));;
  },[])
  const onInfo = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (props.title === "닉네임 변경") {
        if (!props.change.nickName || !props.change.nickName.trim())
          return alert("닉네임을 작성해주세요");
        if (cheackNickDone === false) return alert("중복체크를 해주세요");
        dispatch(changeNick({ nickName: props.change.nickName }));
        dispatch(resetCheackNickDone());
        alert("닉네임이 변경되었습니다.")
        props.setPopup({ open: false, name: "" });
      }
      if (props.title === "비밀번호 변경") {
        if (
          !props.change.currentPassword ||
          !props.change.currentPassword.trim()
        )
          return alert("기존 비밀번호를 작성해주세요");
        if (cheackPasswordDone === false) return alert("중복체크를 해주세요");
        if (!props.change.password || !props.change.password.trim())
          return alert("비밀번호를 작성해주세요");
        if (!props.change.passwordCheck || !props.change.passwordCheck.trim())
          return alert("비밀번호를 다시 한번 입력해주세요.");
          if (props.change.passwordCheck !== props.change.password)
            return alert("비밀번호가 일치하지 않습니다.");
        dispatch(password({ password: props.change.password }));
        dispatch(resetCheackPasswordDone());
        props.setPopup({ open: false, name: "" });
      }
    },
    [
      props.change.nickName,
      cheackNickDone,
      cheackPasswordDone,
      props.change.password,
      props.change.passwordCheck,
      props.change.currentPassword,
    ]
  );
  return (
    <St.MyInfoPopup>
      <St.Popup>
        <St.PopupTitle>
          <span></span>
          <em>{props.title}</em>
          <IoIosClose onClick={onClose} />
        </St.PopupTitle>
        <St.PopupCon onSubmit={onInfo}>
          {props.title === "닉네임 변경" && (
            <Input
              id="nickName"
              placeholder="닉네임을 입력해주세요."
              erorrText="한글 영문을 조합해서 2글자 이상 8글자 미만으로 작성해주세요."
              type="text"
              cheack="info"
              onChange={props.onChange}
              value={props.change.nickName}
              erorr={props.change.nickNameError}
              able={
                !(
                  props.change.nickName.length < 8 &&
                  2 <= props.change.nickName.length
                )
              }
              onButton={() => onButton(props.change.nickName)}
            />
          )}
          {props.title === "비밀번호 변경" && (
            <St.PasswordWrap>
              <div>
                <Input
                  placeholder="기존 비밀번호를 입력해주세요."
                  type="password"
                  erorrText="올바르지 않은 비밀번호입니다."
                  onChange={props.onChangeCurrentPassword}
                  value={props.change.currentPassword}
                  erorr={!props.change.currentPasswordError}
                  cheack="info"
                  onButton={() => onButton(props.change.currentPassword)}
                  able={!props.change.currentPasswordError}
                />
              </div>
              <div>
                <Input
                  placeholder="변경할 비밀번호를 입력해주세요."
                  type="password"
                  erorrText="올바르지 않은 비밀번호입니다."
                  onChange={props.onChange}
                  value={props.change.password}
                  erorr={props.change.passwordError}
                />
              </div>
              <div>
                <Input
                  placeholder="비밀번호를 다시 한번 입력해주세요."
                  type="password"
                  erorrText="비밀번호가 서로 일치하지 않습니다."
                  onChange={props.onChangePasswordCheck}
                  value={props.change.passwordCheck}
                  erorr={props.change.passwordCheckError}
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
