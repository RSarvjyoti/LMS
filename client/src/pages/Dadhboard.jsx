import React, { useEffect, useState } from "react";
import axios from "axios";
import { BaseURL } from "../api";
import { FiUsers, FiBook, FiTrash2 } from 'react-icons/fi';

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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
   
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

        {isAdmin && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Users List</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.username}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Books List</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
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