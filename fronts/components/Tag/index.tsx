import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";
import { hashtags } from "redux/reducers/post";
import TagUl from "./style";

interface ITag {
  tag: string[];
}

const Tag = ({ tag }: ITag) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const onTag = useCallback((e: React.MouseEvent<HTMLLIElement>, hashtag: string) => {
    e.stopPropagation();
    dispatch(hashtags({ hashtag, page: 1 }));
    router.push(`/hashtag/${hashtag}`);
  }, [dispatch, router]);

  return (
    <TagUl>
      {tag?.map((tag: string) => (
        <li onClick={(e) => onTag(e, tag)} key={tag} role="presentation">
          {tag}
        </li>
      ))}
    </TagUl>
  );
};

export default Tag;
