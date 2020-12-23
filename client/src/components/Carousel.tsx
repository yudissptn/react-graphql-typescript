import React from "react";
import SwiperCore, { Navigation, Pagination, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

// install Swiper components
SwiperCore.use([Navigation, Pagination, A11y, Autoplay]);

export const Carousel: React.FC = () => {
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={1}
      navigation
      autoplay
      centeredSlides={true}
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      <SwiperSlide>
        <Image
          src={"/images/assets/hero1.jpg"}
          alt="hero1"
          width={1200}
          height={700}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={"/images/assets/hero2.jpg"}
          alt="hero2"
          width={1200}
          height={700}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={"/images/assets/hero3.jpg"}
          alt="hero3"
          width={1200}
          height={700}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={"/images/assets/hero4.jpg"}
          alt="hero4"
          width={1200}
          height={700}
        />
      </SwiperSlide>
    </Swiper>
  );
};
