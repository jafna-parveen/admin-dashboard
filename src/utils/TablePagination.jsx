import React from "react";
import { TablePagination as MuiPagination } from "@mui/material";

export default function TablePagination({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange
}) {
  return (
    <MuiPagination
      component="div"
      count={count}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      rowsPerPageOptions={[5, 10, 20]}
    />
  );
}