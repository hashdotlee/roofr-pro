import { UploadIcon } from "lucide-react";

export default function UploadFile() {
  return (
    <label
      htmlFor="file-upload"
      className="p-4 bg-white border-dashed cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200 border-2 w-full block h-[200px] rounded-lg"
    >
      <input id="file-upload" type="file" className="hidden sr-only" />
      <div className="flex w-full h-full flex-col gap-2 items-center justify-center text-neutral-500">
        <UploadIcon className="w-12 h-12 text-blue-500 mx-auto" />
        <div className="font-semibold">Attach File or Photo</div>
        <div className="text-xs">Click here to upload file</div>
      </div>
    </label>
  );
}
