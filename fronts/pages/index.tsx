
import React, { useEffect } from "react";
import { Common } from "components";
import { useDispatch } from "react-redux";
import { posts } from "redux/reducers/post";
import { AppDispatch, RootState } from "redux/store";
import { useSelector } from "react-redux";

const Home = () => {
  const { postsDone :post} = useSelector((state:RootState)=>state.post);
  const dispatch = useDispatch<AppDispatch>()
  useEffect(()=>{
    dispatch(posts());
  },[])
  return <Common post={post} />;
};
export default Home;
