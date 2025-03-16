import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseURL } from "../api";
import { FiSearch, FiLogOut, FiChevronDown } from 'react-icons/fi';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  if (isLoading) {
    return (
      <nav className="flex items-center justify-between px-6 py-4 bg-blue-600 text-white">
        <div className="animate-pulse w-full flex justify-between">
          <div className="h-8 w-20 bg-blue-400 rounded"></div>
          <div className="h-8 w-32 bg-blue-400 rounded"></div>
        </div>
      </nav>
    );
  }


  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="flex items-center gap-8">
        <Link 
          to="/" 
          className="text-2xl font-bold hover:text-blue-200 transition-colors"
        >
          LMS
        </Link>
        <form 
          onSubmit={handleSearch} 
          className="relative"
        >
          <input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 pr-12 rounded-full text-gray-800 w-72 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-500 transition-all hover:shadow-md"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <FiSearch className="w-5 h-5" />
          </button>
        </form>
      </div>
  
      <div>
        {user ? (
          <div className="flex items-center gap-4" ref={menuRef}>
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 hover:bg-blue-700/50 p-2 rounded-lg transition-all hover:shadow-md"
              >
                {user.photo ? (
                  <img
                    src={user.photo}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-white/80 shadow-md"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center border-2 border-white/80 shadow-md text-lg font-semibold">
                    {user.username?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="font-semibold">{user.username}</span>
                <FiChevronDown 
                  className={`w-4 h-4 transition-transform duration-200 ${
                    showProfileMenu ? "rotate-180" : ""
                  }`}
                />
              </button>
  
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 text-gray-800 z-50 border border-gray-100">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-gray-50 transition-colors"
                  >
                    <FiLogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link
              to="/login"
              className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg transition-all hover:shadow-md font-medium"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-gray-700 hover:bg-gray-800 px-6 py-2 rounded-lg transition-all hover:shadow-md font-medium"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </nav>
  );

};

export default Navbar;