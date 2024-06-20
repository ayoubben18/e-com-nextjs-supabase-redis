"use client";

import { on } from "events";
import Dropzone, { DropzoneProps } from "react-dropzone";
import { toast } from "sonner";

interface FileUploaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Value of the uploader.
   * @type File[]
   * @default undefined
   * @example value={files}
   */
  value?: File[];

  /**
   * Function to be called when the value changes.
   * @type React.Dispatch<React.SetStateAction<File[]>>
   * @default undefined
   * @example onValueChange={(files) => setFiles(files)}
   */
  onValueChange?: React.Dispatch<React.SetStateAction<File[]>>;

  /**
   * Function to be called when files are uploaded.
   * @type (files: File[]) => Promise<void>
   * @default undefined
   * @example onUpload={(files) => uploadFiles(files)}
   */
  onUpload: (files: File[]) => Promise<void>;

  /**
   * Progress of the uploaded files.
   * @type Record<string, number> | undefined
   * @default undefined
   * @example progresses={{ "file1.png": 50 }}
   */
  progresses?: Record<string, number>;

  /**
   * Accepted file types for the uploader.
   * @type { [key: string]: string[]}
   * @default
   * ```ts
   * { "image/*": [] }
   * ```
   * @example accept={["image/png", "image/jpeg"]}
   */
  accept?: DropzoneProps["accept"];

  /**
   * Maximum file size for the uploader.
   * @type number | undefined
   * @default 1024 * 1024 * 2 // 2MB
   * @example maxSize={1024 * 1024 * 2} // 2MB
   */
  maxSize?: DropzoneProps["maxSize"];

  /**
   * Maximum number of files for the uploader.
   * @type number | undefined
   * @default 1
   * @example maxFiles={5}
   */
  maxFiles?: DropzoneProps["maxFiles"];

  /**
   * Whether the uploader should accept multiple files.
   * @type boolean
   * @default false
   * @example multiple
   */
  multiple?: boolean;

  /**
   * Whether the uploader is disabled.
   * @type boolean
   * @default false
   * @example disabled
   */
  disabled?: boolean;

  //   when to shut down the component
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function FileUploadCard(props: FileUploaderProps) {
  const {
    value: valueProp,
    onValueChange,
    onUpload,
    progresses,
    setOpen,
    accept = { "image/*": [] },
    maxSize = 1024 * 1024 * 2,
    maxFiles = 1,
    multiple = false,
    disabled = false,
    className,
    ...dropzoneProps
  } = props;

  const handleUploadFiles = async (acceptedFiles: File[]) => {
    if (!multiple && maxFiles === 1 && acceptedFiles.length > 1) {
      toast.error("Cannot upload more than 1 file at a time");
      return;
    }

    // toast.promise(onUpload(acceptedFiles), {
    //   loading: "Uploading Image",
    //   success: "Image uploaded successfully",
    //   error: "Failed to upload image",
    // });

    await onUpload(acceptedFiles);
    setOpen(false);
  };

  return (
    <Dropzone
      multiple={maxFiles > 1 || multiple}
      maxFiles={maxFiles}
      maxSize={maxSize}
      accept={accept}
      onDrop={handleUploadFiles}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className="flex flex-col justify-between rounded-lg border border-dashed border-primary bg-card p-4 text-card-foreground md:p-6"
        >
          <label
            htmlFor="dropzone-file"
            className="flex h-full flex-col hover:cursor-pointer"
            onClick={(e) => e.preventDefault()}
          >
            {/* Header */}

            {/* content */}
            <div className="flex flex-col justify-between gap-1">
              <h4 className="select-none text-[0.875rem] text-card-foreground md:text-[1rem]">
                Upload a file or drag and drop here
              </h4>
              <p className="text-inactive select-none text-[0.75rem] md:text-[0.875rem]">
                Upload an Image !
              </p>
              <p className="text-inactive select-none text-[0.75rem] md:text-[0.875rem]">
                Max file size : 5MB
              </p>
            </div>
            <input
              {...getInputProps}
              type="file"
              id="dropzone-file"
              className="hidden"
            />
          </label>
        </div>
      )}
    </Dropzone>
  );
}
export default FileUploadCard;
