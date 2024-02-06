import React from "react";
import * as St from "./style"


interface IContent {
  content: string ;
}

const Content = ({ content }: IContent) => (
  <St.ReactQuillstyle readOnly value={content} theme="snow" />
);

export default Content;
