import LoginForm from "@/components/LoginForm";
import PageWrapper from "@/components/PageWrapper";
import { getUserId } from "@/db/data/users.data";
import { createClient } from "@/utils/supabase/server";
import { unstable_noStore } from "next/cache";

const page = async () => {
  unstable_noStore();
  const supabase = createClient();
  const user = await getUserId(supabase);

  return (
    <PageWrapper>
      <LoginForm logged={user ? true : false} />
    </PageWrapper>
  );
};

export default page;
