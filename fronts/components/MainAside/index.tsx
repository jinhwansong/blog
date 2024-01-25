import React, { useState } from "react";
import { FcSearch, FcAbout, FcIdea, FcAnswers } from "react-icons/fc";
import { useInput } from "hooks";
import { Button, MainList, Tag, Categore } from "components";
import * as St from "./style";

const MainAside = () => {
  const [search, onChangeSearch, setSearch] = useInput("");
  const readTap = [{ name: "최근 7일" }, { name: "최근 1달" }];
  const [tap, setTap] = useState("최근 7일");
  return (
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
            width="50%"
            onButton={() => setSearch("")}
          >
            초기화
          </Button>
          <Button bg="blue" font="1.2" color="fff" width="50%">
            검색
          </Button>
        </St.ButtonWrap>
        <St.Tag>
          <St.Title>
            <FcAbout />
            <p>많이 검색된 기술태그</p>
          </St.Title>
          <Tag />
        </St.Tag>
      </div>
      <div>
        <St.Title>
          <FcAnswers />
          <p>카테고리</p>
        </St.Title>
        <Categore />
      </div>
      <div>
        <St.Title>
          <FcIdea />
          <p>가장 많이 읽은 글</p>
        </St.Title>

        <St.TapWrap>
          {readTap.map((v, index) => (
            <li key={index} onClick={() => setTap(v.name)}>
              <Button
                font="1.2"
                hoverbg={tap === v.name ? "blue" : "f7f7f7"}
                hovercolor={tap === v.name ? "fff" : "black"}
                color={tap === v.name ? "fff" : ""}
                bg={tap === v.name ? "blue" : "f7f7f7"}
                width="8"
              >
                {v.name}
              </Button>
            </li>
          ))}
        </St.TapWrap>
        {tap === "최근 7일" && (
          <ul>
            <MainList location="tap" />
          </ul>
        )}
        {tap === "최근 1달" && (
          <ul>
            <MainList location="tap" />
          </ul>
        )}
      </div>
    </St.Aside>
  );
};

export default MainAside;
