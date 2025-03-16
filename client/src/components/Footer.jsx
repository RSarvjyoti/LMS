import React from 'react';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { MdLocationOn, MdEmail, MdPhone } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Library Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Library Management</h3>
            <p className="text-sm text-gray-400">
              Your comprehensive solution for managing library resources, books, and member services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400 transition-colors">
                <FaFacebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <FaTwitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/books" className="text-gray-400 hover:text-white transition-colors">Books Catalog</a>
              </li>
              <li>
                <a href="/members" className="text-gray-400 hover:text-white transition-colors">Member Area</a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2">
                <MdLocationOn className="w-5 h-5" />
                <span>123 Library Street, City, Country</span>
              </li>
              <li className="flex items-center space-x-2">
                <MdEmail className="w-5 h-5" />
                <span>contact@library.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MdPhone className="w-5 h-5" />
                <span>+1 234 567 890</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Library Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;