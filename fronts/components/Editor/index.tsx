import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import ReactQuill from "react-quill";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
  categore,
  imageUpload,
  post,
  postDones,
  postModify,
  postModifys,
} from "redux/reducers/post";
import { Button, LayOut, QuillSSR } from "components";
import { formats, toolbarOptions } from "hooks/useEditor";
import { useInput } from "hooks";
import { Categore } from "types";
import * as St from "./style";

interface IEditor {
  titleModify?: string;
  contentModify?: string;
  idModify?: number;
  nameModify?: string;
  types: string;
}

const Editor = ({
  titleModify,
  contentModify,
  idModify,
  nameModify,
  types,
}: IEditor) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [title, onTitle] = useInput(titleModify ?? "");
  const [content, setContent] = useState(contentModify ?? "");
  const [keyword, onKeyword, setKeyword] = useInput("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const changeKeywordInput = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if ((e.key === "Enter" || e.key === ",") && !e.nativeEvent.isComposing) {
        e.preventDefault();
        if (keywords.includes(keyword))
          return alert("이미 추가된 키워드입니다.");
        const newKeyword = keyword.split(",")[0];
        setKeywords((prev) => [...prev, newKeyword]);
        setKeyword("");
      }
    },
    [keyword, keywords]
  );
  const {
    categore: name,
    postDone,
    postModifyDone,
    imagePaths,
  } = useSelector((state: RootState) => state.post);
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
    categore: nameModify ?? name[0]?.categore,
    id: idModify ?? name[0]?.id,
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
  // 다크모드시 추가 css
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    setTheme(currentTheme === "light" ? "dark" : "light");
  });

  useEffect(() => {
    // 게시물 보낼때
    if (postDone) {
      router.replace("/");
      dispatch(postModifys());
    }
    // 게시물 수정할때
    if (postModifyDone) {
      router.replace(`/${router.query.id}`);
      dispatch(postDones());
    }
  }, [postDone, postModifyDone]);

  // quill에 접근하기 위한거
  const quillRef = useRef<ReactQuill>(null);
  // 이미지용
  const imageHandler = useCallback(() => {
    // 인풋을 만들어 준다.
    const input = document.createElement("input");
    const imageformData = new FormData();
    // input의 타입을 file로 설정
    input.setAttribute("type", "file");
    // 모든 이미지 파일 허용
    input.setAttribute("accept", "image/*");
    // 여러개 이미지 선택가능
    input.setAttribute("multiple", "multiple");
    // 파일선택창 표시
    input.click();
    input.onchange = async () => {
      const file = input.files;
      [].forEach.call(file, (f) => {
        imageformData.append("image", f);
      });
      await dispatch(imageUpload(imageformData));
    };
  }, []);
  useEffect(() => {
    // 에디터 객체 가져오기
    const editor = quillRef.current?.getEditor();
    // 현재 에디터 커서 위치값 가져오기
    const range = quillRef.current?.selection?.index;
    imagePaths.forEach((path: string, index: number) => {
      const imgUrl = `<span class="math-inline">\{process\.env\.NEXT\_PUBLIC\_SERVER\_URL\}/</span>{path}`;
      editor?.insertEmbed((range as number) + index, "image", imgUrl);
    });
  }, [imagePaths]);
  // 모듈
  const modules = useMemo(
    () => ({
      toolbar: {
        container: toolbarOptions,
        handlers: { image: imageHandler },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );
  // 작성
  const onWrite = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!title || !title.trim()) return alert("제목을 적어주세요");
      if (!content || !content.trim()) return alert("내용을 적어주세요");

      if (types === "modify") {
        dispatch(
          postModify({
            title: title,
            content: content,
            CategoreId: categoreOpen.id,
            id: Number(router.query.id),
            keywords: keywords,
            image: imagePaths,
          })
        );
      }
      if (types === "write") {
        dispatch(
          post({
            title: title,
            content: content,
            CategoreId: categoreOpen.id,
            keywords: keywords,
            image: imagePaths,
          })
        );
      }
    },
    [title, content, categoreOpen.id, imagePaths]
  );
  // 취소
  const onExit = useCallback(() => {
    if (types === "modify") return router.replace(`/${router.query.id}`);
    if (types === "write") return router.replace("/");
  }, []);
  return (
    <LayOut>
      <St.Form
        onSubmit={onWrite}
        encType="multipart/form-data"
        $color={theme === "dark"}
      >
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
              {name.map((v: Categore) => (
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
                  전체 코드 (계속) JavaScript
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
            onKeyDown={changeKeywordInput}
          />
        </St.Keyword>
        <QuillSSR
          modules={modules}
          theme="snow"
          placeholder="내용을 적어주세요"
          value={content}
          onChange={setContent}
          formats={formats}
          forwardedRef={quillRef}
        />
        <St.ButtonWrap>
          <Button
            bg="f7f7f7"
            font="1.2"
            width="8"
            type="button"
            onButton={onExit}
          >
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
