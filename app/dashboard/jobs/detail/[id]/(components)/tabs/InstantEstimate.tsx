import { updateJob } from "@/actions/job";
import CustomInput from "@/components/custom/Input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useJob from "@/hooks/useJob";
import { useMetrics } from "@/hooks/useMetrics";
import { Job } from "@/models/Job";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const metricList = [
  {
    name: "Roof footprint area (sqft)",
    key: "roofFootprintArea",
  },
  {
    name: "Pitch",
    key: "pitch",
  },
  {
    name: "Roof area adjusted for pitch (sqft)",
    key: "roofAreaAdjustedForPitch",
  },
  {
    name: "Currently on roof",
    key: "currentlyOnRoof",
  },
  {
    name: "Desired material",
    key: "desiredMaterial",
  },
  {
    name: "Project timeline",
    key: "projectTimeline",
  },
  {
    name: "Residential / Commercial",
    key: "residentialCommercial",
  },
  {
    name: "Wants financing?",
    key: "wantsFinancing",
  },
  {
    name: "Customer Note",
    key: "customerNote",
  },
];

const formSchema = z.object({
  roofFootprintArea: z
    .string()
    .regex(/^[0-9]+$/, "Roof footprint area is number"),
  pitch: z.string().regex(/^[0-9]+$/, "Pitch is number"),
  roofAreaAdjustedForPitch: z
    .string()
    .regex(/^[0-9]+$/, "Roof area adjusted for pitch is number"),
  currentlyOnRoof: z.string().regex(/^[0-9]+$/, "Currently on roof is number"),
  desiredMaterial: z.string().regex(/^[0-9]+$/, "Desired material is number"),
  projectTimeline: z.string().regex(/^[0-9]+$/, "Project timeline is number"),
  residentialCommercial: z
    .string()
    .regex(/^[0-9]+$/, "Residential / Commercial is number"),
  wantsFinancing: z.string().regex(/^[0-9]+$/, "Wants financing is number"),
  customerNote: z.string().regex(/^[0-9]+$/, "Customer Note is number"),
});

export default function InstantEstimate() {
  const jobId = useParams().id as string;

  const [loading, setLoading] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      roofFootprintArea: "0",
      pitch: "0",
      roofAreaAdjustedForPitch: "0",
      currentlyOnRoof: "0",
      desiredMaterial: "0",
      projectTimeline: "0",
      residentialCommercial: "0",
      wantsFinancing: "0",
      customerNote: "0",
    },
  });

  const { job, setJob } = useJob();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    const numberMetrics = {
      roofFootprintArea: Number(data.roofFootprintArea),
      pitch: Number(data.pitch),
      roofAreaAdjustedForPitch: Number(data.roofAreaAdjustedForPitch),
      currentlyOnRoof: Number(data.currentlyOnRoof),
      desiredMaterial: Number(data.desiredMaterial),
      projectTimeline: Number(data.projectTimeline),
      residentialCommercial: Number(data.residentialCommercial),
      wantsFinancing: Number(data.wantsFinancing),
      customerNote: Number(data.customerNote),
    };
    await updateJob(jobId, {
      metrics: numberMetrics,
    });
    setJob((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        metrics: numberMetrics,
      };
    });
    setIsEdit(false);
    setLoading(false);
  };

  useEffect(() => {
    const metrics = job?.metrics;
    if (metrics) {
      form.reset({
        roofFootprintArea: metrics.roofFootprintArea.toString(),
        pitch: metrics.pitch.toString(),
        roofAreaAdjustedForPitch: metrics.roofAreaAdjustedForPitch.toString(),
        currentlyOnRoof: metrics.currentlyOnRoof.toString(),
        desiredMaterial: metrics.desiredMaterial.toString(),
        projectTimeline: metrics.projectTimeline.toString(),
        residentialCommercial: metrics.residentialCommercial.toString(),
        wantsFinancing: metrics.wantsFinancing.toString(),
        customerNote: metrics.customerNote.toString(),
      });
    }
  }, [job?.metrics]);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold leading-3 text-left">
          Instant Estimate
        </div>
        {isEdit ? (
          <Button
            variant={"default"}
            className="rounded-full px-8 py-2 text-xs font-semibold bg-blue-500 hover:bg-blue-700 h-7"
            onClick={() => {
              form.handleSubmit(onSubmit)();
            }}
            disabled={!form.formState.isValid || loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        ) : (
          <Button
            variant={"default"}
            className="rounded-full px-8 py-2 text-xs font-semibold bg-blue-500 hover:bg-blue-700 h-7"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </Button>
        )}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-4 mt-4 grid-cols-1">
            {metricList.map((metric, index) => (
              <div className="text-sm font-semibold" key={index}>
                <div className="text-gray-500 my-1">{metric.name}</div>
                {isEdit ? (
                  <CustomInput
                    name={metric.key}
                    type="number"
                    control={form.control}
                    inputClassName="border font-normal border-gray-200 rounded-md p-2 w-full"
                  />
                ) : job?.metrics ? (
                  <div>{job?.metrics[metric.key as keyof Job["metrics"]]}</div>
                ) : (
                  "0"
                )}
              </div>
            ))}
          </div>
        </form>
      </Form>
    </>
  );
}
