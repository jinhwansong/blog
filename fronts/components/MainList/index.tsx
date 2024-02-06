import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { like, unlike } from "redux/reducers/post";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { Content, Tag } from "components";
import { ICommon } from "types";
import * as St from "./style";


interface IMainList {
  location: string;
  post: ICommon[];
}

const MainList = ({ location, post }: IMainList) => {
  const { me } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>()
  const onListPage = useCallback((v:number) => {
    router.push(`/${v}`);
  },[router]);
  // 좋아요
  const onLikehandle = useCallback((e: React.MouseEvent<SVGElement>,id:number) => {
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
        <li onClick={() => onListPage(v.id)} key={v.id}>
          <St.Image $width={location}>
            <img src={v.src} />
          </St.Image>
          <St.TapText>
            <St.TapTitle $title={location}>{v.title}</St.TapTitle>
            {location !== "tap" && (
              <St.TapDetail dangerouslySetInnerHTML={{ __html: v.content }} />
            )}
            <St.TapSpan>
              {location !== "tap" && (
                <>
                  <St.Like>
                    {v.Liked.find((v) => v.id === me?.id) ? (
                      <IoHeartSharp onClick={(e) => onUnLikehandle(e, v.id)} />
                    ) : (
                      <IoHeartOutline onClick={(e) => onLikehandle(e, v.id)} />
                    )}
                  </St.Like>

                  <St.Date>{v.nickName}</St.Date>
                  <St.Date>{v.createdAt.slice(0, 10)}</St.Date>
                </>
              )}
              <Tag />
            </St.TapSpan>
          </St.TapText>
        </li>
      ))}
    </St.MainList>
  );
};

export default MainList;
