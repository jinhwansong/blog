import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import styled from "styled-components";

export const Form = styled.form`
  width: 80rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const TitleInput = styled.textarea`
  border: none;
  font-size: 3rem;
  resize: none;
  outline: 0 none;
  line-height: 4rem;
  overflow: hidden;
  display: block;
  width: 100%;
  height: 4.7rem;
  color: ${(props: any) => props.theme.black};
  background: ${(props: any) => props.theme.white};
`;
export const Keyword = styled.div`
  border-top: 1px solid ${(props: any) => props.theme.ddd};
  padding-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  > span {
    background: ${(props: any) => props.theme.blues};
    padding: 6px 8px;
    font-size: 1.4rem;
    color: ${(props: any) => props.theme.fff};
    border-radius: 10rem;
  }
  > input {
    border: 0;
    font-size: 1.6rem;
    outline: 0;
    width: 30rem;
    background: none;
  }
`;
export const Categore = styled.div`
  position: relative;
  width: 17rem;

  > button {
    width: 100%;
    padding: 1rem;
    border: 1px solid ${(props: any) => props.theme.ddd};
    color: ${(props: any) => props.theme.gery};
    background: ${(props: any) => props.theme.white};
    font-size: 1.4rem;
    text-align: left;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  > button svg {
    font-size: 1.5rem;
  }
  > ul {
    position: absolute;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    font-size: 1.4rem;
    gap: 1rem;
    border: 1px solid ${(props: any) => props.theme.ddd};
    background: ${(props: any) => props.theme.white};
    width: 100%;
    top: 45px;
  }
  > ul li:hover {
    color: ${(props: any) => props.theme.blue};
    cursor: pointer;
  }
`;


export const ReactQuillstyle = styled(ReactQuill)<{ $color: boolean }>`
  font-size: 1.6rem;

  > .ql-toolbar.ql-snow,
  .ql-container.ql-snow {
    border: 1px solid ${(props: any) => (props.$color ? "#36393D" : "#ddd")};
    border-left: 0;
    border-right: 0;
    padding: 1.5rem 0;
  }
  .ql-editor {
    padding: 1.5rem 1rem;
    height: 50rem;
  }
  .ql-snow .ql-picker-options {
    background: ${(props: any) => (props.$color ? "#16181B" : "#fff")};
  }
  .ql-snow .ql-picker {
    color: ${(props: any) => (props.$color ? "#fff" : "#222")};
  }
  .ql-snow .ql-stroke {
    stroke: ${(props: any) => (props.$color ? "#fff" : "#222")};
  }
  .ql-snow .ql-fill,
  .ql-snow .ql-stroke.ql-fill {
    fill: ${(props: any) => (props.$color ? "#fff" : "#222")};
  }
  .ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options,
  .ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label {
    border: 1px solid ${(props: any) => (props.$color ? "#36393D" : "#ddd")};
  }
`;

export const ButtonWrap= styled.div`
display: flex;
justify-content: flex-end;
gap:1rem;
`