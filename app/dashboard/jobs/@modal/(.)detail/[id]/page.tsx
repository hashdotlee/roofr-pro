"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import JobDetailPage from "../../../detail/[id]/JobDetailPage";
import { JobProvider } from "@/hooks/useJob";

export default function JobDetailModal() {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  return (
    <Dialog
      open={open}
      onOpenChange={(_open) => {
        if (!_open) {
          router.back();
        }
      }}
    >
      <DialogContent
        className="max-w-[80vw] h-[86vh] flex flex-col"
        hasCloseButton={false}
      >
        <JobProvider>
          <JobDetailPage hasCloseButton />
        </JobProvider>
      </DialogContent>
    </Dialog>
  );
}
