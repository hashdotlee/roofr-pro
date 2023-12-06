import UploadFile from "@/components/custom/UploadFile";
import Link from "next/link";

export default function Attachment() {
  return (
    <>
      <div className="text-lg font-semibold leading-3 text-left">
        Attachments
      </div>
      <div className="my-4">
        <UploadFile />
        <p className="text-xs text-neutral-500 mt-2">
          Your plan limits you to 1 file upload per job (maximum of 20mb per
          file). To learn more or increase your limits,{" "}
          <Link href="/" className="text-blue-500 hover:underline">click here.</Link>
        </p>
      </div>
    </>
  );
}
