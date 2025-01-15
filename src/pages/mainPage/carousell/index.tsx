import { getRandomMovie } from "@/api/movieList";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Movie } from "../mainPageTypes/movie.types";
import { NavLink } from "react-router-dom";

const CarouselBlock = () => {
  const [carouselItem, setCarouselItem] = useState<Movie[]>([]);
  const { data } = useQuery({
    queryKey: ["fetchRandomMovies"],
    queryFn: async () => await getRandomMovie(),
  });

  useEffect(() => {
    if (data?.results?.length > 0) {
      const movies = data.results;
      setCarouselItem(movies.slice(0, 10));
    }
  }, [data]);

  return (
    <div className="relative max-w-full mx-auto border-b-2">
      <Carousel className="relative max-h-[400px] overflow-hidden rounded-lg ">
        <CarouselContent className="flex p-4">
          {carouselItem?.map((movie) => (
            <CarouselItem
              key={movie.id}
              className="rounded-lg flex-none h-full"
            >
              <NavLink to={`movies/${movie.id}`}>
                <div className="group relative w-full h-[300px] flex items-center justify-center">
                  <img
                    className="rounded-lg object-contain h-full max-h-full w-auto hover:"
                    src={
                      import.meta.env.VITE_BASE_IMAGE_URL + movie.poster_path
                    }
                    alt={movie.title}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
                    <span className="text-white text-lg font-semibold">
                      View Details
                    </span>
                  </div>
                </div>
              </NavLink>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black text-white rounded-full p-2">
          &#x2039;
        </CarouselPrevious>
        <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black text-white rounded-full p-2">
          &#x203A;
        </CarouselNext>
      </Carousel>
    </div>
  );
};

export default CarouselBlock;
