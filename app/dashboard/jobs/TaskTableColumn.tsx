import { TaskDTO } from "@/dtos/compose-job.dto";
import { getTimeAgo } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export const TaskTableColumn: ColumnDef<TaskDTO>[] = [
  {
    id: "title",
    header: "Title",
    accessorKey: "title",
    cell: (cell: any) => {
      return <span className="line-clamp-1 font-semibold">{cell.getValue()}</span>;
    },
    maxSize: 100,
    size: 100,
  },
  {
    id: "address",
    header: "Address",
    accessorKey: "job.address",
    cell: (cell: any) => {
      return <span className="line-clamp-1">{cell.getValue()}</span>;
    },
    maxSize: 100,
    size: 60,
  },
  {
    id: "creator",
    header: "Creator",
    accessorKey: "creator",
    cell: (cell) => {
      const value = cell.getValue() as TaskDTO["assignee"];
      if (!value) return null;
      return (
        <span className="line-clamp-1">
          {value?.firstName} {value?.lastName}
        </span>
      );
    },
    maxSize: 100,
    size: 60,
  },
  {
    id: "description",
    header: "Description",
    accessorKey: "description",
    cell: (cell: any) => {
      return <span className="line-clamp-1">{cell.getValue()}</span>;
    },
  },
  {
    id: "assignee",
    header: "Assignee",
    accessorKey: "assignee",
    cell: (cell) => {
      const value = cell.getValue() as TaskDTO["assignee"];
      if (!value) return null;
      return (
        <span className="line-clamp-1">
          {value?.firstName} {value?.lastName}
        </span>
      );
    },
    maxSize: 100,
    size: 60,
  },
  {
    id: "dueDate",
    header: "Due Date",
    accessorKey: "dueDate",
    cell: (cell) => {
      const value = cell.getValue() as TaskDTO["dueDate"];
      if (!value)
        return <span className="text-neutral-400 font-semibold">No due date</span>;
      return (
        <span
          className={`
          font-semibold
      line-clamp-1 
      ${
        new Date(value).getTime() < new Date().getTime() + 24 * 60 * 3600
          ? "text-red-500"
          : ""
      }
      `}
        >
          {getTimeAgo(String(value))}
        </span>
      );
    },
    maxSize: 100,
    size: 60,
  },
];
