import { TablePagination } from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import React from "react";
import { IProps } from "../utils/type";

const PaginationCustom = (prop: IProps) => {
  const { pageSize, pageIndex } = prop.table.getState().pagination;

  return (
    <div>
      <TablePagination
        rowsPerPageOptions={[
          5,
          10,
          25,
        ]}
        component="div"
        count={prop.table.getFilteredRowModel().rows.length}
        rowsPerPage={pageSize}
        page={pageIndex}
        slotProps={{
          select: {
            inputProps: { "aria-label": "rows per page" },
            native: true,
          },
        }}
        onPageChange={(_, page) => {
          prop.table.setPageIndex(page);
        }}
        onRowsPerPageChange={(e) => {
          const size = e.target.value ? Number(e.target.value) : 10;
          prop.table.setPageSize(size);
        }}
        ActionsComponent={TablePaginationActions}
      />
    </div>
  );
};

export default PaginationCustom;
