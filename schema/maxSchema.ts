import { z } from "zod";

export const maxSchema = z.object({
  topPrice: z.string().optional(),
});
