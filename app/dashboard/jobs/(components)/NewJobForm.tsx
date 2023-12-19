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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  address: z.string({
    required_error: "Please select a address.",
  }),
});

export function NewJobForm({ setOpen }: { setOpen: (open: boolean) => void }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { data: session, status } = useSession();
  const user = session?.user;

  const { toggleRefetch } = useJobs();

  const router = useRouter();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (status !== "authenticated" || !user) {
      toast.error("You must be logged in to create a job.");
      return;
    }
    try {
      const { data: job } = await createJob({
        address: data.address,
        creatorId: user.id,
      });
      toast.success("Job created successfully");
      toggleRefetch();
      setOpen(false);
      router.push(`/dashboard/jobs/detail/${job._id}`);
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
