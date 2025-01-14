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
import { Movie } from "../movie.types";

const CarouselBlock = () => {
  const [carouselItem, setCarouselItem] = useState<Movie[]>([]);
  const { data } = useQuery({
    queryKey: ["fetchRandomMovies"],
    queryFn: async () => await getRandomMovie(),
  });

  useEffect(() => {
    if (data?.results?.length > 0) {
      const movies = data.results;
      setCarouselItem(movies.slice(0, 5));
    }
  }, [data]);

  return (
    <div className="relative max-w-full mx-auto">
      <Carousel className="relative max-h-[400px] overflow-hidden rounded-lg shadow-lg">
        <CarouselContent className="flex">
          {carouselItem?.map((movie) => (
            <CarouselItem
              key={movie.id}
              className=" rounded-lg flex-none w-full h-full bg-black"
            >
              <div className="relative w-full h-[400px] flex items-center justify-center">
                <img
                  className="object-contain h-full max-h-full w-auto"
                  src={import.meta.env.VITE_BASE_IMAGE_URL + movie.poster_path}
                  alt={movie.title}
                />
              </div>
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
