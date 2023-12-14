"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import JobDetailPage from "../../../detail/[id]/page";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
        className="max-w-[80vw] h-[80vh] flex flex-col"
        hasCloseButton={false}
      >
        <JobDetailPage
          isModal={true}
          handleClose={() => {
            setOpen(false);
            router.back();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
