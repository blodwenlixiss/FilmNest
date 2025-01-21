import React from "react";
import { NavLink } from "react-router-dom";

const Card: React.FC<{
  imageSrc: string;
  vote: number;
  releaseDate: string;
  overview: string;
  title: string;
  id: string;
  type: string;
}> = ({ imageSrc, vote, releaseDate, overview, title, id, type }) => {
  return (
    <div className="w-[280px] bg-inherit  rounded-lg shadow-xl overflow-hidden relative">
      <div className="relative">
        <img
          className="w-full h-64 object-cover object-top"
          src={imageSrc}
          alt={title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
        <div className="absolute top-4 left-4">
          <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
            IMDB: {Math.trunc(vote * 10) / 10}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-1">{title}</h2>
        <p className="text-sm text-gray-400">{releaseDate}</p>
        <p className="text-sm text-gray-400 mb-10">
          {overview.substring(0, 80)}...
        </p>
        <div className="">
          <NavLink
            to={`/${type}/${id}`}
            className="absolute bottom-3 right-2 bg-red-600 text-sm py-2 px-4 rounded-lg hover:text-white hover:bg-red-500 transition"
          >
            View More
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Card;
