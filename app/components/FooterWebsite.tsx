// mui icons
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";

export default function FooterWebsite() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Court Curator</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Precision in every play. The ultimate destination for premium sports
            reservations.
          </p>

          <div className="flex gap-3">
            {[
              { icon: <WhatsAppIcon />, link: "https://wa.me/+201207066028" },
              { icon: <TelegramIcon />, link: "https://t.me/muhammed_dmt" },
              {
                icon: <FacebookIcon />,
                link: "https://www.facebook.com/medowhtie.dmt",
              },
              { icon: <LocalPhoneIcon />, link: "tel:+201207066028" },
              {
                icon: <EmailIcon />,
                link: "mailto:mohamedeldamaty111@gmail.com",
              },
            ].map((item, i) => (
              <a
                key={i}
                href={item.link}
                className="p-2 bg-gray-800 rounded-full hover:bg-green-500 hover:text-white transition duration-300"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Platform */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">Platform</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <a href="/website/AboutUs" className="hover:text-white transition">
              About Us
            </a>
            <a
              href="/website/BrowseCourts"
              className="hover:text-white transition"
            >
              Browse Courts
            </a>
            <a href="/website/Support" className="hover:text-white transition">
              Support
            </a>
          </ul>
        </div>

        {/* Legal */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">Legal</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition">
              FAQ
            </a>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">
            Subscribe for latest offers
          </h3>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="bg-green-500 px-4 py-2 rounded-md text-white text-sm hover:bg-green-600 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 text-center text-sm py-4 text-gray-500">
        © {new Date().getFullYear()} Court Curator. All rights reserved.
      </div>
    </footer>
  );
}
