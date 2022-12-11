import React, { useState } from 'react'
import { SwiperSlide, Swiper } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper'
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from 'swiper';
export const ImageSwiper = (props: any) => {
    // const {images}  = props;
    const images = [
        {
            id: 1,
            //random image link
            url: "https://source.unsplash.com/random/200x200?sig=1"
        },
        {
            id: 2,
            url: "https://source.unsplash.com/random/200x200?sig=2"

        },
        {
            id: 3,
            url: "https://source.unsplash.com/random/200x200?sig=3"

        },
        {
            id: 4,
            url: "https://source.unsplash.com/random/200x200?sig=4"

        },
        {
            id: 5,
            url: "https://source.unsplash.com/random/200x200?sig=5"
        },
    ]

    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    return (
        <>
            <Swiper
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[FreeMode, Thumbs]}
                className="mySwiper2 rounded-lg h-96"
            >
                {images.map((image: any) => (
                    <SwiperSlide key={image.id}>
                        <img className=' w-full h-full' src={image.url
                        } alt="" />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                spaceBetween={5}
                onSwiper={setThumbsSwiper}
                slidesPerView={4}
                // freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper rounded-lg py-2 h-24"
            >
                {images.map((image: any) => (
                    <SwiperSlide  key={image.id}>
                        <img  className='rounded-lg' src={image.url
                        } alt="" />
                    </SwiperSlide>
                ))}
            </Swiper>

        </>
    )
}
