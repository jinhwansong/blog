import React, { forwardRef, Ref, useCallback } from "react";
import * as St from './style';
import { useRouter } from "next/router";


const Tag = forwardRef((props, ref: Ref<HTMLUListElement>) => {
  const router = useRouter()
  const page= 1
  const onTagRouter = useCallback((tag:string)=>{
    router.push(`/tag/page=${page}tag=${tag}`)
  },[])
  return (
    <St.TagUl ref={ref}>
      <li onClick={() => onTagRouter("azzxc")}>azzxc</li>
      <li onClick={() => onTagRouter("azzxcddd")}>azzxcddd </li>
    </St.TagUl>
  );
});

export default Tag;