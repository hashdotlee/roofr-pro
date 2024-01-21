import CustomComboBox from "@/components/custom/ComboBox";
import CustomSelect from "@/components/custom/Select";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ComposeJobDTO } from "@/dtos/compose-job.dto";
import useJob from "@/hooks/useJob";
import { useUpdateJob } from "@/hooks/useUpdateJob";
import { Roles } from "@/types/account";
import { defaultSources } from "@/types/default-sources";
import { JobStage } from "@/types/job";
import deepEql from "deep-eql";
import { LightbulbIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import AssigneePopover from "./AssigneePopover";

const formSchema = z.object({
  assignee: z
    .object({
      _id: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      email: z.string(),
      role: z.nativeEnum(Roles),
    })
    .optional(),
  stage: z.nativeEnum(JobStage).optional(),
  source: z.string().optional(),
  jobValue: z.number().optional(),
  details: z.string().optional(),
});

export default function JobDetails() {
  const id = useParams().id as string;
  const { data: job } = useJob(id);
  const { mutate: updateJob } = useUpdateJob({ jobId: id });

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      assignee: {
        _id: "",
        firstName: "",
        lastName: "",
        email: "",
        role: Roles.CONTRACTOR,
      },
      stage: JobStage.NEW_LEAD,
      source: "",
      jobValue: 0,
      details: "",
    },
  });

  useEffect(() => {
    if (job) {
      form.reset(job);
    }
  }, [job]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    updateJob({ job: values });
  };

  const isChange = useMemo(() => {
    return !deepEql(job, form.watch());
  }, [job, form.getValues()]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-row justify-between items-center mb-4">
            <p className="text-lg font-semibold leading-3 text-left">
              Job Details
            </p>

            <div className="space-x-4">
              <Button
                type="submit"
                variant={"default"}
                className="rounded-full px-8 py-2 text-xs font-semibold bg-blue-500 hover:bg-blue-700 h-7"
                disabled={!isChange || form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>

          <div className="grid gap-4 my-4 items-center grid-cols-3">
            <AssigneePopover
              control={form.control}
              name="assignee"
              label="Assignee"
              contentClassname={`w-[10rem] xs:w-[20rem]`}
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
              <LightbulbIcon className="h-4 w-4 text-yellow-500" /> Job value
              will help you to prioritize your jobs.
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
          </div>
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
  job?: ComposeJobDTO;
}) {
  const [currencyValue, setCurrencyValue] = useState(
    job?.jobValue?.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    }) || "",
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
          const jobValue = Number(form.getValues("jobValue"));
          if (Number.isNaN(jobValue)) setCurrencyValue("$0.00");
          else
            setCurrencyValue(
              jobValue.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              }),
            );
        }}
        onChange={(e) => {
          setCurrencyValue(e.target.value);
          form.setValue(
            "jobValue",
            Number(e.target.value.replace(/[^0-9.]/g, "")),
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
  job?: ComposeJobDTO;
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
      selectClassName="w-full "
    />
  );
}
