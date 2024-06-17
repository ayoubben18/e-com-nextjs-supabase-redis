import { z } from "zod";

const commenInput = z.object({
  description: z.string().min(3),
});

export default commenInput;
