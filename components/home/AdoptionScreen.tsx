import Image from 'next/image';
import React from 'react';
import Img1 from 'public/img/adoption/img1.png'

const AdoptionScreen = () => {
  return (
    <section className='bg-adoption bg-cover bg-center bg-no-repeat min-h-[760px] py-8 flex'>
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-x-16 ">
        <div className='flex-1 mb-6 lg:mb-0'>
          <Image
          src={Img1}
          width={542}
          height={560}
          alt=''
          />
        </div>
        <div className='flex-1 text-pwgreen-50 text-center max-w-md lg:text-left lg:max-w-none'>
          <h2 className='text-[46px] font-medium leading-tight mb-6'>Haciendo que adoptar sea mas facil para todos</h2>
          <p className='mb-6 text-xl'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat voluptatum totam aspernatur eaque ad nobis quae expedita porro ex molestiae nesciunt debitis iure similique, asperiores consectetur tempore quia dicta. Consequatur!</p>
          <ul className='mb-[38px] flex flex-col gap-y-4 lg:list-disc lg:pl-4 text-xl'>
            <li>Adoptar</li>
            <li>Frozen Raw</li>
            <li>Next Day Delivery</li>
          </ul>
          <button className='h-[62px] flex justify-center items-center py-3 px-8 rounded-full text-[20px] transition-all bg-pwgreen-200 text-white hover:bg-pwgreen-500 mx-auto lg:mx-0'>Explore</button>
        </div>
      </div>
    </section>
  )
};

export default AdoptionScreen;
