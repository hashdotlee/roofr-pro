import { TaskDTO } from "@/dtos/compose-job.dto";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const TaskTableColumn: ColumnDef<TaskDTO>[] = [
  {
    id: "title",
    header: "Title",
    accessorKey: "title",
  },
  {
    id: "creator",
    header: "Creator",
    accessorKey: "creator",
    cell: (cell) => {
      const value = cell.getValue() as TaskDTO["assignee"];
      if (!value) return null;
      return (
        <span>
          {value?.firstName} {value?.lastName}
        </span>
      );
    },
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
        <span>
          {value?.firstName} {value?.lastName}
        </span>
      );
    },
  },
  {
    id: "dueDate",
    header: "Due Date",
    accessorKey: "dueDate",
    cell: (cell) => {
      const value = cell.getValue() as TaskDTO["dueDate"];
      if (!value) return null;
      return <span>{format(new Date(value), "PPP")}</span>;
    },
  },
];
