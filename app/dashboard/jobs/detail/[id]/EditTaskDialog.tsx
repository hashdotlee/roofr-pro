import { DatePicker } from "@/components/custom/DatePicker";
import CustomInput from "@/components/custom/Input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import AssigneePopover from "./AssigneePopover";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  title: z.string().nonempty({
    message: "Please enter a title.",
  }),
  description: z.string().optional(),
  dueDate: z.date().nullable().optional(),
  assignee: z
    .object({
      _id: z.string(),
      firstname: z.string().optional(),
      lastname: z.string().optional(),
    })
    .nullable()
    .optional(),
});

export default function EditTaskDialog({ task, toggleRefetch }: any) {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task?.title,
      description: task?.description,
      dueDate: new Date(task?.dueDate || Date.now()),
      assignee: task?.assignee,
    },
  });
  const jobId = useParams().id as string;
  const onSubmit = (data: any) => {
    fetch(`/api/jobs/${jobId}/tasks/${task._id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        assignee: data.assignee._id,
      }),
    }).then(() => {
      toast.success("Task updated");
      toggleRefetch();
      setOpen(false);
    });
  };

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Pencil
          onClick={() => setOpen(true)}
          role="button"
          className="h-4 w-4 text-blue-500 cursor-pointer"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CustomInput
              name="title"
              label="Title"
              inputClassName="w-full"
              control={form.control}
              placeholder="Title"
            />
            <CustomInput
              name="description"
              label="Description"
              inputClassName="w-full"
              control={form.control}
              placeholder="Description"
            />
            <div className="flex items-center gap-3">
              <DatePicker
                name="dueDate"
                control={form.control}
                label="Due Date"
              />
              <AssigneePopover control={form.control} name="assignee" />
            </div>
            <Button type="submit" className="w-full mt-3">
              Update task
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
