"use client";
import { JobProvider } from "@/hooks/useJob";
import JobDetailPage from "./JobDetailPage";

export default function Page() {
  return (
    <JobProvider>
      <JobDetailPage hasCloseButton={false} />
    </JobProvider>
  );
}
