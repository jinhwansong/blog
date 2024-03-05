import React, { useEffect } from "react";
import { posts } from "redux/reducers/post";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { Common } from "components";
import { usePagination } from "hooks";
import Head from "next/head";
import { useSelector } from "react-redux";

const hashtag = () => {
  const {hashtagDone:post} = useSelector((state:RootState)=>state.post)
  const { currentPage, totalPages, onPrevPage, onNextPage, onPage } =
    usePagination(post.count);
  const dispatch = useDispatch<AppDispatch>();
  
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>PGI's Blog | 검색</title>
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
