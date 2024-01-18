import React, { useCallback, useState } from "react";
import Link from "next/link";
import {Button} from "components";
import * as St from "./style";


const Header = () => {
    const [profileTap, setProfileTap] = useState(false);
    const [login, setLogin] = useState(false);
    const writeButton = useCallback(()=>{
        console.log("asd")
    },[])
    const logOutButton = useCallback(() => {
      console.log("asd");
    }, []);
    
  return (
    <St.HeaderWrap>
      <St.Header>
        <Link href={"/"}>로고</Link>
        {login ? (
          <St.GroupButton>
            <Button
              onButton={() => writeButton()}
              font="1.2"
              height="3.5"
              width="8"
              bg="white"
              border="ddd"
            >
              새 글 작성
            </Button>
            <St.Profile onClick={() => setProfileTap((prev) => !prev)}>
              <div>
                <img src="https://picsum.photos/250/250" />
              </div>
              {profileTap && (
                <St.ProfileTap>
                  <Link href={"/user"}>내 정보 수정</Link>
                  <Link href={"/myActivity"}>나의 활동</Link>
                  <Button
                    onButton={() => logOutButton()}
                    font="1.2"
                    width="full"
                    bg="f7f7f7"
                  >
                    로그아웃
                  </Button>
                </St.ProfileTap>
              )}
            </St.Profile>
          </St.GroupButton>
        ) : (
          <Link href={"/login"}>로그인</Link>
        )}
      </St.Header>
    </St.HeaderWrap>
  );
};
export default Header;