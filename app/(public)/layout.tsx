import Footer from "@/components/Footer";
import HomeNav from "@/components/HomeNav";

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
      <HomeNav />
      {children}
      {/* <Footer /> */}
    </div>
  );
}
