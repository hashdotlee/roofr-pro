import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UploadIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_IMAGE_COUNT = 6;

export default function Attachment() {
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  return (
    <>
      <div className="flex flex-row w-full justify-between items-center">
        <p className="text-lg font-semibold leading-3 text-left">Attachments</p>
        <Button
          variant={"default"}
          className="rounded-full px-8 py-2 text-sm bg-green-800 hover:bg-green-700 h-7"
        >
          Save
        </Button>
      </div>

      <div className="my-4">
        <div className="grid grid-cols-4 gap-4">
          {imageFiles.map((file, index) => (
            <ImagePreview
              file={file}
              setImageFiles={setImageFiles}
              key={index}
            />
          ))}
        </div>
      </div>

      <div className="my-4">
        {imageFiles.length < MAX_IMAGE_COUNT && (
          <UploadFile imageFiles={imageFiles} setImageFiles={setImageFiles} />
        )}
        <p className="text-xs text-neutral-500 mt-2">
          Up to {MAX_IMAGE_COUNT} files, 5MB each. Only accept image file types.
        </p>
      </div>
    </>
  );
}

function UploadFile({
  imageFiles,
  setImageFiles,
}: {
  imageFiles: File[];
  setImageFiles: Dispatch<SetStateAction<File[]>>;
}) {
  return (
    <label
      htmlFor="file-upload"
      className={cn(
        "p-4 bg-white border-dashed cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200 border-2 w-full block rounded-lg",
        {
          "h-[200px]": imageFiles.length === 0,
          "h-[100px]": imageFiles.length > 0,
        }
      )}
    >
      <input
        id="file-upload"
        type="file"
        className="hidden sr-only"
        accept="image/*"
        onChange={(e) => {
          // console.log(e.target.files?.item(0));

          const files = Array.from(e.target.files || []);
          if (files.length === 0) return;

          console.log("uploaded files: ", imageFiles);
          console.log("files: ", files);

          const newFile = files[0];
          console.log("newFile: ", newFile);

          if (newFile.size > MAX_IMAGE_SIZE) {
            toast.error(
              "File size is too large. Please upload a file less than 5MB."
            );
            return;
          }

          const doesExist = imageFiles.some((file: File) => {
            for (const [key, val] of Object.entries(file)) {
              if (val === newFile[key as keyof File]) {
                return true;
              }
            }
            return false;
          });

          console.log("doesExist: ", doesExist);
          if (doesExist) {
            toast.error("File already exists. Please upload a different file.");
            return;
          }

          setImageFiles((old: File[]) => [...old, ...files]);
        }}
        disabled={imageFiles.length >= MAX_IMAGE_COUNT}
      />
      <div
        className={cn(
          "flex w-full flex-col gap-2 items-center justify-center text-neutral-500"
        )}
      >
        <UploadIcon
          className={cn("w-12 h-12 text-blue-500 mx-auto", {
            "w-6 h-6": imageFiles.length > 0,
          })}
        />
        <div className="font-semibold">Attach File or Photo</div>
        <div
          className={cn("text-xs", {
            hidden: imageFiles.length > 0,
          })}
        >
          Click here to upload file
        </div>
      </div>
    </label>
  );
}

function ImagePreview({
  file,
  setImageFiles,
}: {
  file: File;
  setImageFiles: Dispatch<SetStateAction<File[]>>;
}) {
  return (
    <div className="relative w-full h-full">
      <img
        src={URL.createObjectURL(file)}
        className="object-cover w-full h-full rounded-lg"
      />
      <div className="absolute top-0 right-0">
        <button
          className="bg-gray-200 rounded-full p-1"
          onClick={() =>
            setImageFiles((old: File[]) =>
              old.filter((_file) => file !== _file)
            )
          }
        >
          <XIcon className="w-4 h-4 text-red-500 font-bold" />
        </button>
      </div>
    </div>
  );
}
