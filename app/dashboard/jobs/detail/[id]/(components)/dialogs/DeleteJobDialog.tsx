import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteJob } from "@/hooks/useDeleteJob";
import { Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function DeleteJobDialog({
  setOpen: _setOpen,
}: {
  setOpen?: (open: boolean) => void;
}) {
  const jobID = useParams().id as string;
  const [open, setOpen] = useState(false);
  const { mutate: deleteJob } = useDeleteJob(jobID);

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
            onClick={() => {
              deleteJob();
              setOpen(false);
              if (_setOpen) _setOpen(false);
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
