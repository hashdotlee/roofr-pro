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
import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function DeleteJobDialog({
  jobId,
  taskId,
  toggleRefetch,
}: {
  jobId: string;
  taskId: string;
  toggleRefetch: any;
}) {
  const [open, setOpen] = useState(false);

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
            onClick={async () => {
              const res = await fetch(`/api/jobs/${jobId}/tasks/${taskId}`, {
                method: "DELETE",
              }).then((res) => res.json());
              if (res.code === 200) {
                toast.success(res.message);
                toggleRefetch();
                setOpen(false);
              } else {
                toast.error(res.message);
              }
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
