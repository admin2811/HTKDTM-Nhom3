/* eslint-disable react/prop-types */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'
const ClientSlider = ({clients}) => {
  return <Swiper slidesPerview={1} spaceBetween={30} 
  grabCursor ={true} Loop={true} breakpoints={{
    640 :{
      slidesPerView:1,
      spaceBetween:10,
    },
    768 :{
      slidesPerView:2,
      spaceBetween:30,
    },
    1024 :{
      slidesPerView:3,
      spaceBetween:0,
    },
    1170 :{
      slidesPerView:3,
      spaceBetween:30,
    },
  }}>
    {clients.map((client, index)=>{
      const {message, image, name, position,borderColor} = client;
      return <SwiperSlide key={index} style={{borderColor:borderColor}}
      className='border-t-[10px] rounded-t-[12px]'
      >
        {/*card*/}
        <div className='w-full mx-auto lg:max-w-[300px]
        xl:max-w-[350px] h-[250px] rounded-[12px] border border-grey
        py-6  px-[30px]'>
          {/*person mess*/}
          <div className='mb-[30px]'>{message}</div>
          {/*person name, img position */}
          <div className='flex gap-x-[10px]'>
            <img src={image}/>
            <div className='font-bold'>{name}</div>
            <div className='text-light'>{position}</div>
          </div>

        </div>
      </SwiperSlide>
    }
    )}
  </Swiper>

    
 
};

export default ClientSlider;
