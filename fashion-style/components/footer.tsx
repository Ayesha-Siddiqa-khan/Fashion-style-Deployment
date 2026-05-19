import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";

const footerLinks = {
  shop: [
    { name: "New Arrivals", href: "/shop" },
    { name: "Best Sellers", href: "/shop" },
    { name: "Women", href: "/shop?gender=women" },
    { name: "Men", href: "/shop?gender=men" },
    { name: "Accessories", href: "/shop" },
  ],
  company: [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
    { name: "Sustainability", href: "#" },
  ],
  support: [
    { name: "Contact Us", href: "#" },
    { name: "FAQs", href: "#" },
    { name: "Shipping", href: "#" },
    { name: "Returns", href: "#" },
  ],
};

const socialLinks = [
  { 
    name: "Instagram", 
    href: "https://www.instagram.com/zeenkaar/",
    icon: Instagram 
  },
  { 
    name: "Facebook", 
    href: "https://www.facebook.com/profile.php?id=61576919996155",
    icon: Facebook 
  },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-900 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-xl md:text-2xl font-light tracking-widest text-white">
              FASHION<span className="text-amber-400">STYLE</span>
            </Link>
            <p className="mt-3 md:mt-4 text-neutral-400 text-sm leading-relaxed">
              Curating the finest fashion for the modern individual.
            </p>
          </div>

          <div>
            <h3 className="text-xs md:text-sm font-medium text-white tracking-wider uppercase mb-3 md:mb-4">
              Shop
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-neutral-400 hover:text-amber-400 text-xs md:text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs md:text-sm font-medium text-white tracking-wider uppercase mb-3 md:mb-4">
              Company
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-neutral-400 hover:text-amber-400 text-xs md:text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs md:text-sm font-medium text-white tracking-wider uppercase mb-3 md:mb-4">
              Support
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-neutral-400 hover:text-amber-400 text-xs md:text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-500 text-xs md:text-sm">
            &copy; 2026 Fashion Style. All rights reserved.
          </p>
          <div className="flex space-x-4 md:space-x-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-amber-400 transition-colors p-2"
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5 md:w-6 md:h-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}