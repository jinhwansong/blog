import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { categore, post, postDones } from "redux/reducers/post";
import { formats, toolbarOptions } from "hooks/useEditor";
import { Button, LayOut } from "components";
import { useInput } from "hooks";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import * as St from "./style";
import "react-quill/dist/quill.snow.css";


const Editor = () => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const [title, onTitle] = useInput("");
  const [content, setContent] = useState("");
  const [keyword, onKeyword, setKeyword] = useInput("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const changeKeywordInput = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      // e.nativeEvent.isComposing 한글일때 끊기지 말라고 쓰는거...
      if ((e.key === "Enter" || e.key === ",") && !e.nativeEvent.isComposing) {
        if (keywords.includes(keyword)) return alert("이미 추가된 키워드입니다.");
        const newKeyword = keyword.split(",")[0];
        setKeywords((prev) => [...prev, newKeyword]);
        setKeyword("");
      }
    },
    [keyword, keywords]
  );
   const { categore: name, postDone } = useSelector(
     (state: RootState) => state.post
   );
   useEffect(() => {
     dispatch(categore());
   }, []);
  // textArea 글자 수길이에 따른 높이조절
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const textArea = () => {
      if (textAreaRef.current !== null) {
        textAreaRef.current.style.height = "0";
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
      }
    };
    if (textAreaRef.current !== null)
      textAreaRef.current?.addEventListener("input", textArea);
    return () => {
      if (textAreaRef.current !== null)
        textAreaRef.current?.removeEventListener("input", textArea);
    };
  }, []);

  const cateforeRef = useRef<HTMLDivElement>(null);
  const [categoreOpen, setCategoreOpen] = useState({
    Boolean: false,
    categore: name[0]?.categore,
    id: name[0]?.id,
  });

  // 다른곳 클릭해도 클릭박스 닫는거
  useEffect(() => {
    const onCategore = (e: MouseEvent) => {
      if (
        cateforeRef.current &&
        !cateforeRef.current.contains(e.target as Node)
      )
        setCategoreOpen({ ...categoreOpen, Boolean: false });
    };
    document.addEventListener("mousedown", onCategore);
    return () => {
      document.removeEventListener("mousedown", onCategore);
    };
  }, [categoreOpen.Boolean]);
  console.log(postDone);
  // 다크모드시 추가 css
  const [theme, setTheme] = useState("");
  const currentTheme = localStorage.getItem("theme");
  useEffect(() => {
    setTheme(currentTheme === "light" ? "dark" : "light");
  }, [currentTheme]);
  useEffect(() => {
    if (postDone) {
      router.replace("/login");
      dispatch(postDones());
    }
  }, [postDone]);
  // 모듈
  const modules = useMemo(
    () => ({
      toolbar: {
        container: toolbarOptions,
        // handlers: { image: imageHandler },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );
  const onWrite = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      dispatch(
        post({ title: title, content: content, CategoreId: categoreOpen.id })
      );
    },
    [title, content, categoreOpen.id]
  );

  return (
    <LayOut>
      <St.Form onSubmit={onWrite}>
        <St.Categore ref={cateforeRef}>
          <button
            type="button"
            onClick={() =>
              setCategoreOpen({
                ...categoreOpen,
                Boolean: !categoreOpen.Boolean,
              })
            }
          >
            {categoreOpen.categore}
            {categoreOpen.Boolean ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
          {categoreOpen.Boolean && (
            <ul>
              {name.map((v) => (
                <li
                  key={v.id}
                  onClick={() =>
                    setCategoreOpen({
                      ...categore,
                      categore: v.categore,
                      Boolean: !categoreOpen.Boolean,
                      id: v.id,
                    })
                  }
                >
                  {v.categore}
                </li>
              ))}
            </ul>
          )}
        </St.Categore>
        <St.TitleInput
          value={title}
          onChange={onTitle}
          placeholder="제목을 입력하세요"
          ref={textAreaRef}
        />
        <St.Keyword>
          {keywords.map((v) => (
            <span key={v}>{v}</span>
          ))}
          <input
            type="text"
            placeholder="태그를 입력하세요 (엔터 또는 쉼표구분)"
            onChange={onKeyword}
            value={keyword}
            onKeyUp={changeKeywordInput}
          />
        </St.Keyword>
        <St.ReactQuillstyle
          modules={modules}
          theme="snow"
          placeholder="내용을 적어주세요"
          value={content}
          onChange={setContent}
          formats={formats}
          $color={theme === "dark"}
        />

        <St.ButtonWrap>
          <Button bg="f7f7f7" font="1.2" width="8" type="submit">
            취소
          </Button>
          <Button bg="blue" font="1.2" color="fff" width="8" type="submit">
            완료
          </Button>
        </St.ButtonWrap>
      </St.Form>
    </LayOut>
  );
};
export default Editor;

