import React, { useEffect } from "react";
import { posts } from "redux/reducers/post";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";
import { Common } from "components";
import { usePagination } from "hooks";
import Head from "next/head";

const Search = () => {
  const { currentPage, totalPages, onPrevPage, onNextPage, onPage } =
    usePagination(post.count);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(posts(currentPage));
  }, [currentPage]);
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
export default Search;
