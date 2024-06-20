import { Database } from "@/types/database.types";
import { Session, SupabaseClient } from "@supabase/supabase-js";
import { toast } from "sonner";
import * as tus from "tus-js-client";

export async function uploadFile(
  supabase: SupabaseClient<Database>,
  file: File,
  sessionData: Session,
) {
  return new Promise((resolve, reject) => {
    const upload = new tus.Upload(file, {
      endpoint:
        `https://abjtqzgnrtsikkqgnqeg.supabase.co/storage/v1/upload/resumable`,
      retryDelays: [0, 3000, 5000],
      headers: {
        authorization: `Bearer ${sessionData?.access_token}`,
      },
      uploadDataDuringCreation: true,
      metadata: {
        bucketName: "UploadedCVs",
        objectName: filePath,
        contentType: file.type,
        cacheControl: "3600",
      },
      chunkSize: 6 * 1024 * 1024, // NOTE: it must be set to 6MB (for now) do not change it
      onError: function (error) {
        toast.error("Upload failed: " + error);
      },
      //   onProgress: function (bytesUploaded, bytesTotal) {
      //     const percentage = Number(
      //       ((bytesUploaded / bytesTotal) * 100).toFixed(2),
      //     );
      //     updateUploadStatus(file.name, Status.Uploading);
      //     percentage > 0 && updateUploadProgress(file.name, percentage);

      //     // Mock the abort state
      //     // This block of code has a 50% chance of executing
      //     // if (percentage > 50) {
      //     //   updateUploadStatus(file.name, Status.Error) // Update status to error
      //     //   upload.abort() // Stop the upload process
      //     //   reject("Mock reject") // Reject the promise to simulate an error
      //     // }
      //   },
      onSuccess: async function () {
        const objectId = await getObjectIdByFilePath(supabase, filePath);
        resolve(objectId as string);
      },
    });

    // Check if there are any previous uploads to continue.
    return upload.findPreviousUploads().then(function (previousUploads) {
      // Found previous uploads so we select the first one.
      if (previousUploads.length) {
        upload.resumeFromPreviousUpload(previousUploads[0]);
      }

      // Start the upload
      upload.start();
    });
  });
}
