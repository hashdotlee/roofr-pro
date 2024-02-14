import CustomTextArea from "@/components/custom/Area";
import { DatePicker } from "@/components/custom/DatePicker";
import CustomInput from "@/components/custom/Input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { TaskDTO } from "@/dtos/compose-job.dto";
import { useUpdateTask } from "@/hooks/useUpdateTask";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AssigneePopover from "../tabs/AssigneePopover";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Please enter a title.",
  }),
  description: z.string().optional(),
  dueDate: z.date().optional(),
  assignee: z
    .object({
      _id: z.string(),
      firstname: z.string().optional(),
      lastname: z.string().optional(),
    })
    .optional(),
});

interface EditTaskDialogProps {
  taskId: string;
  jobId: string;
  task: TaskDTO;
}

export default function EditTaskDialog({
  taskId,
  task,
  jobId,
}: EditTaskDialogProps) {
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

  const { mutate: handleUpdateTask } = useUpdateTask({
    jobId,
    taskId,
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    handleUpdateTask(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
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
            <CustomTextArea
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
