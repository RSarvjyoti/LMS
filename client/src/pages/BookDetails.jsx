import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BaseURL } from "../api";

const BookDetails = () => {
  const { id } = useParams(); 
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${BaseURL}/books/get/${id}`);
      setData(res.data);
      setError(false);
    } catch (err) {
      console.error("Error fetching book details:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]); 

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-red-50 rounded-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error loading book details</h2>
          <button 
            onClick={fetchData}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Book Image Section */}
          <div className="md:w-1/3 bg-gray-50 p-8">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-xl">
              <img 
                src={data.photo} 
                alt={data.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Book Details Section */}
          <div className="md:w-2/3 p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{data.title}</h1>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <span className="text-gray-600 font-medium">Author:</span>
                <span className="text-xl text-gray-800">{data.author}</span>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-gray-600 font-medium">Genre:</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                  {data.genre}
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-gray-600 font-medium">Published:</span>
                <span className="text-gray-800">{data.year}</span>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Additional Information</h3>
                <p className="text-gray-600">
                  Added to library: {new Date(data.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;