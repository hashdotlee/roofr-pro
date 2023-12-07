"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import JobDetail from "../../../detail/[id]/page";
import { useRouter } from "next/navigation";

export default function JobDetailModal() {
  const router = useRouter();
  return (
    <Dialog
      defaultOpen
      onOpenChange={(open) => {
        if (!open) {
          router.back();
        }
      }}
    >
      <DialogContent className="max-w-[80vw] h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogClose className="mb-3" />
        </DialogHeader>
        <JobDetail />
      </DialogContent>
    </Dialog>
  );
}
