import React, { useCallback,useState } from "react";
import { FcSearch, FcIdea, FcAnswers } from "react-icons/fc";
import { useRouter } from "next/router";
import { useSelector,useDispatch } from "react-redux";
import {  AppDispatch, RootState } from "redux/store";
import { categores, recentPost, searchs } from "redux/reducers/post";
import { useInput } from "hooks";
import { Button, MainList } from "components";
import * as St from "./style";




const MainAside = () => {
   const router = useRouter();
   const dispatch = useDispatch<AppDispatch>()
  const [search, onChangeSearch, setSearch] = useInput("");
  const readTap = [
    { name: "최근 7일", time: 7 },
    { name: "최근 1달", time: 30 },
  ];
  const [tap, setTap] = useState({
    name: "최근 7일",
    time: 7,
  });

  // 카테고리
  const { categore: name, recentPostDone:post } = useSelector(
    (state: RootState) => state.post
  );
  const onCategore = useCallback((name: string) => {
    dispatch(categores({ categore: name, page: 1 }));
    router.push(`/categore/${name}`);
  }, []);
  const onDate = useCallback(
    (name: string, time: number) => {
      setTap({ ...tap, name: name, time: time });
      dispatch(recentPost(time));
    },
    [tap]
  );
 
  const onSearch = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, search: string) => {
      e.stopPropagation();
      if (!search || !search.trim()) return alert("검색어를 적어주세요");
      dispatch(searchs({ search, page: 1 }));
      router.push(`/search/${search}`);
      setSearch("")
    },
    [router]
  );


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
          <Button
            bg="blue"
            font="1.2"
            color="fff"
            width="50%"
            type="button"
            onButton={(e) => onSearch(e, search)}
          >
            검색
          </Button>
        </St.ButtonWrap>
      </div>
      <div>
        <St.Title>
          <FcAnswers />
          <p>카테고리</p>
        </St.Title>
        <St.Categore>
          {name?.map((v) => (
            <St.CategoreLi
              onClick={() => onCategore(v.categore)}
              $color={(router.query.categore as string) === v.categore}
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
            <li key={index} onClick={() => onDate(v.name, v.time)}>
              <Button
                font="1.2"
                hoverbg={tap.name === v.name ? "blue" : "f7f7f7"}
                hovercolor={tap.name === v.name ? "fff" : "black"}
                color={tap.name === v.name ? "fff" : ""}
                bg={tap.name === v.name ? "blue" : "f7f7f7"}
                width="8"
                type="button"
              >
                {v.name}
              </Button>
            </li>
          ))}
        </St.TapWrap>
        {tap.name === "최근 7일" && <MainList location="tap" post={post} />}
        {tap.name === "최근 1달" && <MainList location="tap" post={post} />}
      </div>
    </St.Aside>
  );
};

export default MainAside;
