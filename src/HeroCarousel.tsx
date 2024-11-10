import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "./Header";
import useScrollToHash from "./useScrollToHash";
import { db } from "./firestore";
import { collection, getDocs } from "firebase/firestore";

export const HeroCarousel: React.FC = () => {
  useScrollToHash();
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchCarouselImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "carousel"));
        const urls: string[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data && Array.isArray(data.urls)) {
            urls.push(...data.urls);
          }
        });
        setImages(urls);
      } catch (error) {
        setImages(["/keys1.jpg", "/keys2.jpg", "/keys3.jpg"]);
        console.error("Error fetching carousel images: ", error);
      }
    };

    fetchCarouselImages();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    cssEase: "linear",
    pauseOnHover: true,
    arrows: false,
  };

  return (
    <div className="carousel-container">
      <header>
        <Header />
      </header>
      <Slider {...settings}>
        {images.length > 0 ? (
          images.map((src, index) => (
            <div key={index}>
              <img
                src={src}
                alt={`Slide ${index}`}
                style={{ width: "100%", height: "50vh", objectFit: "cover" }}
              />
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </Slider>
    </div>
  );
};

export default HeroCarousel;
