import ProfileDropDown from "./SmallerComponents/ProfileDropDown";
import NotificationsDropdown from "./SmallerComponents/NotificationsDropdown";
import SheetCard from "./SmallerComponents/SheetCard";
import HomeIconComponent from "./SmallerComponents/HomeIconComponent";

import SearchRedirect from "./SmallerComponents/SearchRedirect";

export default function NavBar() {
  return (
    <header className="flex h-20 w-full shrink-0 items-center bg-white px-4 shadow dark:bg-gray-950 md:px-6">
      <HomeIconComponent />
      {/* <SearchRedirect /> */}
      <div className="ml-auto flex items-center gap-2">
        {/* <ThemeToggle /> */}
        <ProfileDropDown />
        <NotificationsDropdown />
        <SheetCard />
      </div>
    </header>
  );
}
