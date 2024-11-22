import { Users } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export const ClubCard = ({club}) => {
  return (
    <div
      key={club.id}
      className="overflow-hidden transition-all duration-300 bg-gray-900 border border-gray-800 rounded-xl hover:border-purple-500/50 group"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={club.imageUrl}
          alt={club.name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="mb-2 text-xl font-semibold text-white">{club.name}</h3>
        <p className="mb-4 text-gray-400">{club.description}</p>
        <div className="flex items-center justify-between">
          <span className="flex items-center text-gray-300">
            <Users className="w-4 h-4 mr-1" />
            {club.currentMembers} members
          </span>
          <Link
            to={`/clubs/${club.id}`}
            className="px-4 py-2 text-white transition-colors bg-purple-500 rounded-lg hover:bg-purple-600"
          >
            View Club
          </Link>
        </div>
      </div>
    </div>
  );
};
