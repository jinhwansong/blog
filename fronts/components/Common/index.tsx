import React from "react";
import { MainAside, LayOut, MainList, Pagination } from "components";
import { ICommon } from "types";
import * as St from "./style";



const Common = ({ post }: { post: ICommon[] }) => (
  <LayOut>
    <St.Main>
      <MainAside post={post} />
      <div>
        <St.Contener>
          <MainList location="list" post={post} />
        </St.Contener>
        <Pagination />
      </div>
    </St.Main>
  </LayOut>
);
export default Common;