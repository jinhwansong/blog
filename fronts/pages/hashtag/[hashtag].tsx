import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { hashtags } from "redux/reducers/post";
import { Common } from "components";
import { usePagination } from "hooks";

const hashtag = () => {
  const router = useRouter();
  const { hashtagDone: post } = useSelector((state:RootState)=> state.post);
  const { currentPage, totalPages, onPrevPage, onNextPage, onPage } =
    usePagination(post.count);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(hashtags({hashtag:router.query.hashtag as string, page: currentPage }));
  }, [currentPage]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>PGI Blog | 해시태그</title>
      </Head>
      <Common
        posts={post.posts}
        count={totalPages}
        onPrevPage={onPrevPage}
        onNextPage={onNextPage}
        onPage={onPage}
        currentPage={currentPage}
      />
    </>
  );
};
export default hashtag;
