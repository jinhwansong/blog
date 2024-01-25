import React, { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";

import {Tag} from "components";
import * as St from "./style";
import { useRouter } from "next/router";


interface IMainList {
  location: string;
}

const MainList = ({ location }: IMainList) => {
  const router = useRouter()
  const likeRef = useRef<HTMLButtonElement>(null)
  const tagRef = useRef<HTMLUListElement>(null);
  const [like,setLike] = useState(false)
  const onListPage = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    if (
      likeRef.current &&
      !likeRef.current.contains(e.target as Node) &&
      tagRef.current &&
      !tagRef.current.contains(e.target as Node)
    )
      router.push("/1");
  }, []);
  const onLikehandle = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setLike((prev) => !prev);
    },
    [like]
  );
  
  return (
    <St.MainList>
      <li onClick={onListPage}>
        <St.Image $width={location}>
          <img src="https://picsum.photos/250/250" />
        </St.Image>
        <St.TapText>
          <St.TapTitle $title={location}>
            asdaasda asdasda sdasdasda sdasdasdasd asdasdasdasdasdasd asdasdas
            dasdasdasd
          </St.TapTitle>
          {location !== "tap" && (
            <St.TapDetail>
              내용을 적어주세요 내용을 적어주세요 내용을 적어주세요 내용을
              적어주세요 내용을 적어주세요 내용을 적어주세요
            </St.TapDetail>
          )}
          <St.TapSpan>
            {location !== "tap" && (
              <>
                <St.Like onClick={onLikehandle} ref={likeRef}>
                  {like ? <IoHeartSharp /> : <IoHeartOutline />}
                </St.Like>
                <St.Date>2024.01.19</St.Date>
              </>
            )}

            <Tag ref={tagRef} />
          </St.TapSpan>
        </St.TapText>
      </li>
    </St.MainList>
  );
};

export default MainList;
