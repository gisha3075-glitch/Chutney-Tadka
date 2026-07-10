import { Link } from 'react-router-dom';
import { UtensilsCrossed, Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-brand-500 flex items-center justify-center">
                <span className="text-white font-extrabold text-lg">K</span>
              </div>
              <span className="text-xl font-extrabold text-white">Chutney&amp;Tadka</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Discover the best food & drinks, delivered to your door or enjoyed dining out.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-brand-500 transition-colors" aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-brand-500 transition-colors" aria-label="Twitter">
                <Twitter size={16} />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-brand-500 transition-colors" aria-label="Facebook">
                <Facebook size={16} />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-brand-500 transition-colors" aria-label="LinkedIn">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4">Company</h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-brand-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Team</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Chutney&amp;Tadka Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-sm mb-4">For Restaurants</h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-brand-400 transition-colors">Partner With Us</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Apps For You</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Business App</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-sm mb-4">Learn More</h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-brand-400 transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Help & Support</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-500">© 2026 Chutney&amp;Tadka. All rights reserved.</p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <UtensilsCrossed size={14} />
            <span>Made with love for foodies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
