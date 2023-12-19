import { TaskDTO } from "@/dtos/compose-job.dto";
import { ColumnDef } from "@tanstack/react-table";

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
  },
];
