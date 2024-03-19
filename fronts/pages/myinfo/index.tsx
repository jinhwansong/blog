import React, { useCallback, useRef, useState } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { myInfo, profile } from "redux/reducers/user";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useValid } from "hooks";
import { LayOut, Myinfo } from "components";
import * as St from "components/Info/style";
import wrapper from "../../redux/store";

const myinfo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { me } = useSelector((state: RootState) => state.user);
  const [popup, setPopup] = useState({
    names: "",
    opens: false,
  });
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

  // 이미지 교체
  const profileRef = useRef<HTMLInputElement>(null);
  const onProfile = useCallback(() => {
    profileRef.current?.click();
  }, []);
  const onChangeProfile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        if (e.target.files[0].name.length > 30) {
          return alert("글자수를 30글자 미만으로 적어주세요");
        }
        if (e.target.files[0].size > 20 * 1024 * 1024) {
          return alert("파일크기를 줄여주세요");
        }
        const profiles = new FormData();
        profiles.append("profile", e.target.files[0]);
        dispatch(profile(profiles));
      }
    },
    []
  );

  return (
    <>
      <Head>
        <title>{me.name}님의 개인정보</title>
        <meta name="description" content={me.name} />
        <meta property="og:title" content={`${me.name} 님의 개인정보`} />
        <meta property="og:description" content={`${me.name} 님의 개인정보`} />
        <meta
          name="og:image"
          content={`${process.env.NEXT_PUBLIC_SERVER_URL}/${me && me.image}`}
        />
        <meta name="og:url" content={`http://localhost:3000/myinfo`} />
      </Head>
      <LayOut>
        <St.MyInfo>
          <St.MyInfoImg onClick={onProfile}>
            <img
              src={
                me?.image
                  ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${me && me.image}`
                  : "https://picsum.photos/95/95"
              }
              alt="프로필 이미지"
              width={95}
              height={95}
            />
            <input
              type="file"
              id="profile"
              name="profile"
              hidden
              ref={profileRef}
              onChange={onChangeProfile}
            />
          </St.MyInfoImg>
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
                setPopup({ ...popup, names: "닉네임 변경", opens: true })}
            >
              <p>닉네임</p>
              <span>{me?.nickName}</span>
              <MdKeyboardArrowRight />
            </St.MyInfoLists>
            <St.MyInfoLists
              onClick={() =>
                setPopup({ ...popup, names: "비밀번호 변경", opens: true })}
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
        {popup.opens && popup.names === "닉네임 변경" && (
          <Myinfo
            setChange={setChange}
            change={change}
            title={popup.names}
            setPopup={setPopup}
            onChange={onChangeNickName}
          />
        )}
        {popup.opens && popup.names === "비밀번호 변경" && (
          <Myinfo
            setChange={setChange}
            change={change}
            title={popup.names}
            setPopup={setPopup}
            onChange={onChangePassword}
            onChangeCurrentPassword={onChangeCurrentPassword}
            onChangePasswordCheck={onChangePasswordCheck}
          />
        )}
      </LayOut>
    </>
  );
};

// ssr
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ req }) => {
    // 리퀘스트에서 가만히 있는게 아니라 성공으로 가게 하기 위해서.
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

export default myinfo;
