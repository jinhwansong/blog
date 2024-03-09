import React from "react";
import { Header, Footer } from "components";
import * as St from "./style";

interface ILayOut {
  children: React.ReactNode;
}

const LayOut = ({ children }: ILayOut) => (
  <>
    <Header />
    <St.Container>{children}</St.Container>
    <Footer />
  </>
);

export default LayOut;
