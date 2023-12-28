import { updateJob } from "@/actions/job";
import CustomComboBox from "@/components/custom/ComboBox";
import CustomSelect from "@/components/custom/Select";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ComposeJobDTO } from "@/dtos/compose-job.dto";
import useJob from "@/hooks/useJob";
import baseQueryKey from "@/lib/constants/queryKey";
import { useJobStore } from "@/lib/stores/jobStore";
import { defaultSources } from "@/types/default-sources";
import { JobStage } from "@/types/job";
import { useQueryClient } from "@tanstack/react-query";
import { LightbulbIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import AssigneePopover from "./AssigneePopover";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    assignee: z.object({
        _id: z.string().optional(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
        }).optional(),
    stage: z.nativeEnum(JobStage).optional(),
    source: z.string().optional(),
    jobValue: z.number().optional(),
    details: z.string().optional(),
    });

const defaultValue = {
        assignee: {
        _id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
            },
        stage: JobStage.NEW_LEAD,
        source: "",
        jobValue: 0,
        details: "",
        };


export default function JobDetails() {
  const id = useParams().id as string;
  const { data: job } = useJob(id);
  const [isSaving, setIsSaving] = useState(false);
  const [hasNotSavedChanges, setHasNotSavedChanges] = useState(false);
  const modifyJob = useJobStore((state) => state.modifyJob);

  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
    });

  useEffect(() => {
    if (job) {
      form.reset(job);
    }
  }, [job]);

  useEffect(() => {
    if (JSON.stringify(form.getValues()) !== JSON.stringify(getJobDetails(job)))
      setHasNotSavedChanges(true);
    else setHasNotSavedChanges(false);
  }, [form.watch()]);

  const queryClient = useQueryClient();

  const onSubmit = async (data: ) => {
    if (JSON.stringify(data) === JSON.stringify(getJobDetails(job))) return;

    try {
      setIsSaving(true);
      const res = await updateJob(job?._id!, data);
      if (!res.ok) throw { message: res.message };
      toast.success(res.message);
      queryClient.setQueryData(
        [...baseQueryKey.JOB_DETAILS, id],
        (old: ComposeJobDTO) => ({
          ...old,
          ...payload,
        }),
      );
      if (payload.stage) {
        modifyJob(String(job?._id), {
          stage: form.getValues().stage!,
        });
      }
      setHasNotSavedChanges(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-row justify-between items-center mb-4">
            <p className="text-lg font-semibold leading-3 text-left">
              Job Details
            </p>

            <div className="space-x-4">
              {hasNotSavedChanges && (
                <span className="text-red-600 text-xs">
                  * Changes have not been saved
                </span>
              )}
              <Button
                type="submit"
                variant={"default"}
                className="rounded-full px-8 py-2 text-xs font-semibold bg-blue-500 hover:bg-blue-700 h-7"
                disabled={isSaving || !hasNotSavedChanges}
              >
                {isSaving ? "Saving..." : "Save"}
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
  job: ComposeJobDTO | null;
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
      selectClassName="w-full "
    />
  );
}
