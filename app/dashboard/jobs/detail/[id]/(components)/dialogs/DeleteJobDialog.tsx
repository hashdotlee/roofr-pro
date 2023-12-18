"use client";

import { deleteJob } from "@/actions/job";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import useJob from "@/hooks/useJob";
import { useJobs } from "@/hooks/useJobs";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function DeleteJobDialog() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { job } = useJob();
  const jobId = String(job?._id);
  const { toggleRefetch } = useJobs();

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="flex gap-2 text-red-500 items-center"
          onClick={() => {
            setOpen(true);
          }}
        >
          <Trash className="w-4 h-4" /> Delete Job
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-2xl mx-auto font-semibold my-4 text-center">
          Are you sure?
        </DialogHeader>
        <DialogDescription className="text-base">
          This action cannot be undone. This will permanently delete the
          customer and all associated tasks.
        </DialogDescription>
        <DialogFooter className="text-center">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={async () => {
              const res = await deleteJob(jobId);
              if (res.code === 200) {
                toast.success(res.message);
                toggleRefetch();
                router.back();
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
