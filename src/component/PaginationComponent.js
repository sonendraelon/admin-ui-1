import React from "react";
import { Pagination } from "@mui/material";

const PaginationComponent = ({
  userDataPerPage,
  totalUserData,
  handlePaginationClick,
}) => {
  const pageNumbers = Math.ceil(totalUserData / userDataPerPage);

  return (
    <Pagination
      count={pageNumbers}
      onChange={handlePaginationClick}
    />
  );
};

export default PaginationComponent;
