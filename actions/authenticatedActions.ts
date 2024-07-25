import { getMappedUser } from "@/db/data/mapped-users-data";
import { getUser } from "@/db/data/users.data";
import { ECOMErrorEnum } from "@/enums/EcomEnum";
import { ECOMError } from "@/errors/ecommerce-error";
import { createClient } from "@/utils/supabase/server";
import { createSafeActionClient } from "next-safe-action";

const serverActionClient = createSafeActionClient({
  handleReturnedServerError: (e) => {
    if (e instanceof ECOMError) {
      return {
        status: e.status,
        message: e.message,
      };
    }

    return {
      status: 500,
      message: ECOMErrorEnum.InternalServerError,
    };
  },
  // throwValidationErrors: true,
});

const authenticatedAction = serverActionClient.use(async ({ next }) => {
  const supabase = createClient();
  const user = await getUser(supabase);
  if (!user) {
    throw new ECOMError("User not found", ECOMErrorEnum.UserNotFound, 404);
  }
  let name;

  if (user.user_metadata.name) {
    name = user.user_metadata.name;
  } else {
    const mappedUser = await getMappedUser(supabase, user.email!, user.id!);
    if (!mappedUser) {
      throw new ECOMError("User not found", ECOMErrorEnum.UserNotFound, 404);
    }
    name = mappedUser.name;
  }
  return next({ ctx: { userId: user.id, email: user.email, name } });
});

export { authenticatedAction, serverActionClient };
