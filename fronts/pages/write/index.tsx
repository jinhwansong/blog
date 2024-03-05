import React from "react";
import { Editor } from "components";
import Head from "next/head";

const modify = () => {
  return(
  <>
    <Head>
      <meta charSet="utf-8" />
      <title>PGI's Blog</title>
    </Head>
    <Editor types="write" />;
  </>
)};
export default modify;