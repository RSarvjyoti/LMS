import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { MdLocationOn, MdEmail, MdPhone, MdAccessTime } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">LMS</h3>
            <p className="text-gray-400 leading-relaxed">
              Your comprehensive digital library solution. Discover, manage, and explore our vast collection of books.
            </p>
            <div className="flex space-x-4">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub].map((Icon, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="hover:text-blue-400 transform hover:scale-110 transition-all"
                  aria-label={`Social media link ${index + 1}`}
                >
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Books', 'Categories', 'About Us', 'Contact'].map((item, index) => (
                <li key={index}>
                  <Link 
                    to={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2 group"
                  >
                    <span className="w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Contact Us</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start space-x-3 group">
                <MdLocationOn className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors mt-1" />
                <span className="flex-1">123 Library Street, Book Valley, Reading City, 12345</span>
              </li>
              <li className="flex items-center space-x-3 group">
                <MdEmail className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
                <a href="mailto:contact@bookhub.com" className="hover:text-white transition-colors">
                  contact@bookhub.com
                </a>
              </li>
              <li className="flex items-center space-x-3 group">
                <MdPhone className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
                <a href="tel:+1234567890" className="hover:text-white transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Opening Hours</h3>
            <ul className="space-y-4 text-gray-400">
              {[
                { day: 'Monday - Friday', hours: '9:00 AM - 8:00 PM' },
                { day: 'Saturday', hours: '10:00 AM - 6:00 PM' },
                { day: 'Sunday', hours: 'Closed' }
              ].map((schedule, index) => (
                <li key={index} className="flex items-start space-x-3 group">
                  <MdAccessTime className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors mt-1" />
                  <div>
                    <p className="font-medium text-gray-300">{schedule.day}</p>
                    <p>{schedule.hours}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} BookHub. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="#" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;