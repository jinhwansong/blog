import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { searchs } from "redux/reducers/post";
import { Common } from "components";
import { usePagination } from "hooks";

const Search = () => {
  const router = useRouter();
  const { searchDone: post } = useSelector((state: RootState) => state.post);
  const { currentPage, totalPages, onPrevPage, onNextPage, onPage } =
    usePagination(post.count);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(
      searchs({ search: router.query.Search as string, page: currentPage })
    );
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
