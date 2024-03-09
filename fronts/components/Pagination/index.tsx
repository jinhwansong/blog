import React from "react";
import { Button } from "components";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import * as St from "./style";

interface IPagination {
  count: number;
  currentPage: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  onPage: (page: number) => void;
}

const Pagination = ({
  currentPage,
  count,
  onPrevPage,
  onNextPage,
  onPage,
}: IPagination) => (
  <St.Pagination>
    <Button
      themes="arr"
      image={<MdKeyboardArrowLeft />}
      onButton={() => onPrevPage()}
      disabled={currentPage === 1}
      width="4"
      font="1.2"
      bg="f7f7f7"
      hoverbg="blue"
      hovercolor="fff"
      type="button"
    />

    {Array.from({ length: count }, (_, index) => (
      <Button
        onButton={() => onPage(index + 1)}
        disabled={currentPage === index + 1}
        width="4"
        bg={currentPage === index + 1 ? "blue" : "f7f7f7"}
        font="1.2"
        color={currentPage === index + 1 ? "fff" : ""}
        hoverbg="blue"
        hovercolor="fff"
        key={index}
        type="button"
      >
        {index + 1}
      </Button>
    ))}
    <Button
      themes="arr"
      image={<MdKeyboardArrowRight />}
      onButton={() => onNextPage()}
      disabled={currentPage === count}
      width="4"
      font="1.2"
      bg="f7f7f7"
      hoverbg="blue"
      hovercolor="fff"
      type="button"
    />
  </St.Pagination>
);

export default Pagination;
