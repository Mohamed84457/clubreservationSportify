// components
import WesiteNav from "../components/websiteNav";
export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-6xl mx-auto">
      {/* nav */}
      <nav className="sticky top-0 z-50">
        <WesiteNav />
      </nav>
      {/* main */}
      <main>{children}</main>
    </div>
  );
}
