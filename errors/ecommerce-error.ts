import { ECOMErrorEnum } from "@/enums/EcomEnum";

export class ECOMError extends Error {
  status: number;
  constructor(message: string, name: ECOMErrorEnum, status: number) {
    super(message);
    this.name = name;
    this.status = status;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ECOMError);
    }
  }
}
