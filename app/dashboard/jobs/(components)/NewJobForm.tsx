import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import Input from "@/components/custom/Input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useCreateJob } from "@/hooks/useCreateJob";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

const FormSchema = z.object({
  address: z.string({
    required_error: "Please select a address.",
  }),
});

export function NewJobForm({
  setOpen,
  customerId,
}: {
  customerId?: string;
  setOpen: (open: boolean) => void;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { data: session, status } = useSession();
  const user = session?.user;
  const [loading, setLoading] = useState(false);

  const { mutate: createJob } = useCreateJob();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (status !== "authenticated" || !user) {
      toast.error("You must be logged in to create a job.");
      return;
    }
    setLoading(true);
    createJob({
      address: data.address,
      customer: customerId,
    });
    setOpen(false);
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
        <Button disabled={loading} type="submit" className="w-full mt-3">
          Submit
        </Button>
      </form>
    </Form>
  );
}
