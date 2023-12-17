"use client";

import { deleteCustomer } from "@/actions/customer";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function DeleteCustomerDialog({
  customerId,
}: {
  customerId: string;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button
          variant={"destructive"}
          className="w-full py-3 px-4 flex items-center gap-2 font-semibold"
        >
          <Trash className="w-4 h-4" /> Delete Customer
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-2xl mx-auto font-semibold my-4 text-center">
          Are you sure?
        </DialogHeader>
        <DialogDescription className="text-base">
          This action cannot be undone. This will permanently delete the
          customer and all associated jobs.
        </DialogDescription>
        <DialogFooter className="text-center">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={async () => {
              const res = await deleteCustomer(customerId);
              if (res.ok) {
                toast.success(res.message);
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
