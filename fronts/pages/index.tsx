import React from "react";
import { Button, LayOut } from "components";
import {useInput} from "hooks";
import { FcSearch, FcAbout } from "react-icons/fc";
import * as St from "./style";
import Link from "next/link";

const Home = () => {
  const [search,onChangeSearch,setSearch] = useInput("")
  return (
    <LayOut>
      <St.Main>
        <St.Aside>
          <div>
            <St.Title>
              <FcSearch />
              <p>검색하기</p>
            </St.Title>
            <St.Input
              onChange={onChangeSearch}
              value={search}
              name="search"
              type="text"
              placeholder="검색어를 입력해주세요"
            />
            <St.ButtonWrap>
              <Button
                bg="f7f7f7"
                font="1.2"
                hoverbg="f7f7f7"
                hovercolor="black"
                width="50%"
              >
                초기화
              </Button>
              <Button
                bg="blue"
                font="1.2"
                color="fff"
                hoverbg="blue"
                hovercolor="fff"
                width="50%"
              >
                검색
              </Button>
            </St.ButtonWrap>
            <St.Tag>
              <St.Title>
                <FcAbout />
                <p>어제 가장 많이 검색된 기술태그</p>
              </St.Title>
              <St.TagUl>
                <li>
                  <Link href={"/"}>asqweqwrvzxvd</Link>
                </li>
                <li>
                  <Link href={"/"}>azzxczsd</Link>
                </li>
                <li>
                  <Link href={"/"}>asdddd</Link>
                </li>
              </St.TagUl>
            </St.Tag>
          </div>
        </St.Aside>
        <St.Contener>asd</St.Contener>
      </St.Main>
    </LayOut>
  );
};
export default Home;
