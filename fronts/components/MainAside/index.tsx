import React, { useCallback, useEffect,useState } from "react";
import { FcSearch, FcAbout, FcIdea, FcAnswers } from "react-icons/fc";

import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { categore } from "redux/reducers/post";
import { usePagination, useInput } from "hooks";
import { Button, MainList, Tag } from "components";
import { ICommon } from "types";
import * as St from "./style";


const MainAside = ({ post }: { post: ICommon[] }) => {
   const router = useRouter();
   const param = useParams();
   const dispatch = useDispatch<AppDispatch>();
  const [search, onChangeSearch, setSearch] = useInput("");
  const readTap = [{ name: "최근 7일" }, { name: "최근 1달" }];
  const [tap, setTap] = useState("최근 7일");
 
  const { categore: name } = useSelector((state: RootState) => state.post);
  const onCategore = useCallback((name: string, totalItems: number) => {
    const { currentPage } = usePagination({ totalItems });
    router.push(`/categore=${name}&page=${currentPage}`);
  }, []);
  useEffect(() => {
    dispatch(categore());
  }, []);

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
            type="button"
          >
            초기화
          </Button>
          <Button bg="blue" font="1.2" color="fff" width="50%" type="button">
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
        <St.Categore>
          {name?.map((v) => (
            <St.CategoreLi
              onClick={() => onCategore(v.categore, v.count)}
              $color={param.name === v.categore}
              key={v.id}
            >
              <p>{v.categore}</p>
              <span>{v.count}</span>
            </St.CategoreLi>
          ))}
        </St.Categore>
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
                type="button"
              >
                {v.name}
              </Button>
            </li>
          ))}
        </St.TapWrap>
        {tap === "최근 7일" && <MainList location="tap" post={post} />}
        {tap === "최근 1달" && <MainList location="tap" post={post} />}
      </div>
    </St.Aside>
  );
};

export default MainAside;
