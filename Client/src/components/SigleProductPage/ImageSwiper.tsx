import React, { useState } from 'react'
import { SwiperSlide, Swiper } from 'swiper/react';
import { Mousewheel, Swiper as SwiperType } from 'swiper'
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from 'swiper';
export const ImageSwiper = (props: any) => {
    const { Image } = props
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    return (
        <>
            <Swiper
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[FreeMode, Thumbs]}
                className="mySwiper2 rounded-lg h-96"
            >
                {Image?.map((image: any) => (
                    <SwiperSlide key={image.id}>
                        <img className=' w-full h-full' src={image} alt="" />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                spaceBetween={5}
                onSwiper={setThumbsSwiper}
                slidesPerView={4}
                // freeMode={true}
                mousewheel={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs,Mousewheel]}
                className="mySwiper rounded-lg py-2 h-24"
            >
                {Image?.map((image: any) => (
                    <SwiperSlide  key={image.id}>
                        <img  className='rounded-lg' src={image
                        } alt="" />
                    </SwiperSlide>
                ))}
            </Swiper>

        </>
    )
}
