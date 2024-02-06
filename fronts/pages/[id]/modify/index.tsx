import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { postDetail } from "redux/reducers/post";
const Editor = dynamic(() => import("../../../components/Editor"), { ssr: false });

const modify = () => {
     const dispatch = useDispatch<AppDispatch>();
     const router = useRouter();
     const { postDetailDone } = useSelector((state: RootState) => state.post);
     useEffect(() => {
       dispatch(postDetail(Number(router.query.id)));
     }, []);
     console.log(postDetailDone);
  return <>{typeof window !== "undefined" && <Editor />}</>;
};
export default modify;