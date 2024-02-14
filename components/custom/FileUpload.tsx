import { storage } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import {
  getDownloadURL,
  getMetadata,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Loader2, Trash, Upload } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { Button } from "../ui/button";
import { ProgressBar } from "./ProgressBar";

export default function FileUploader({
  object,
  onChange,
  value,
}: {
  onChange: (url: string[]) => void;
  value: string[];
  object: string;
}) {
  const [files, setFiles] = useState<File[] | null>();
  const [progress, setProgress] = useState<{ [key: string]: number }>({});
  const [metadata, setMetadata] = useState<{ [key: string]: any }>({});
  const [urls, setUrls] = useState<{ [key: string]: string }>({});
  // 'file' comes from the Blob or File API

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget?.files) {
      for (let i = 0; i < e.currentTarget?.files.length; i++) {
        const file = e.currentTarget?.files[i];
        setFiles((old) => [...(old || []), file]);

        const storageRef = ref(storage, `${object}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file, {
          contentType: file.type,
          customMetadata: {
            object,
          },
        });
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress((old) => ({
              ...old,
              [file.name]: progress,
            }));
          },
          (error) => {},
          async () => {
            await getMetadata(storageRef).then((metadata) => {
              setMetadata((old) => ({
                ...old,
                [file.name]: metadata,
              }));
            });
            await getDownloadURL(storageRef).then((url) => {
              setUrls((old) => ({
                ...old,
                [file.name]: url,
              }));
              onChange([...value, url]);
            });
          },
        );
      }
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex bg-white rounded-xl flex-col divide-y border border-back">
        {value.length > 0 &&
          value.map((url, index) => (
            <div
              key={index}
              className="px-4 cursor-pointer py-2 flex justify-between gap-2 items-center"
            >
              <Link
                href={url}
                className="text-xs font-bold text-blue-400 w-full hover:underline line-clamp-1"
              >
                {index + 1}. {url}{" "}
              </Link>
              <Button
                type="button"
                variant={"link"}
                className="flex text-destructive text-xs items-center gap-2"
                onClick={() => {
                  onChange([
                    ...value.filter((v) => v !== url),
                  ]);
                }}
              >
                <Trash className="w-4 h-4 inline" /> Remove
              </Button>
            </div>
          ))}
        {files &&
          files?.length > 0 &&
          files
            .filter(
              (item) => progress[item.name] > 0 && progress[item.name] < 100,
            )
            .map((file, index) => (
              <div
                key={index}
                className="px-4 cursor-pointer py-2 flex justify-between gap-2 items-center"
              >
                {progress?.[file.name] < 100 && (
                  <ProgressBar max={100} value={progress?.[file.name]} />
                )}
                {!urls?.[file.name] && (
                  <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                )}
              </div>
            ))}
      </div>
      <label
        htmlFor="file-upload"
        className={cn(
          "p-4 bg-white border-dashed cursor-pointer hover:bg-blue-50 flex items-center justify-center hover:border-blue-300 transition-colors duration-200 border-2 w-full rounded-lg",
        )}
      >
        <input
          id="file-upload"
          type="file"
          multiple={true}
          className="hidden sr-only"
          accept="application/pdf,application/vnd.ms-excel"
          onChange={(e) => handleFileChange(e)}
        />
        <span className="hidden sr-only">resource upload</span>
        <div
          className={cn(
            "flex w-full flex-col gap-2 items-center justify-center text-neutral-500",
          )}
        >
          <Upload className={cn("w-12 h-12 text-blue-500 mx-auto")} />
          <div className="font-semibold">Attach File or Photo</div>
          <div className={cn("text-xs")}>Click here to upload file</div>
        </div>
      </label>
    </div>
  );
}
