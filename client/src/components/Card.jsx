import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiCalendar } from 'react-icons/fi';

const Card = ({ id, title, photo, author, year }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/book/${id}`)} 
      className="bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 cursor-pointer group"
    >
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={photo} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center space-x-2 text-white">
            <FiCalendar className="w-4 h-4" />
            <span className="text-sm">{year}</span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white">
        <h3 className="font-semibold text-gray-900 line-clamp-1 mb-1">
          {title}
        </h3>
        
        <div className="flex items-center text-gray-600 space-x-2">
          <FiUser className="w-4 h-4" />
          <span className="text-sm line-clamp-1">{author}</span>
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="h-1 w-12 bg-blue-500 group-hover:w-full transition-all duration-300" />
      </div>
    </div>
  );
};

export default Card;