import CustomComboBox from "@/components/custom/ComboBox";
import CustomInput from "@/components/custom/Input";
import CustomSelect from "@/components/custom/Select";
import { Form } from "@/components/ui/form";
import { Lightbulb, LightbulbIcon } from "lucide-react";
import { useForm } from "react-hook-form";

export default function JobDetails() {
  const form = useForm({});
  const onSubmit = (data: any) => console.log(data);
  return (
    <>
      <div className="text-lg font-semibold leading-3 text-left">
        Job Details
      </div>
      <Form {...form}>
        <form
          className="grid gap-4 my-4 items-center grid-cols-3"
          onChange={form.handleSubmit(onSubmit)}
        >
          <CustomSelect
            name="assignee"
            label="Assignee"
            control={form.control}
            options={[
              { label: "John Doe", value: "john-doe" },
              { label: "Jane Doe", value: "jane-doe" },
            ]}
            placeholder="Assignee"
          />
          <CustomSelect
            name="stage"
            label="Stage"
            control={form.control}
            options={[
              { label: "John Doe", value: "john-doe" },
              { label: "Jane Doe", value: "jane-doe" },
            ]}
            placeholder="Stage"
          />
          <CustomInput
            name="source"
            label="Source"
            inputClassName="w-full"
            control={form.control}
            placeholder="Source"
          />
          <CustomInput
            name="Job Value"
            label="Job Value"
            inputClassName="w-full"
            control={form.control}
            placeholder="Job Value"
          />
          <div className="p-3 bg-blue-200/50 flex items-center border border-blue-500 gap-4 text-xs col-span-2 rounded-md self-end">
            <LightbulbIcon className="h-4 w-4 text-yellow-500" /> Job value will
            help you to prioritize your jobs,
          </div>
          <CustomInput
            name="details"
            label="Details"
            containerClassName="col-span-3"
            inputClassName="w-full"
            control={form.control}
            placeholder="Frequently referenced info (gate code, material section, parking, etc.)"
          />
        </form>
      </Form>
    </>
  );
}
