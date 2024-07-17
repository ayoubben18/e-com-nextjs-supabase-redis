import { PostgrestError } from "@supabase/supabase-js";
import { ECOMError } from "./ecommerce-error";
import { ECOMErrorEnum } from "@/enums/EcomEnum";
import { logger } from "@/logger/logger";

export const handleStatus = <T>(
  error: PostgrestError | null,
  status: number,
  data: T | T[],
) => {
  if (status === 200 || status === 201 || status === 204) {
    if (!data) {
      return;
    }
    if (Array.isArray(data)) {
      return data as T[];
    }
    return data as T;
  } else if (status === 404 || status === 406) {
    return null;
  } else {
    throw new ECOMError(
      error?.message || "An error occured",
      ECOMErrorEnum.DatabaseError,
      status,
    );
  }
};
