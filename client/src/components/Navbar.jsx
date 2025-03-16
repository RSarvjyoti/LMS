import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseURL } from "../api";
import { FiLogOut, FiChevronDown, FiBook, FiPlus } from 'react-icons/fi';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${BaseURL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${BaseURL}/users/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
      setShowProfileMenu(false);
      navigate("/login");
    }
  };

  if (isLoading) {
    return (
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              <FiBook className="w-7 h-7" />
              <span>LMS</span>
            </Link>

            {user && user.role === 'admin' && (
              <Link 
                to="/add-book" 
                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full text-white font-medium transition-all transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
              >
                <FiPlus className="w-5 h-5" />
                <span>Add Book</span>
              </Link>
            )}
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-full transition-all group"
                >
                  {user.photo ? (
                    <img
                      src={user.photo}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500 ring-offset-2"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center ring-2 ring-blue-500 ring-offset-2 text-white text-lg font-semibold">
                      {user.username?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="font-medium text-gray-700 group-hover:text-blue-600">
                    {user.username}
                  </span>
                  <FiChevronDown 
                    className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                      showProfileMenu ? "rotate-180" : ""
                    }`} 
                  />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-1 text-gray-800 border border-gray-100 transform origin-top-right transition-all">
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <FiLogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="px-6 py-2 text-blue-600 font-medium hover:bg-blue-50 rounded-full transition-all"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="px-6 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;