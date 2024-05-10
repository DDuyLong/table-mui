import { Column, Table as ReactTable } from "@tanstack/react-table";

export interface User {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: 'relationship' | 'complicated' | 'single';
}

export interface IProps {
  column?: Column<any, any>,
  table: ReactTable<any>
  data? : User[]
}
