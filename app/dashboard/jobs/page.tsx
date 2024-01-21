"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaListUl } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { LuKanbanSquare } from "react-icons/lu";

import CustomInput from "@/components/custom/Input";
import CustomSelect from "@/components/custom/Select";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SortBy, initFilter, useJobs } from "@/hooks/useJobs";
import { useUrgentTasks } from "@/hooks/useTasks";
import { cn } from "@/lib/utils";
import { Roles } from "@/types/account";
import { JobStage } from "@/types/job";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronDownIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
import { z } from "zod";
import NewJobDialog from "./(components)/NewJobDialog";
import KanbanView from "./KanbanView";
import { TaskTableColumn } from "./TaskTableColumn";
import { Button } from "@/components/ui/button";

export default function Jobs() {
  const { data: session } = useSession();
  const { filter, setFilter, data: jobs = [] } = useJobs();

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

        <Action filter={filter} setFilter={setFilter} />

        <TabsContent value="kanban">
          <KanbanView filter={filter} jobs={jobs} />
          {session?.user?.role === Roles.CONTRACTOR && <TaskTable />}
        </TabsContent>
        <TabsContent value="listview">Coming soon!</TabsContent>
      </Tabs>
    </div>
  );
}

const formSchema = z.object({
  updatedAt: z.string().optional(),
  stage: z.string().array(),
  sortBy: z.nativeEnum(SortBy).optional(),
  search: z.string().optional(),
  assignee: z.string(),
});

function Action({ filter, setFilter }: { filter: any; setFilter: any }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initFilter,
  });
  const onSubmit = useDebouncedCallback(() => {
    const newData = form.getValues();
    const { updatedAt, search } = newData;
    if (search) {
      newData.search = search.toLowerCase().replace(/\\/g, "");
    }
    if (updatedAt) {
      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      switch (updatedAt) {
        case "today":
          newData.updatedAt = new Date().toISOString();
          break;
        case "yesterday":
          newData.updatedAt = new Date(Date.now() - oneDay).toISOString();
          break;
        case "last-7-days":
          newData.updatedAt = new Date(Date.now() - oneDay * 7).toISOString();
          break;
        case "last-30-days":
          newData.updatedAt = new Date(Date.now() - oneDay * 30).toISOString();
          break;
        case "last-90-days":
          newData.updatedAt = new Date(Date.now() - oneDay * 90).toISOString();
          break;
        case "last-year":
          newData.updatedAt = new Date(Date.now() - oneDay * 365).toISOString();
          break;
        case "older":
          newData.updatedAt = new Date("1970-01-01").toISOString();
          break;
      }
    }
    setFilter({
      ...filter,
      ...newData,
    });
  }, 500);
  return (
    <div className="w-full mt-6 flex flex-row gap-3 items-center justify-between">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onChange={form.handleSubmit(onSubmit)}
          className="flex gap-4 flex-row items-center justify-start"
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
              name="updatedAt"
              control={form.control}
              selectClassName="border-0 gap-2 text-sm font-semibold text-blue-500 hover:text-blue-700"
              options={[
                { label: "Today", value: "today" },
                { label: "Yesterday", value: "yesterday" },
                { label: "Last 7 days", value: "last-7-days" },
                { label: "Last 30 days", value: "last-30-days" },
                { label: "Last 90 days", value: "last-90-days" },
                { label: "Last year", value: "last-year" },
                { label: "Older", value: "older" },
              ]}
              placeholder="Updated At"
            />
          </div>
          <div>
            <FormField
              name="stage"
              control={form.control}
              render={() => (
                <FormItem>
                  <Popover>
                    <PopoverTrigger className="flex items-center border-0 hover:bg-transparent hover:text-blue-700 gap-2 text-sm font-semibold text-blue-500">
                      <span>Stages</span>
                      <ChevronDownIcon className="w-4 h-4" />
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="flex flex-col gap-4">
                        {Object.values(JobStage).map((stage, i) => (
                          <FormField
                            key={stage}
                            name="stage"
                            control={form.control}
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start gap-2 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    key={stage}
                                    id={`stage-${i}`}
                                    checked={field.value?.includes(stage)}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        field.onChange([...field.value, stage]);
                                      } else {
                                        field.onChange(
                                          field.value?.filter(
                                            (item: any) => item !== stage,
                                          ),
                                        );
                                      }
                                    }}
                                    value={stage}
                                  />
                                </FormControl>
                                <Label
                                  htmlFor={`stage-${i}`}
                                  className="m-0 cursor-pointer hover:text-neutral-700"
                                >
                                  {stage}
                                </Label>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
          </div>
          <div>
            <CustomSelect
              name="sortBy"
              control={form.control}
              selectClassName="border-0 gap-2 text-sm font-semibold text-blue-500 hover:text-blue-700"
              options={[
                { label: "Last updated", value: SortBy.LAST_UPDATED },
                { label: "Job value", value: SortBy.JOB_VALUE },
              ]}
              placeholder="Sort by"
            />
          </div>
          <div>
            <FormField
              name="assignee"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Popover>
                    <PopoverTrigger className="flex items-center border-0 hover:bg-transparent hover:text-blue-700 gap-2 text-sm font-semibold text-blue-500">
                      <span>Assignee</span>
                      <ChevronDownIcon className="w-4 h-4" />
                    </PopoverTrigger>
                    <PopoverContent className="p-2">
                      <div>
                        <Input
                          placeholder={"Search"}
                          className="border-0 border-b focus-visible:ring-0 rounded-none"
                          value={form.getValues("assignee")}
                          onChange={(e) => {
                            form.setValue("assignee", e.target.value);
                          }}
                        />
                        <div>
                          {[{ label: "John Doe", value: "John Doe" }].map(
                            (option) => (
                              <Button
                                type="button"
                                value={option.label}
                                key={option.value}
                                onClick={() => {
                                  field.onChange(option.value);
                                }}
                                className="w-full justify-start border-0 text-left bg-transparent hover:bg-gray-100 rounded-none text-current"
                              >
                                <Check
                                  className={cn(
                                    "mr-2 grow-0 shrink-0 h-4 w-4",
                                    option.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {option.label}
                              </Button>
                            ),
                          )}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      <NewJobDialog />
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
