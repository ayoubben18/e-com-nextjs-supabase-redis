import { z } from "zod";

const cashSchema = z.object({
  name: z.string().min(5).max(255),
  email: z.string().email(),
  phoneNumber: z.string().length(10),
  address: z.string().min(5).max(255),
});

export default cashSchema;
