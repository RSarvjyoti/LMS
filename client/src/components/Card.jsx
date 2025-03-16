import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ id, title, photo }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/book/${id}`)} className="group relative w-full max-w-[250px] cursor-pointer">
      <div className="relative h-[320px] w-full transform transition-all duration-300 group-hover:-translate-y-2">
        <div className="absolute inset-0 rounded-lg overflow-hidden">
          <img 
            src={photo} 
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute left-0 top-0 w-6 h-full bg-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent"></div>
        </div>
        <div className="absolute right-0 top-1 h-[98%] w-4 bg-white rounded-r transform -skew-y-12"></div>
        <div className="absolute bottom-0 left-4 right-4 h-6 bg-black/20 blur-lg transform translate-y-4"></div>
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800 truncate px-2">{title}</h3>
      </div>
    </div>
  );
};

export default Card;