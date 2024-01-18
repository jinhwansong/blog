import React from "react";
import { Header, Footer } from "components";
import * as St from "./style";

interface ILayOut {
  children: React.ReactNode;
}

const LayOut = ({children}: ILayOut)=>{
    return (
      <div>
        <Header />
        <St.Container>{children}</St.Container>
        <Footer/>
      </div>
    );
}

export default LayOut;