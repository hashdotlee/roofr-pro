"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaListUl } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { LuKanbanSquare } from "react-icons/lu";

import CustomSelect from "@/components/custom/Select";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { JobStatus } from "@/types/job";
import { useForm } from "react-hook-form";
import KanbanView from "./KanbanView";
import NewJobDialog from "./_components/NewJobDialog";
import { infer, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useJobs } from "@/hooks/useJobs";
import CustomInput from "@/components/custom/Input";

export default function Jobs() {
  return (
    <div className="h-screen w-full py-4 px-8 overflow-x-hidden">
      <Tabs defaultValue="kanban">
        <TabsList>
          <TabsTrigger
            value="kanban"
            className="w-64 flex flex-row gap-2 items-center"
          >
            <LuKanbanSquare className="w-6 h-6" />
            <span>Kanban</span>
          </TabsTrigger>
          <TabsTrigger
            value="listview"
            className="w-64 flex flex-row gap-2 items-center"
          >
            <FaListUl className="w-5 h-5" />
            <span>List View</span>
          </TabsTrigger>
        </TabsList>

        <Action />

        <TabsContent value="kanban">
          <KanbanView />
        </TabsContent>
        <TabsContent value="listview">Coming soon!</TabsContent>
      </Tabs>
    </div>
  );
}

const formSchema = z.object({
  updated: z.string(),
  stage: z.string(),
  sortBy: z.string(),
});

function Action() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });
  const { filter, setFilter } = useJobs();
  const onSubmit = (data: any) => {
    setFilter({
      ...filter,
      ...data,
    });
  };
  return (
    <div className="w-full mt-6 flex flex-row gap-3 items-center justify-between">
      <Form {...form}>
        <form
          onChange={form.handleSubmit(onSubmit)}
          className="flex gap-3 flex-row items-center justify-start"
        >
          <Label className="relative block shrink-0">
            <div className="absolute top-3 ps-4 text-gray-500 text-lg">
              <IoIosSearch />
            </div>
            <CustomInput
              name="search"
              placeholder="Search jobs"
              control={form.control}
              inputClassName="ps-12"
            />
          </Label>

          <div>
            <CustomSelect
              name="updated"
              control={form.control}
              selectClassName="border-0 gap-2 text-sm font-semibold text-blue-500"
              options={[
                { label: "Today", value: "today" },
                { label: "Yesterday", value: "yesterday" },
                { label: "Last 7 days", value: "last-7-days" },
                { label: "Last 30 days", value: "last-30-days" },
                { label: "Last 90 days", value: "last-90-days" },
                { label: "Last year", value: "last-year" },
                { label: "Older", value: "older" },
              ]}
              placeholder="Updated"
            />
          </div>
          <div>
            <CustomSelect
              name="stage"
              control={form.control}
              selectClassName="border-0 gap-2 text-sm font-semibold text-blue-500"
              options={Object.values(JobStatus).map((status) => ({
                label: status,
                value: status,
              }))}
              placeholder="Stage"
            />
          </div>
          <div>
            <CustomSelect
              name="sortBy"
              control={form.control}
              selectClassName="border-0 gap-2 text-sm font-semibold text-blue-500"
              options={[
                { label: "Last updated", value: "last-updated" },
                { label: "Job value", value: "job-value" },
              ]}
              placeholder="Sort by"
            />
          </div>
        </form>
      </Form>
      <NewJobDialog />
    </div>
  );
}
