import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useMemo, useState } from "react";
import Filter from "./Filter/index.tsx";
import PaginationCustom from "./Pagination/index.tsx";
import "./style.css";
import { generateUsers } from "./utils/__mockup.ts";
import { User } from "./utils/type.ts";

const UserTable = () => {
  //data
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    setUsers(generateUsers(20));
  }, []);

  //columns
  // const columns = useMemo<ColumnDef<User>[]>(
  //   () => [
  //     {
  //       header: "Name",
  //       footer: (props) => props.column.id,
  //       columns: [
  //         {
  //           accessorKey: "firstName",
  //           cell: (info) => info.getValue(),
  //           footer: (props) => props.column.id,
  //         },
  //         {
  //           accessorFn: (row) => row.lastName,
  //           id: "lastName",
  //           cell: (info) => info.getValue(),
  //           header: () => <>lastName</>,
  //           footer: (props) => props.column.id,
  //         },
  //       ],
  //     },
  //   ],
  //   []
  // );
  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        header: "Name",
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: "firstName",
            cell: (props_cell) => props_cell.getValue(),
            footer: (props_footer) => props_footer.column.id,
          },
          {
            accessorKey: "lastName",
            cell: (props_cell) => props_cell.getValue(),
            footer: (props_footer) => props_footer.column.id,
          },
        ],
      },
      {
        header: "Info",
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: "age",
            header: "age",
            footer: (props) => props.column.id,
          },
          {
            header: "more info",
            columns: [
              {
                accessorKey: "visits",
                header: "visits",
                footer: (props) => props.column.id,
              },
              {
                accessorKey: "status",
                header: "status",
                footer: (props) => props.column.id,
              },
              {
                accessorKey: "progress",
                header: "progress",
                footer: (props) => props.column.id,
              },
            ],
          },
        ],
      },
    ],
    []
  );

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            {table.getHeaderGroups().map((headerGroups) => (
              <TableRow key={headerGroups.id}>
                {headerGroups.headers.map((header) => {
                  return (
                    <TableCell key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanFilter() ? (
                            <div>
                              <Filter column={header.column} table={table} />
                            </div>
                          ) : null}
                        </div>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table?.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationCustom table={table}  data={users}/>
    </Paper>
  );
};

export default UserTable;
