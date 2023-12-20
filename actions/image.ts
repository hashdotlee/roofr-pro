"use server";
import { ComposeJobDTO } from "@/dtos/compose-job.dto";
import { UTApi } from "uploadthing/server";
import { updateJob } from "./job";

const utapi = new UTApi();

export async function uploadFiles({
  jobId,
  oldFilesData,
  newFilesData,
}: {
  jobId: ComposeJobDTO["_id"];
  oldFilesData: string[];
  newFilesData: FormData;
}) {
  const files = newFilesData.getAll("files");
  try {
    const cloudResp = await utapi.uploadFiles(files);
    if (cloudResp.some((res) => res.error !== null)) {
      throw {
        message: "Some files failed to upload!",
      };
    }

    const uploadedUrls: string[] = cloudResp
      .map((res) => res.data?.url)
      .filter((url) => url !== undefined) as string[];

    const jobResp = await updateJob(jobId, {
      attachments: [...oldFilesData, ...uploadedUrls],
    });
    if (!jobResp.ok) {
      throw {
        message: "Some files failed to save!",
      };
    }

    return {
      ok: true,
      data: [...oldFilesData, ...uploadedUrls],
      message: "Saved images successfully!",
    };
  } catch (error: any) {
    console.error(error);
    return {
      ok: false,
      error: error?.message,
      message: "Something went wrong!",
    };
  }
}

export async function deleteFiles({ deletedUrls }: { deletedUrls: string[] }) {
  const keys = deletedUrls
    .map((url) => url.split("/").pop())
    .filter((url) => url !== undefined) as string[];
  try {
    const res = await utapi.deleteFiles(keys);
    if (res.success) {
      return {
        ok: true,
        message: "Deleted images successfully!",
      };
    } else {
      throw {
        message: "Some files failed to delete!",
      };
    }
  } catch (error: any) {
    console.error(error);
    return {
      ok: false,
      error: error?.message,
      message: "Something went wrong!",
    };
  }
}
