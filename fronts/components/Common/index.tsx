import React from "react";
import { MainAside, LayOut, MainList, Pagination } from "components";
import * as St from "./style";


const Common = ()=>{
    return (
      <LayOut>
        <St.Main>
          <MainAside />
          <div>
            <St.Contener>
              <MainList location="list" />

            </St.Contener>
            <Pagination />
          </div>
        </St.Main>
      </LayOut>
    );
}
export default Common;