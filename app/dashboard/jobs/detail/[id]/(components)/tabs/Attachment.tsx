"use client";

import { deleteFiles, uploadFiles } from "@/actions/image";
import { Button } from "@/components/ui/button";
import useJob from "@/hooks/useJob";
import { cn } from "@/lib/utils";
import { UploadIcon, XIcon } from "lucide-react";
import Image from "next/image";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import toast from "react-hot-toast";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_IMAGE_COUNT = 5;

const AttachmentContext = createContext<{
  savedImageUrls?: string[];
  setSavedImageUrls?: Dispatch<SetStateAction<string[]>>;
  imageFiles?: File[];
  setImageFiles?: Dispatch<SetStateAction<File[]>>;
  isSaving?: boolean;
  setIsSaving?: Dispatch<SetStateAction<boolean>>;
  hasNotSavedChanges?: boolean;
  setHasNotSavedChanges?: Dispatch<SetStateAction<boolean>>;
}>({});

export default function Attachment() {
  const { job, setJob } = useJob();
  const [savedImageUrls, setSavedImageUrls] = useState<string[]>(
    job?.attachments || [],
  );
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [hasNotSavedChanges, setHasNotSavedChanges] = useState(false);

  const onSave = async () => {
    const deletingImageUrls = job?.attachments?.filter(
      (url) => !savedImageUrls.includes(url),
    )!;

    if (
      savedImageUrls.length === job?.attachments?.length &&
      deletingImageUrls.length === 0 &&
      imageFiles.length === 0
    ) {
      toast.error("No changes to save");
      return;
    }

    try {
      setIsSaving(true);

      if (deletingImageUrls.length !== 0) {
        const deletingResp = await deleteFiles({
          deletedUrls: deletingImageUrls,
        });
        if (!deletingResp?.ok) throw { message: deletingResp.message };
      }

      const formData = new FormData();
      imageFiles.forEach((file) => formData.append("files", file));
      const savingResp = await uploadFiles({
        jobId: job?._id!,
        oldFilesData: savedImageUrls,
        newFilesData: formData,
      });
      if (!savingResp?.ok) throw { message: savingResp.message };

      toast.success(savingResp?.message);
      setHasNotSavedChanges(false);
      setJob((old) => {
        if (!old) return old;
        return { ...old, attachments: savingResp.data };
      });
      setSavedImageUrls(savingResp?.data || []);
      setImageFiles([]);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AttachmentContext.Provider
      value={{
        savedImageUrls,
        setSavedImageUrls,
        imageFiles,
        setImageFiles,
        isSaving,
        setIsSaving,
        hasNotSavedChanges,
        setHasNotSavedChanges,
      }}
    >
      <div className="flex flex-row w-full justify-between items-center">
        <p className="text-lg font-semibold leading-3 text-left">Attachments</p>

        <div className="space-x-4">
          {hasNotSavedChanges && (
            <span className="text-red-600 text-xs">
              * Changes have not been saved
            </span>
          )}
          <Button
            variant={"default"}
            className="rounded-full text-white  px-8 py-2 font-semibold text-xs bg-blue-500 hover:bg-blue-700 h-7"
            onClick={onSave}
            disabled={isSaving || !hasNotSavedChanges}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      <div className="my-4">
        <div className="grid grid-cols-4 gap-4">
          {savedImageUrls.map((file, index) => (
            <ImagePreview file={file} key={index} />
          ))}
          {imageFiles.map((file, index) => (
            <ImagePreview file={file} key={index} />
          ))}
          {imageFiles.length < MAX_IMAGE_COUNT && <UploadFile />}
        </div>
      </div>

      <div className="my-4">
        <p className="text-xs text-neutral-500 mt-2">
          Up to {MAX_IMAGE_COUNT} files, 5MB each. Only accept image file types.
        </p>
      </div>
    </AttachmentContext.Provider>
  );
}

async function doesExistInArray(array: File[], file: File) {
  const fileBuffer = await file.arrayBuffer();

  const isSameSize = async (elem: File) => {
    const elemBuffer = await elem.arrayBuffer();
    return fileBuffer.byteLength === elemBuffer.byteLength;
  };
  const res = await Promise.all(array.map((elem) => isSameSize(elem)));
  return res.includes(true);
}

function UploadFile() {
  const {
    imageFiles,
    setImageFiles,
    hasNotSavedChanges,
    setHasNotSavedChanges,
  } = useContext(AttachmentContext);

  if (!imageFiles || !setImageFiles || !setHasNotSavedChanges) return null;

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newFile = files[0];

    if (newFile.size > MAX_IMAGE_SIZE) {
      toast.error(
        "File size is too large. Please upload a file less than 5MB.",
      );
      return;
    }

    let doesExist = await doesExistInArray(imageFiles, newFile);
    if (doesExist) {
      toast.error("File already exists. Please upload a different file.");
      return;
    }

    setImageFiles((old: File[]) => [...old, ...files]);
    if (!hasNotSavedChanges) setHasNotSavedChanges(true);
  };

  return (
    <label
      htmlFor="file-upload"
      className={cn(
        "p-4 bg-white border-dashed cursor-pointer hover:bg-blue-50 flex items-center justify-center hover:border-blue-300 transition-colors duration-200 border-2 w-full rounded-lg",
        {
          "col-span-4": imageFiles.length === 0,
          "col-span-1": imageFiles.length > 0,
        },
      )}
    >
      <input
        id="file-upload"
        type="file"
        className="hidden sr-only"
        accept="image/*"
        onChange={onFileChange}
        disabled={imageFiles.length >= MAX_IMAGE_COUNT}
      />
      <div
        className={cn(
          "flex w-full flex-col gap-2 items-center justify-center text-neutral-500",
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

function ImagePreview({ file }: { file: File | string }) {
  const isUrl = typeof file === "string";
  const imageSrc = isUrl ? file : URL.createObjectURL(file);

  const { setSavedImageUrls, setImageFiles, setHasNotSavedChanges } =
    useContext(AttachmentContext);
  if (!setSavedImageUrls || !setImageFiles || !setHasNotSavedChanges)
    return null;

  return (
    <div className="relative w-full h-full">
      <Image
        src={imageSrc}
        alt="attachment"
        width={0}
        height={0}
        sizes="100vw"
        loading="lazy"
        className="w-full h-full object-cover aspect-square rounded-md"
      />
      <div className="absolute top-0 right-0">
        <button
          className="bg-gray-200 rounded-full p-1"
          onClick={() => {
            if (isUrl) {
              setSavedImageUrls((old: string[]) =>
                old.filter((_file) => file !== _file),
              );
            } else
              setImageFiles((old: File[]) =>
                old.filter((_file) => file !== _file),
              );
            setHasNotSavedChanges(true);
          }}
        >
          <XIcon className="w-4 h-4 text-red-500 font-bold" />
        </button>
      </div>
    </div>
  );
}
