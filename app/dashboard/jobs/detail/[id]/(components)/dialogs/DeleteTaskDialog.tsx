"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteTask } from "@/hooks/useDeleteTask";
import { Trash } from "lucide-react";
import { useState } from "react";

export default function DeleteJobDialog({
  jobId,
  taskId,
}: {
  jobId: string;
  taskId: string;
}) {
  const [open, setOpen] = useState(false);

  const { mutate: handleDeleteTask } = useDeleteTask({
    jobId,
    taskId,
  });

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Trash
          role="button"
          onClick={() => {
            setOpen(true);
          }}
          className="h-4 w-4 text-red-500"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-2xl mx-auto font-semibold my-4 text-center">
          Are you sure?
        </DialogHeader>
        <DialogDescription className="text-base">
          This action cannot be undone. This will permanently delete the task.
        </DialogDescription>
        <DialogFooter className="text-center">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              handleDeleteTask();
              setOpen(false);
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
