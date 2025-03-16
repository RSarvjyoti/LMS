import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from 'axios';
import { BaseURL } from "../api";
import { FiSearch, FiBook, FiFilter, FiX } from 'react-icons/fi';

const Home = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");

  const genres = ["all", "Fiction", "Non-Fiction", "Mystery", "Science Fiction", "Fantasy", "Romance"];

  const fetchData = async () => {
    try {
      const res = await axios.get(`${BaseURL}/books/get`);
      setData(res.data);
      setFilteredData(res.data);
      setError(false);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = data;
    if (searchQuery) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    

    if (selectedGenre !== "all") {
      filtered = filtered.filter(book => book.genre === selectedGenre);
    }
    
    setFilteredData(filtered);
  }, [searchQuery, selectedGenre, data]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-8 bg-white rounded-lg shadow-lg text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading books...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-8 bg-white rounded-lg shadow-lg text-center">
          <div className="text-red-500 text-5xl mb-4">
            <FiX className="mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Books</h2>
          <p className="text-gray-600 mb-6">Unable to fetch books. Please try again.</p>
          <button 
            onClick={fetchData}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center">
            <FiBook className="mr-3" />
            Book Collection
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our extensive collection of books across various genres
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12 space-y-6">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-12 py-4 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FiX />
              </button>
            )}
          </div>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <FiFilter className="text-gray-500" />
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedGenre === genre
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {genre.charAt(0).toUpperCase() + genre.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredData.length > 0 ? (
            filteredData.map((book) => (
              <Card 
                key={book._id} 
                id={book._id} 
                title={book.title} 
                photo={book.photo}
                author={book.author}
                genre={book.genre}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">
                <FiSearch className="mx-auto" />
              </div>
              <h3 className="text-xl font-medium text-gray-600 mb-2">No books found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;