import React, { useCallback } from "react";
import * as St from "./style";


const tag = () => {
  const onTagRouter = useCallback((tag: string) => {
    // router.push(`/tag/page=${page}tag=${tag}`);
  }, []);
  return (
    <St.TagUl>
      <li onClick={() => onTagRouter("azzxc")}>azzxc</li>
      <li onClick={() => onTagRouter("azzxcddd")}>azzxcddd </li>
    </St.TagUl>
  );
};

export default tag;
