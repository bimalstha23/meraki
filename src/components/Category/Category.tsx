import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel, Navigation, Pagination } from 'swiper';
import "swiper/css";
import "swiper/css/navigation";
export const Category = () => {
    return (
        <div className='flex flex-col px-28 mt-12'>
            <div className='flex flex-col gap-2 justify-center items-center'>
                <h1 className='text-4xl font-bold '>Category</h1>
                <p className='text-gray-500 text-lg'>Find The Product by Category</p>
            </div>
            <div className='mt-4'>

            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                navigation={true}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                modules={[Pagination]}
                className="h-60"
                >
                <SwiperSlide>Slide 1</SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 5</SwiperSlide>
                <SwiperSlide>Slide 6</SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
                <SwiperSlide>Slide 9</SwiperSlide>
            </Swiper>
                </div>

        </div>
    )
}
