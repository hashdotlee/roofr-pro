"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import CustomComboBox from "@/components/custom/ComboBox";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

const addresses = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
];

const FormSchema = z.object({
  address: z.string({
    required_error: "Please select a address.",
  }),
});

export function NewJobForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <CustomComboBox
          name="address"
          label="Address"
          control={form.control}
          options={addresses}
          placeholder="Select an address"
          description="Select an address from the list."
          selectClassName="w-full"
          contentClassName="max-w-[29rem] w-[calc(100vw-3rem)] p-0"
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
