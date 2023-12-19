import CustomComboBox from "@/components/custom/ComboBox";
import CustomSelect from "@/components/custom/Select";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ComposeJobDTO } from "@/dtos/compose-job.dto";
import useJob from "@/hooks/useJob";
import { defaultSources } from "@/types/default-sources";
import { JobStage } from "@/types/job";
import { LightbulbIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import AssigneePopover from "./AssigneePopover";

export default function JobDetails() {
  const { job } = useJob();
  console.log(job);
  const form = useForm({
    defaultValues: {
      assignee: {
        firstName: job?.assignee?.firstName,
        lastName: job?.assignee?.lastName,
        avatar: job?.assignee?.avatar,
      },
      stage: job?.stage,
      source: job?.source,
      details: job?.details,
    },
  });

  useEffect(() => {
    if (job)
      form.reset({
        assignee: {
          firstName: job?.assignee?.firstName,
          lastName: job?.assignee?.lastName,
          avatar: job?.assignee?.avatar,
        },
        stage: job?.stage,
        source: job?.source,
        details: job?.details,
      });
  }, [job]);

  const onSubmit = (data: any) => console.log(data);

  return (
    <>
      <div className="text-lg font-semibold leading-3 text-left">
        Job Details
      </div>
      <Form {...form}>
        <form
          className="grid gap-4 my-4 items-center grid-cols-3"
          // onChange={form.handleSubmit(onSubmit)}
        >
          <AssigneePopover
            control={form.control}
            name="assignee"
            label="Assignee"
          />

          <CustomSelect
            name="stage"
            label="Stage"
            control={form.control}
            options={Object.values(JobStage).map((stage) => ({
              label: stage,
              value: stage,
            }))}
            placeholder={job?.stage}
          />
          <SourceSelector form={form} job={job} />
          <JobValueInput form={form} job={job} />

          <div className="p-3 bg-blue-200/50 flex items-center border border-blue-500 gap-4 text-xs col-span-2 rounded-md self-end">
            <LightbulbIcon className="h-4 w-4 text-yellow-500" /> Job value will
            help you to prioritize your jobs.
          </div>

          <FormField
            name="details"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col col-span-3">
                <FormLabel htmlFor="details">Details</FormLabel>
                <Textarea
                  {...field}
                  id="details"
                  className="w-full"
                  placeholder="Frequently referenced info (gate code, material section, parking, etc.)"
                />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
}

function JobValueInput({
  form,
  job,
}: {
  form: UseFormReturn<any, any, undefined>;
  job: ComposeJobDTO | null;
}) {
  const [currencyValue, setCurrencyValue] = useState(
    job?.jobValue?.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    }) || ""
  );
  return (
    <FormItem>
      <FormLabel htmlFor="job-value">Job Value</FormLabel>
      <Input
        id="job-value"
        type="text"
        className="w-full font-semibold text-base placeholder:font-normal placeholder:text-sm"
        placeholder="Job Value"
        inputMode="decimal"
        value={currencyValue}
        onBlur={() => {
          setCurrencyValue(
            Number(form.getValues("job-value")).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })
          );
        }}
        onChange={(e) => {
          setCurrencyValue(e.target.value);
          form.setValue(
            "job-value",
            Number(e.target.value.replace(/[^0-9.]/g, ""))
          );
        }}
      />
    </FormItem>
  );
}

function SourceSelector({
  form,
  job,
}: {
  form: UseFormReturn<any, any, undefined>;
  job: ComposeJobDTO | null;
}) {
  return (
    <CustomComboBox
      control={form.control}
      name="source"
      label="Source"
      options={defaultSources.map((source) => ({
        label: source,
        value: source,
      }))}
      placeholder={job?.source || "None"}
      contentClassName="h-64 overflow-y-auto"
    />
  );
}
