import React from "react";
import { IProps } from "../utils/type";
import "./style.css";

const Filter = (prop: IProps) => {
  const firstValue = prop.table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(prop.column?.id as string);
  const columFilterValue = prop.column?.getFilterValue();
  console.log(firstValue);
  return typeof firstValue === "number" ? (
    <div className="container_input">
      <input
        type="number"
        className="input input_number"
        placeholder="Min"
        value={(columFilterValue as [number, number])?.[0] ?? ""}
        onChange={(e) =>
          prop.column?.setFilterValue((old: [number, number]) => [
            e.target.value, 
            old?.[1],
          ])
        }
      />
      <input
        type="number"
        className="input input_number"
        placeholder="Max"
        value={(columFilterValue as [number, number])?.[1] ?? ""}
        onChange={(e) =>
          prop.column?.setFilterValue((old: [number, number]) => [
            old?.[0],
            e.target.value,
          ])
        }
      />
    </div>
  ) : (
    <input
      className="input"
      placeholder="Search...."
      value={(columFilterValue ?? "") as string}
      onChange={(e) => prop.column?.setFilterValue(e.target.value)}
    />
  );
};

export default Filter;
