/** @format */
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { BookCover } from "book-cover-3d";
import { setBooksOfTheWeek } from "@/store/booksSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  Mousewheel,
} from "swiper/modules";

const BookSlides = ({ Callback }: any) => {
  const books = useSelector((state: any) => state.books.booksOfTheWeek);
  const dispatch = useDispatch();
  const [hold, setHold] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await (await fetch("./api/fetchBooks")).json();
      dispatch(setBooksOfTheWeek(data));
    };
    fetchBooks();
  }, []);

  return (
    <Swiper
      style={{
        maxWidth: "1400px",
        maxHeight: "600px",
        cursor: hold ? "grabbing" : "grab",
        paddingBlock: "40px",
      }}
      modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y, Mousewheel]}
      autoplay
      slidesPerView={5}
      navigation
      loop={books?.length > 0 ? true : false}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiperInstance) => Callback(swiperInstance)}
      onTouchStart={() => setHold(true)}
      onTouchEnd={() => setHold(false)}
    >
      {books?.length === 0
        ? Array.from({ length: 5 }).map((_, i) => (
            <SwiperSlide
              key={i}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: "30px",
              }}
            >
              <Image
                priority={true}
                width={200}
                height={300}
                src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
                alt="Book Cover"
              />
            </SwiperSlide>
          ))
        : books.map((book: any, index: number) => (
            <SwiperSlide
              key={book.cover_edition_key}
              id={`slide-${index}`}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: "30px",
              }}
              onClick={() =>
                window.open(
                  `https://openlibrary.org/books/${book.cover_edition_key}/`
                )
              }
            >
              <BookCover
                width={200}
                height={300}
                rotate={25}
                transitionDuration={0.3}
                thickness={
                  book.number_of_pages_median < 1000
                    ? book.number_of_pages_median / 10
                    : 2000
                }
              >
                <Image
                  priority={true}
                  width={200}
                  height={300}
                  src={`https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg`}
                  alt="Book Cover"
                />
              </BookCover>
            </SwiperSlide>
          ))}
    </Swiper>
  );
};

export default BookSlides;
