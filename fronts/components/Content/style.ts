import { styled } from "styled-components";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export const ReactQuillstyle = styled(ReactQuill)`
  font-size: 1.6rem;
  > .ql-toolbar {
    display: none;
  }
  .ql-container.ql-snow {
    border: 0
  }
  .ql-editor{
    padding:0;
  }

`;
