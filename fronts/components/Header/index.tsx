import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { logOut, myInfo } from "redux/reducers/user";
import { Button } from "components";
import * as St from "./style";


const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
    const {me} = useSelector((state:RootState)=>state.user)
    const router = useRouter()
    const [profileTap, setProfileTap] = useState(false);

    const logOutButton = useCallback(() => {
      dispatch(logOut());
      router.replace("/")
    }, []);
    useEffect(()=>{
      dispatch(myInfo());
    },[])
  return (
    <St.HeaderWrap>
      <St.Header>
        <Link href={"/"}>로고</Link>
        {me && me.email ? (
          <St.GroupButton>
            <Link href={"/write"}>
              <Button
                themes="disabled"
                font="1.2"
                height="3.5"
                width="8"
                bg="white"
                border="ddd"
                type="button"
              >
                새 글 작성
              </Button>
            </Link>
            <St.Profile onClick={() => setProfileTap((prev) => !prev)}>
              <div>
                <img
                  src={
                    me?.image
                      ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${
                          me && me.image
                        }`
                      : "https://picsum.photos/95/95"
                  }
                  alt="프로필 이미지"
                  width={95}
                  height={95}
                />
              </div>
              {profileTap && (
                <St.ProfileTap>
                  <Link href={"/myinfo"}>내 정보 수정</Link>
                  <Link href={"/myblog"}>나의 활동</Link>
                  <Button
                    onButton={() => logOutButton()}
                    font="1.2"
                    width="full"
                    bg="f7f7f7"
                    hoverbg="blue"
                    hovercolor="fff"
                    type="button"
                  >
                    로그아웃
                  </Button>
                </St.ProfileTap>
              )}
            </St.Profile>
          </St.GroupButton>
        ) : (
          <Link href={"/login"}>
            <Button
              width="8"
              font="1.2"
              radius="1"
              hoverbg="blue"
              hovercolor="fff"
              color="fff"
              bg="blue"
              type="button"
            >
              로그인
            </Button>
          </Link>
        )}
      </St.Header>
    </St.HeaderWrap>
  );
};
export default Header;