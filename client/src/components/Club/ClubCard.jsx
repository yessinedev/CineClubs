import { Users } from 'lucide-react';
import React from "react";
import { Link } from "react-router-dom";

export const ClubCard = ({club}) => {
  return (
    <div
      key={club.id}
      className="overflow-hidden transition-all duration-300 bg-gray-900 border border-gray-800 rounded-xl hover:border-blue-500/50 group"
    >
      <div className="relative h-36 sm:h-48 overflow-hidden">
        <img
          src={club.imageUrl}
          alt={club.name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>
      <div className="p-4 sm:p-6">
        <h3 className="mb-2 text-lg sm:text-xl font-semibold text-white">{club.name}</h3>
        <p className="mb-4 text-sm sm:text-base text-gray-400">{club.description}</p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          <span className="flex items-center text-sm sm:text-base text-gray-300">
            <Users className="w-4 h-4 mr-1" />
            {club.membersCount} members
          </span>
          <Link
            to={`/clubs/${club.id}`}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-blue-500 hover:bg-blue-600 text-white rounded-xl flex items-center justify-center sm:justify-start gap-2 transition-colors"
          >
            View Community
          </Link>
        </div>
      </div>
    </div>
  );
};

