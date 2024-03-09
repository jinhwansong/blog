import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { postDetail } from "redux/reducers/post";
import { Editor } from "components";

const modify = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const id = Number(router.query.id);

  useEffect(() => {
    dispatch(postDetail(id));
  }, []);

  const { postDetailDone } = useSelector((state: RootState) => state.post);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>PGI's Blog</title>
      </Head>
      <Editor
        types="modify"
        titleModify={postDetailDone?.title}
        contentModify={postDetailDone?.content}
        idModify={postDetailDone?.CategoreId}
        nameModify={postDetailDone?.categore}
      />
    </>
  );
};

export default modify;
