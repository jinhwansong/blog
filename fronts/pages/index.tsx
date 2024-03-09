import React, { useEffect } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import axios from "axios";
import {AppDispatch, RootState } from "redux/store";
import { useSelector, useDispatch } from "react-redux";
import { categore, posts, recentPost } from "redux/reducers/post";
import { usePagination } from "hooks";
import { Common } from "components";
import wrapper from "../redux/store";

const Home = () => {
  const { postsDone: post} = useSelector((state:RootState)=> state.post);
  const { currentPage, totalPages, onPrevPage, onNextPage, onPage } =
    usePagination(post.count);
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(posts(currentPage));
  }, [currentPage]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>PGI's Blog</title>
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

// ssr 
export const getServerSideProps:GetServerSideProps =
  wrapper.getServerSideProps((store) => async({ req })=>{
    // 리퀘스트에서 가만히 있는게 아니라 성공으로 가게 하기 위해서.
    const cookie = req ? req.headers.cookie : "";
    axios.defaults.headers.Cookie = ""
    if (req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    };
    await store.dispatch(posts(1));
    await store.dispatch(categore());
    await store.dispatch(recentPost(7));
    return {
      props:{},
    }
})

export default Home;
