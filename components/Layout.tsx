import React from 'react';
import { Plane, User, Phone, MapPin, Mail, LogIn } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <Plane className="h-8 w-8 text-brand-600 transform -rotate-45" />
              <span className="font-bold text-xl tracking-tight text-brand-900">
                Hamsika Travels
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-600 hover:text-brand-600 font-medium transition">Home</Link>
            <Link to="/admin" className="text-gray-600 hover:text-brand-600 font-medium transition flex items-center gap-1">
              <LogIn className="w-4 h-4" /> Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-900 text-white mt-auto no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Plane className="w-5 h-5" /> Hamsika Travels
            </h3>
            <p className="text-brand-100 text-sm">
              Your trusted partner for worldwide flight bookings. We ensure the best prices and a seamless travel experience.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-brand-100">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> 123 Travel Tower, Cyber City, India
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> +91 98765 43210
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> support@hamsikatravels.com
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-brand-100">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Support</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-brand-700 mt-8 pt-8 text-center text-sm text-brand-200">
          © {new Date().getFullYear()} Hamsika Travels. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        {children}
      </main>
      <Footer />
    </div>
  );
};
