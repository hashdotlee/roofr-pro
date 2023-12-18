"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { createJob } from "@/actions/job";
import Input from "@/components/custom/Input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useJobs } from "@/hooks/useJobs";
import toast from "react-hot-toast";

const FormSchema = z.object({
  address: z.string({
    required_error: "Please select a address.",
  }),
});

export function NewJobForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { toggleRefetch } = useJobs();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await createJob(data.address);
      toast.success("Job created successfully");
      toggleRefetch();
      form.reset();
    } catch (error) {
      const e = error as Error;
      if (e.message) toast.error(e.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Label htmlFor="address" className="fon-semibold text-base">
          Address
        </Label>
        <Input
          name="address"
          placeholder="Enter address"
          inputClassName="w-full"
          containerClassName="my-3"
          control={form.control}
        />
        <Button type="submit" className="w-full mt-3">
          Submit
        </Button>
      </form>
    </Form>
  );
}
