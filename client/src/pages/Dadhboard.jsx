import React, { useEffect, useState } from "react";
import axios from "axios";
import { BaseURL } from "../api";
import { FiUsers, FiBook, FiTrash2, FiHome } from 'react-icons/fi';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token"); 
  const isAdmin = user?.role === "admin";
  
  const axiosInstance = axios.create({
    baseURL: BaseURL,
    headers: { Authorization: `Bearer ${token}` }, 
  });

  const fetchUsers = async () => {
    if (!isAdmin) return;
    try {
      const res = await axiosInstance.get("/users/get-all-users");
      setUsers(res.data);
      setTotalUsers(res.data.length);
    } catch (error) {
      console.error("Error fetching users:", error.response?.data || error.message);
    }
  };

  const fetchBooks = async () => {
    try {
      const res = await axiosInstance.get("/books/get");
      setBooks(res.data);
      setTotalBooks(res.data.length);
    } catch (error) {
      console.error("Error fetching books:", error.response?.data || error.message);
    }
  };

  const deleteBook = async (id) => {
    if (!isAdmin) return;
    try {
      await axiosInstance.delete(`/books/delete-book/${id}`);
      alert("Book deleted successfully!");
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchBooks();
    if (isAdmin) fetchUsers();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Library System</h2>
          <nav className="space-y-2">
            <a href="/dashboard" className="flex items-center gap-2 px-4 py-2 text-blue-600 bg-blue-50 rounded-lg">
              <FiHome className="w-5 h-5" />
              Dashboard
            </a>
            <a href="/books" className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <FiBook className="w-5 h-5" />
              Books
            </a>
            {isAdmin && (
              <a href="/users" className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                <FiUsers className="w-5 h-5" />
                Users
              </a>
            )}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-8 px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-6">
            <img 
              src={user?.photo || 'https://via.placeholder.com/50'} 
              alt="User Profile" 
              className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-500 ring-offset-2" 
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-gray-600">Welcome, {user?.username} ({user?.role})</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FiUsers className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600">Total Users</p>
                <h3 className="text-2xl font-bold text-gray-800">{totalUsers}</h3>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <FiBook className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-600">Total Books</p>
                <h3 className="text-2xl font-bold text-gray-800">{totalBooks}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Users List */}
        {isAdmin && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Users List</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img 
                          src={user.photo || 'https://via.placeholder.com/40'} 
                          alt={user.username}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.username}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Books List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Books List</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cover</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                  {isAdmin && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {books.map((book) => (
                  <tr key={book._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img 
                        src={book.photo || 'https://via.placeholder.com/40'} 
                        alt={book.title}
                        className="w-16 h-20 object-cover rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{book.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{book.author}</td>
                    {isAdmin && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button 
                          onClick={() => deleteBook(book._id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;