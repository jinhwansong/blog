import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";
import { hashtags } from "redux/reducers/post";
import * as St from "./style";




interface ITag {
  tag: string[] | undefined;
}


const tag = ({ tag }: ITag) => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const onTag = useCallback(
    (e:React.MouseEvent<HTMLLIElement>,hashtag: string) => {
      e.stopPropagation();
      dispatch(hashtags({ hashtag ,page:1}));
      router.push(`/hashtag/${hashtag}`);
    },
    [router]
  );
  return (
    <St.TagUl>
      {tag?.map((tag,i) => (
        <li onClick={(e) => onTag(e,tag)} key={i}>{tag}</li>
      ))}
    </St.TagUl>
  );
};

export default tag;
