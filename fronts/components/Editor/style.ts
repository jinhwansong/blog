import styled from 'styled-components';

export const Form = styled.form<{ $color: boolean }>`
  width: 80rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  > .quill {
    font-size: 1.6rem;
  }

  > .quill .ql-toolbar.ql-snow,
  > .quill .ql-container.ql-snow {
    border-left: 0;
    border-right: 0;
    padding: 1.5rem 0;
  }
  > .quill .ql-editor {
    padding: 1.5rem 1rem;
    height: 50rem;
  }
  > .quill .ql-snow .ql-picker-options {
    background: ${(props: any) => (props.$color ? '#16181B' : '#fff')};
  }
  > .quill .ql-snow .ql-picker {
    color: ${(props: any) => (props.$color ? '#fff' : '#222')};
  }
  > .quill .ql-snow .ql-stroke {
    stroke: ${(props: any) => (props.$color ? '#fff' : '#222')};
  }
  > .quill .ql-snow .ql-fill,
  > .quill .ql-snow .ql-stroke.ql-fill {
    fill: ${(props: any) => (props.$color ? '#fff' : '#222')};
  }
  > .quill .ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options,
  > .quill .ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label {
    border: 1px solid ${(props: any) => (props.$color ? '#36393D' : '#ddd')};
  }
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
  background:none;
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
`

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
`


export const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  gap:1rem;
`