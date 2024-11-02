import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "./Header";
import useScrollToHash from "./useScrollToHash";

const images = ["/3-keys1.jpg", "/3-keys2.jpg", "/3-keys3.jpg"];

export const HeroCarousel = () => {
  useScrollToHash();
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
  };

  return (
    <div className="carousel-container">
      <header>
        <Header />
      </header>
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`Slide ${index}`}
              style={{ width: "100%", height: "50vh", objectFit: "cover" }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};
