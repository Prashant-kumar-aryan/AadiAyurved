import {
  Leaf,
  Facebook,
  Linkedin,
  Instagram,
  CreditCard,
  Smartphone,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-6 h-6 text-emerald-400" />
              <span className="text-2xl font-serif font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Ayurveda
              </span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Ancient wisdom for modern wellness. Discover the power of natural
              healing with our premium Ayurvedic products.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#products"
                  className="text-slate-300 hover:text-emerald-400 transition font-medium"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-slate-300 hover:text-emerald-400 transition font-medium"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-300 hover:text-emerald-400 transition font-medium"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-300 hover:text-emerald-400 transition font-medium"
                >
                  Shop By Diesease
                </a>
              </li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h4 className="font-bold mb-6 text-white">Payment Methods</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-300 hover:text-amber-400 transition cursor-pointer">
                <CreditCard className="w-5 h-5 text-amber-400" />
                <span className="font-medium">Credit/Debit Card</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300 hover:text-blue-400 transition cursor-pointer">
                <Smartphone className="w-5 h-5 text-blue-400" />
                <span className="font-medium">UPI & Mobile Wallets</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300 hover:text-green-400 transition cursor-pointer">
                <span className="w-5 h-5 text-green-400 font-bold">₹</span>
                <span className="font-medium">Bank Transfer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 my-8" />

        {/* Social Media */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex gap-4 mb-6 md:mb-0">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-pink-600 transition"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-blue-500 transition"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row text-center md:text-right text-sm text-slate-400 gap-4 md:gap-6">
            <p>&copy; {currentYear} Ayurveda. All rights reserved.</p>
            <div className="flex gap-4 justify-center md:justify-end">
              <a
                href="#"
                className="hover:text-emerald-400 transition font-medium"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-emerald-400 transition font-medium"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
