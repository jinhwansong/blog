import React, { useState } from "react"
import { useSelector } from "react-redux";
import {RootState } from "redux/store";
import { useValid } from "hooks";
import { MdKeyboardArrowRight } from "react-icons/md";
import { LayOut, Myinfo } from "components";
import * as St from "./style";


const myinfo = ()=>{
    const { me } = useSelector((state: RootState) => state.user);
    const [popup, setPopup] = useState({
      name:"",
      open:false
    })

    const [change, setChange] = useState({
      currentPassword: "",
      currentPasswordError: false,
      password: "",
      passwordError: false,
      passwordCheck: "",
      passwordCheckError: false,
      nickName: "",
      nickNameError: false,
    });
    const {
      onChangePassword,
      onChangePasswordCheck,
      onChangeNickName,
      onChangeCurrentPassword,
    } = useValid(change, setChange);
    return (
      <LayOut>
        <St.MyInfo>
          <St.MyInfoImg>asd</St.MyInfoImg>
          <St.MyInfoSec>
            <St.MyInfoTit>계정 관리</St.MyInfoTit>
            <St.MyInfop>
              서비스에서 사용하는 내 계정 정보를 관리할 수 있습니다.
            </St.MyInfop>
            <St.MyInfoList>
              <p>이메일</p>
              <span>{me?.email}</span>
            </St.MyInfoList>
            <St.MyInfoList>
              <p>이름</p>
              <span>{me?.name}</span>
            </St.MyInfoList>
            <St.MyInfoLists
              onClick={() =>
                setPopup({ ...popup, name: "닉네임 변경", open: true })
              }
            >
              <p>닉네임</p>
              <span>{me?.nickName}</span>
              <MdKeyboardArrowRight />
            </St.MyInfoLists>
            <St.MyInfoLists
              onClick={() =>
                setPopup({ ...popup, name: "비밀번호 변경", open: true })
              }
            >
              <p>비밀번호 변경</p>
              <span>**************</span>
              <MdKeyboardArrowRight />
            </St.MyInfoLists>
          </St.MyInfoSec>
          <St.MyInfoSec>
            <St.MyInfoTit>개인 정보 보호</St.MyInfoTit>
            <St.MyInfop>
              내 계정을 안전하게 보호하기 위한 정보를 관리할 수 있습니다.
            </St.MyInfop>
            <St.MyInfoList>
              <em>회원 탈퇴</em>
            </St.MyInfoList>
          </St.MyInfoSec>
        </St.MyInfo>
        {popup.open && popup.name === "닉네임 변경" && (
          <Myinfo
            setChange={setChange}
            change={change}
            title={popup.name}
            setPopup={setPopup}
            onChange={onChangeNickName}
          />
        )}
        {popup.open && popup.name === "비밀번호 변경" && (
          <Myinfo
            setChange={setChange}
            change={change}
            title={popup.name}
            setPopup={setPopup}
            onChange={onChangePassword}
            onChangeCurrentPassword={onChangeCurrentPassword}
            onChangePasswordCheck={onChangePasswordCheck}
          />
        )}
      </LayOut>
    );
}

export default myinfo