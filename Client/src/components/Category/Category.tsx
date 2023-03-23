import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel, Pagination, Scrollbar } from 'swiper';
import { useQuery } from '@tanstack/react-query'
import "swiper/css";
import { useGetCategoriesQuery } from '../../Redux/Api/Api'
import "swiper/css/pagination";
import { CategoryCard } from './CategoryCard'
import { fetchCategories } from '../API/fetchCategory';
export const Category = () => {
    const { data, error, isLoading } = useGetCategoriesQuery();


    return (
        <div className='flex flex-col px-28 mt-10'>
            <div className='flex flex-col  justify-center items-center'>
                <h1 className='text-2xl font-bold'>Category</h1>
                <p className='text-gray-500 text-sm'>Find The Product by Category</p>
            </div>
            <div className='mt-4'>

                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    pagination={true}
                    mousewheel={true}
                    modules={[Pagination, Mousewheel]}
                    className="mySwiper h-72"
                >
                    {isLoading ? <h1>loading</h1> : data?.category?.map((category: any) => (
                        <SwiperSlide key={category.id}>
                            <CategoryCard category={category} />
                        </SwiperSlide>

                    ))}
                </Swiper>
            </div>

        </div>
    )
}
