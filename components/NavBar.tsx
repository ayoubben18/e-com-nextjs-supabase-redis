import HomeIconComponent from "./SmallerComponents/HomeIconComponent";
import NotificationsDropdown from "./SmallerComponents/NotificationsDropdown";
import ProfileDropDown from "./SmallerComponents/ProfileDropDown";
import SheetCard from "./SmallerComponents/SheetCard";

import { getUser } from "@/db/data/users.data";
import { createClient } from "@/utils/supabase/server";
import RouterButton from "./SmallerComponents/RouterButton";

export default async function NavBar() {
  const supabase = createClient();

  const user = await getUser(supabase);

  return (
    <header className="flex h-20 w-full shrink-0 items-center bg-white px-4 shadow dark:bg-gray-950 md:px-6">
      <HomeIconComponent />
      {/* <SearchRedirect /> */}
      {user ? (
        <div className="ml-auto flex items-center gap-2">
          {/* <ThemeToggle /> */}
          <ProfileDropDown />
          <NotificationsDropdown />
          <SheetCard />
        </div>
      ) : (
        <div className="ml-auto">
          <RouterButton route="/login" label="Login" />
        </div>
      )}
    </header>
  );
}
