import HomeNav from "@/components/HomeNav";
import NavBar from "@/components/NavBar";

export const metadata = {
  title: "Home",
  description: "Home page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      {/* <Footer /> */}
    </div>
  );
}
