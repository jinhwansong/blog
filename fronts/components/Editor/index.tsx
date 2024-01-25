import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button, LayOut } from "components";
import { useInput } from "hooks";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import * as St from "./style";
import "react-quill/dist/quill.snow.css";
import { formats, toolbarOptions } from "hooks/useEditor";

const Editor = () => {
  const [title, onTitle] = useInput("");
  const [content, setContent] = useState("");
  const [keyword, onKeyword, setKeyword] = useInput("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const changeKeywordInput = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      // e.nativeEvent.isComposing 한글일때 끊기지 말라고 쓰는거...
      if ((e.key === "Enter" || e.key === ",") && !e.nativeEvent.isComposing) {
        if (keyword.trim() === "") return;
        if (keywords.includes(keyword)) return alert("이미 추가된 키워드임");
        const newKeyword = keyword.split(",")[0];
        setKeywords((prev) => [...prev, newKeyword]);
        setKeyword("");
      }
    },
    [keyword, keywords]
  );
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

  const Categores = ["카테고리 없음", "진진", "진진s"];
  const cateforeRef = useRef<HTMLDivElement>(null);
  const [categore, setCatefore] = useState({
    Boolean: false,
    categore: Categores[0],
  });
  const onCategores = useCallback(
    (v: string) => {
      setCatefore({ ...categore, categore: v, Boolean: false });
    },
    [categore]
  );
  useEffect(() => {
    const onCategore = (e: MouseEvent) => {
      if (
        cateforeRef.current &&
        !cateforeRef.current.contains(e.target as Node)
      )
        setCatefore({ ...categore, Boolean: false });
    };
    document.addEventListener("mousedown", onCategore);
    return () => {
      document.removeEventListener("mousedown", onCategore);
    };
  }, [categore.Boolean]);


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
  const [theme, setTheme] = useState("");
  const currentTheme = localStorage.getItem("theme");
  useEffect(() => {
    setTheme(currentTheme === "light" ? "dark" : "light");
  }, [currentTheme]);
  
  return (
    <LayOut>
      <St.Write>
        <St.Categore ref={cateforeRef}>
          <button
            onClick={() =>
              setCatefore({ ...categore, Boolean: !categore.Boolean })
            }
          >
            {categore.categore}
            {categore.Boolean ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
          {categore.Boolean && (
            <ul>
              {Categores.map((v) => (
                <li key={v} onClick={() => onCategores(v)}>
                  {v}
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
          <Button bg="f7f7f7" font="1.2" width="8">
            취소
          </Button>
          <Button bg="blue" font="1.2" color="fff" width="8">
            완료
          </Button>
        </St.ButtonWrap>
      </St.Write>
    </LayOut>
  );
};
export default Editor;

