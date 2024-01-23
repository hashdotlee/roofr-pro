import CustomInput from "@/components/custom/Input";
import CustomSelect from "@/components/custom/Select";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import useAccounts from "@/hooks/useAccount";
import { SortBy, defaultFilter } from "@/hooks/useJobs";
import { cn } from "@/lib/utils";
import { Roles } from "@/types/account";
import { JobStage } from "@/types/job";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Check,
    ChevronDown,
    ChevronDownIcon,
    Loader2,
    Search,
} from "lucide-react";
import { Session } from "next-auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
import { z } from "zod";

const formSchema = z.object({
  updatedAt: z.string().optional(),
  stage: z.string().array(),
  sortBy: z.nativeEnum(SortBy).optional(),
  search: z.string().optional(),
  assignee: z.string(),
});

export default function FilterForm({
  filter,
  setFilter,
  session,
}: {
  filter: any;
  setFilter: any;
  session: Session;
}) {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFilter,
  });
  const onSubmit = useDebouncedCallback(() => {
    const newData = form.getValues();
    const { updatedAt, search } = newData;
    if (search) {
      newData.search = search.toLowerCase().replace(/\\/g, "");
    }
    if (updatedAt) {
      const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
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
  const { data: assignees = [], isFetching } = useAccounts({
    page: 1,
    limit: 10,
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onChange={form.handleSubmit(onSubmit)}
        className="flex gap-4 flex-row items-center justify-start"
      >
        <Label className="relative block shrink-0">
          <div className="absolute top-3 ps-4 text-gray-500 text-lg">
            <Search className="w-4 h-4" />
          </div>
          <CustomInput
            name="search"
            placeholder="Search jobs..."
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
                                          (item: any) => item !== stage
                                        )
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
        {session?.user?.role === Roles.ADMIN && (
          <div>
            <FormField
              name="assignee"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <button
                        role="combobox"
                        aria-expanded={open}
                        className="border-0 flex items-center w-[200px] gap-2 text-sm text-blue-500 hover:text-blue-700 font-semibold text-left"
                      >
                        Assignee
                        {field.value &&
                          ": " +
                            assignees.find(
                              (assignee) => assignee._id === field.value
                            )?.lastName}
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search assignee..." />
                        <CommandEmpty>No assignee found.</CommandEmpty>
                        <CommandGroup>
                          {!isFetching ? (
                            assignees.map((assignee) => (
                              <CommandItem
                                key={assignee?._id}
                                value={assignee?._id}
                                ref={field.ref}
                                onSelect={(currentValue) => {
                                  form.setValue(
                                    "assignee",
                                    currentValue === field.value
                                      ? ""
                                      : currentValue
                                  );
                                  form.handleSubmit(onSubmit)();
                                  setOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    field.value === assignee._id
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {assignee.firstName} {assignee.lastName}
                              </CommandItem>
                            ))
                          ) : (
                            <div className="flex justify-center items-center h-32">
                              <Loader2 className="w-6 h-6 animate-spin" />
                            </div>
                          )}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
          </div>
        )}
      </form>
    </Form>
  );
}
