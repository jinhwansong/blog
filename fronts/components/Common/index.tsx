import React from "react";
import { MainAside, LayOut, MainList, Pagination } from "components";
import { ICommones } from "types";
import * as St from "./style";

const Common = ({
  posts,
  currentPage,
  count,
  onPrevPage,
  onNextPage,
  onPage,
}: ICommones) => (
  <LayOut>
    <St.Main>
      <MainAside />
      <div>
        <St.Contener>
          <MainList loc="list" post={posts} />
        </St.Contener>
        <Pagination
          count={count}
          onPrevPage={onPrevPage}
          onNextPage={onNextPage}
          onPage={onPage}
          currentPage={currentPage}
        />
      </div>
    </St.Main>
  </LayOut>
);

export default Common;
