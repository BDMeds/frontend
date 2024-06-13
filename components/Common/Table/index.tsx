"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { TiCancelOutline } from "react-icons/ti";
import { motion } from "framer-motion";
import { opacityVariant, parentVariant } from "@/lib/utils/variants";
import Loader from "../Loaders";
import { CgArrowLeft, CgArrowRight } from "react-icons/cg";

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
}

export default function TableComponent<TData, TValue>({ data, columns, isLoading }: TableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [filter, setFilter] = useState("");

  const filterFunc = (value: string) => setFilter(value);

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    enableGlobalFilter: true,
    // defaultColumn: {
    //   minSize: 0,
    //   size: Number.MAX_SAFE_INTEGER,
    //   maxSize: Number.MAX_SAFE_INTEGER,
    // },
  });

  return (
    <div className="w-full pb-2 overflow-x-auto show_scroll">
      <table className="w-full">
        <thead className={`w-full bg-gray-300 backdrop-blur-md rounded flex font-light`}>
          {table.getHeaderGroups()?.map((headerGroup) => (
            <tr className="flex w-full " key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    className="flex items-center justify-center p-4 w-[100%]"
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}
                  >
                    <span className="flex-shrink-0">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </span>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="w-full">
          {isLoading ? (
            <div className={"flex items-center justify-center text-center py-5"}>
              <div className={"space-y-4"}>
                <div className={"grid place-content-center"}>
                  <Loader />
                </div>
                <p className={"dark:text-zinc-400"}>Loading...</p>
              </div>
            </div>
          ) : (
            <>
              {data && data.length > 0 ? (
                <motion.div
                  variants={parentVariant}
                  initial="initial"
                  animate="animate"
                  className="divide-y divide-primary-base/10"
                >
                  {table.getRowModel().rows.map((row) => {
                    return (
                      <motion.tr
                        className={`flex transition-colors group duration-200 dark:hover:bg-zinc-800/60 hover:bg-zinc-gray-200 group`}
                        key={row.id}
                        variants={opacityVariant}
                      >
                        {row.getVisibleCells().map((cell) => {
                          return (
                            <td
                              className={`p-4 text-small flex items-center justify-center dark:text-gray-200 w-[100%]`}
                              key={cell.id}
                              style={{ width: cell.column.getSize() !== 150 ? cell.column.getSize() : undefined }}
                            >
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                          );
                        })}
                      </motion.tr>
                    );
                  })}
                </motion.div>
              ) : (
                <div className={"text-center py-10 flex items-center justify-center"}>
                  <div className={"space-y-4 dark:text-zinc-400"}>
                    <div className={"grid place-content-center"}>
                      <TiCancelOutline size={50} />
                    </div>
                    <p>No orders found.</p>
                  </div>
                </div>
              )}
            </>
          )}
        </tbody>
      </table>
      {data && data.length > 0 && (
        <div className="flex my-4 items-center justify-center gap-4">
          <button
            className="size-8 text-primary rounded-full flex items-center justify-center border border-primary/20 disabled:opacity-20 duration-200 hover:bg-primary hover:text-black"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <CgArrowLeft />
          </button>
          <button
            className="size-8 text-primary rounded-full flex items-center justify-center border border-primary/20 disabled:opacity-20 duration-200 hover:bg-primary hover:text-black"
            onClick={() => (table.nextPage(), console.log(table.getCanNextPage()))}
            disabled={!table.getCanNextPage()}
          >
            <CgArrowRight />
          </button>
        </div>
      )}
    </div>
  );
}