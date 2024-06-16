import LoginForm from "@/components/LoginForm";
import PageWrapper from "@/components/PageWrapper";
import { getUserId } from "@/db/data/users.data";
import { unstable_noStore } from "next/cache";

const page = async () => {
  unstable_noStore();
  const user = await getUserId();

  return (
    <PageWrapper>
      <LoginForm logged={user ? true : false} />
    </PageWrapper>
  );
};

export default page;
