import React from 'react';
import Image from 'next/image'
import {Swiper, SwiperSlide} from 'swiper/react'
import { Navigation } from 'swiper';
import 'swiper/css/navigation'
import 'swiper/css' 
import Service1Icon from 'public/img/services/service-icon1.svg'
import Service2Icon from 'public/img/services/service-icon2.svg'
import Service3Icon from 'public/img/services/service-icon3.svg'

const services = [
  {
    image: Service1Icon,
    name: 'Veterinario',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    btnText: 'explore'
  },
  {
    image: Service2Icon,
    name: 'Haircuts',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    btnText: 'explore'
  },
  {
    image: Service3Icon,
    name: 'Ropa',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    btnText: 'explore'
  }
]

const ServiceSlider = () => {
  return (
    <Swiper 
    slidesPerView={1} 
    spaceBetween={30} 
    navigation={true} 
    modules={[Navigation]} 
    breakpoints={{
      768:{
        slidesPerView: 2
      },
    }}
    className='serviceSlider min-h-[680px] font-Rubik'>
      {services.map((service, index)=>{
        return (<>
          <SwiperSlide key={index}
          className='border border-pwgreen-500/20 bg-pwpurple-50 mi-h-[560px] rounded-[66px] py-16 px-8'>
            <Image
            src={service.image}
            className='mb-9'
            />
            <div className='text-[26px] font-medium mb-4'>{service.name}</div>
            <div className='text-[20px] mb-8'>{service.description}</div>
            <button className='capitalize h-[62px] flex justify-center items-center py-3 px-8 rounded-full text-[20px] transition-all bg-pwgreen-200 text-white hover:bg-pwgreen-500'>{service.btnText}</button>
          </SwiperSlide>
        </>)
      })}
    </Swiper>
  )
};

export default ServiceSlider;
