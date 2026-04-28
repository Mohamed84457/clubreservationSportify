// components
import HeaderLayout from "../components/headerlayout";
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-6xl mx-auto  ">
      {/* header */}
      <header className="sticky top-0 z-50  ">
        <HeaderLayout />
      </header>
      {/* content */}
      <main >{children}</main>
    </div>
  );
}
