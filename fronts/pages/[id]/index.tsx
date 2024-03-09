import React, { useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { postDetail, deletePost } from "redux/reducers/post";
import { LayOut, Tag, Content, Button } from "components";
import * as St from "./style";

const ReadPage  = () => { 
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { me } = useSelector((state: RootState) => state.user); 
  const { postDetailDone } = useSelector((state: RootState) => state.post);

  useEffect(() => {
    dispatch(postDetail(Number(router.query.id)));
  }, [router]);

  const onDelete = useCallback(
    (v: number | undefined) => {
      if (window.confirm("게시물을 삭제하시겠습니까?")) {
        dispatch(deletePost(v));
        router.replace("/");
      } else {
        alert("취소하셨습니다.");
      }
    },
    []
  );

  return (
    <LayOut>
      <St.Wrap>
        <St.WrapTop>
          <St.Title>{postDetailDone?.title}</St.Title>
          <St.Other>
            <St.Date>
              <em>{postDetailDone?.nickname}</em>
              <span> · {postDetailDone?.createdAt?.slice(0, 10)}</span>
            </St.Date>
            {me && me?.nickName === postDetailDone?.nickname && (
              <St.Button>
                <Link href={`/${Number(router.query.id)}/modify`}>수정</Link>
                <Button
                  font="1.6"
                  color="red"
                  width="auto"
                  type="button"
                  onButton={() => onDelete(postDetailDone?.id)}
                >
                  삭제
                </Button>
              </St.Button>
            )}
          </St.Other>
          <Tag tag={postDetailDone?.Hashtags} />
        </St.WrapTop>
        <Content content={postDetailDone?.content} />
      </St.Wrap>
    </LayOut>
  );
};

export default ReadPage;