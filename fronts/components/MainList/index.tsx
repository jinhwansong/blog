import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";
import { like, unlike } from "redux/reducers/post";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { Tag } from "components";
import { ICommon } from "types";
import * as St from "./style";

interface IMainList {
  loc: string;
  post: ICommon[];
}

const MainList = ({ loc, post }: IMainList) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const onListPage = useCallback((v:number) => {
    router.push(`/${v}`);
  }, [router]);

  // 좋아요
  const onLikehandle = useCallback((e: React.MouseEvent<SVGElement>, id:number) => {
    e.stopPropagation();
    dispatch(like(id));
  }, []);

  // 싫어요
  const onUnLikehandle = useCallback((e: React.MouseEvent<SVGElement>, id: number) => {
    e.stopPropagation();
    dispatch(unlike(id));
  }, []);

  return (
    <St.MainList>
      {post?.map((v) => (
        <li onClick={() => onListPage(v.id)} key={v.id} role="presentation">
          <St.Image $width={loc}>
            <img
              src={
                v.src !== ""
                  ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${v.src}`
                  : "https://picsum.photos/95/95"
              }
              alt="프로필 이미지"
              width={95}
              height={95}
            />
          </St.Image>
          <St.TapText>
            <St.TapTitle $title={loc}>{v.title}</St.TapTitle>
            {loc !== "tap" && (
              <St.TapDetail dangerouslySetInnerHTML={{ __html: v.content }} />
            )}
            <St.TapSpan>
              {loc !== "tap" && (
                <>
                  <St.Date>{v.nickname}</St.Date>
                  <St.Like>
                    {v.like === 1 ? (
                      <IoHeartSharp onClick={(e) => onUnLikehandle(e, v.id)} />
                    ) : (
                      <IoHeartOutline onClick={(e) => onLikehandle(e, v.id)} />
                    )}
                    <p>{v.count}</p>
                  </St.Like>

                  <St.Date>{v.createdAt.slice(0, 10)}</St.Date>
                </>
              )}
              <Tag tag={v.hashtag} />
            </St.TapSpan>
          </St.TapText>
        </li>
      ))}
    </St.MainList>
  );
};

export default MainList;
