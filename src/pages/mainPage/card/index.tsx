import { Button } from "@/components/ui/button";
import React from "react";

const MovieCard: React.FC<{
  imageSrc: string;

  vote: number;
  releaseDate: string;
  overview: string;
  title: string;
}> = ({ imageSrc, vote, releaseDate, overview, title }) => {
  return (
    <div className="max-w-xs bg-inherit  rounded-lg shadow-xl overflow-hidden relative">
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
          <Button className="absolute bottom-3 right-2 bg-red-600 text-sm py-2 px-4 rounded-lg hover:text-white hover:bg-red-500 transition">
            View More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
