import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import { ShoppingCart } from 'lucide-react'
import CategoryCard from "./CategoryCard"
import { api } from '../api/client';



export default function SwipperCategory() {

    const [categoriesData, setCategoriesData] = useState([]);

    const fetchData = async () => {
        try {
            const res = await api.get('/categories')

            if (res.status === 200) {
                setCategoriesData(res.data)
            }

        } catch (error) {
            console.error(error);

        }
    }

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <section id="material1" className="section-p1">
            <h1 className='fs-1'>Chose Your Event</h1>
            <div className="container py-5">
                <Swiper
                    navigation={true}
                    modules={[Pagination, Navigation, Autoplay]}
                    className="mySwiper"
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{ clickable: true, }}
                    breakpoints={{
                        640: { slidesPerView: 2, spaceBetween: 20, },
                        768: { slidesPerView: 2, spaceBetween: 40, },
                        1024: { slidesPerView: 4, spaceBetween: 50, },
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false
                    }}
                >
                    {
                        categoriesData.map((item, index) => (
                            <SwiperSlide key={index}>
                                <CategoryCard
                                    image={item.image}
                                    title={item.name}
                                    description={item.description}
                                    link={"/products/category/" + item.id}
                                    buttonText={"Shop Now"}
                                />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </section>
    );
}
