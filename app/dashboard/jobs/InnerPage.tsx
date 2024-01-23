"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { DataTable } from "@/components/ui/data-table";
import { useJobs } from "@/hooks/useJobs";
import { useUrgentTasks } from "@/hooks/useTasks";
import { Roles } from "@/types/account";
import { KanbanSquare, List } from "lucide-react";
import NewJobDialog from "./(components)/NewJobDialog";
import KanbanView from "./KanbanView";
import { TaskTableColumn } from "./TaskTableColumn";
import toast from "react-hot-toast";
import FilterForm from "./FilterForm";
import { Session } from "next-auth";

export default function Jobs({ session }: { session: Session }) {
  const { filter, setFilter, data: jobs = [], isLoading } = useJobs();

  return (
    <div className="h-screen w-full py-4 px-8 overflow-x-hidden">
      <Tabs defaultValue="kanban">
        <TabsList>
          <TabsTrigger
            value="kanban"
            className="w-64 flex flex-row gap-2 items-center"
          >
            <KanbanSquare className="w-6 h-6" />
            <span>Kanban</span>
          </TabsTrigger>
          <TabsTrigger
            disabled
            value="listview"
            className="cursor-not-allowed select-none w-64 flex flex-row gap-2 items-center"
            onClick={() =>
              toast("Coming soon!", {
                icon: "🚧",
              })
            }
          >
            <List className="w-5 h-5" />
            <span>List View</span>
          </TabsTrigger>
        </TabsList>

        <div className="w-full mt-6 flex flex-row gap-3 items-center justify-between">
          <FilterForm filter={filter} setFilter={setFilter} session={session} />
          <NewJobDialog />
        </div>

        <TabsContent value="kanban">
          <KanbanView filter={filter} jobs={jobs} isLoading={isLoading} />
          {session?.user?.role === Roles.CONTRACTOR && <TaskTable />}
        </TabsContent>
        {/* <TabsContent value="listview">Coming soon!</TabsContent> */}
      </Tabs>
    </div>
  );
}

const TaskTable = () => {
  const { data: tasks = [] } = useUrgentTasks();
  return (
    <div className="rounded-md space-y-3 my-4">
      <h3 className="text-lg font-semibold text-gray-700">Urgent Tasks</h3>
      <DataTable columns={TaskTableColumn} data={tasks} />
    </div>
  );
};
