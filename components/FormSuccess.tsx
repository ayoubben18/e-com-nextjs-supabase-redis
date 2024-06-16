import { FileWarning } from "lucide-react";

interface FormSuccessProps {
  messages?: string[];
}

function FormSuccess({ messages }: FormSuccessProps) {
  if (!messages || messages.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-x-2 rounded-md bg-green-500 p-3 text-sm text-green-50">
      <FileWarning className="h-4 w-4" />
      {messages.map((message) => (
        <>
          {message}
          <br />
        </>
      ))}
    </div>
  );
}
export default FormSuccess;
