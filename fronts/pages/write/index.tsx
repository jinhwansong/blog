import React from "react";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("../../components/Editor"), { ssr: false });

const modify = () => {
  return <>{typeof window !== "undefined" && <Editor />}</>;
};
export default modify;