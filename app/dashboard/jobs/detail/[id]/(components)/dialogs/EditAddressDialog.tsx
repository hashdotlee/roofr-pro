"use client";

import CustomInput from "@/components/custom/Input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import useJob from "@/hooks/useJob";
import { useUpdateJob } from "@/hooks/useUpdateJob";
import { zodResolver } from "@hookform/resolvers/zod";
import { PenIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  address: z.string().min(1, {
    message: "Please enter an address.",
  }),
});

export default function EditAddressDialog() {
  const jobID = useParams().id as string;
  const { data: job } = useJob(jobID);
  const { mutate: updateJob } = useUpdateJob({
    jobId: jobID,
  });
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: job?.address,
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="rounded-full w-10 h-10 p-2">
          <PenIcon className="w-5 h-5 text-blue-400" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="m-auto text-2xl font-semibold mt-4">
          Edit Job Address
        </DialogHeader>
        <Form {...form}>
          <form
            action={() => {
              updateJob({
                job: { address: form.getValues().address! },
              });
              setOpen(false);
            }}
          >
            <CustomInput
              name="address"
              label="Address"
              control={form.control}
              containerClassName="w-full"
              inputClassName="w-full border-slate-400"
            />
            <div className="flex flex-row justify-center items-center gap-4 my-4">
              <Button
                variant="destructive"
                type="button"
                onClick={() => {
                  setOpen(false);
                }}
                className="px-8"
              >
                Cancel
              </Button>
              <Button type="submit" className="px-8">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
