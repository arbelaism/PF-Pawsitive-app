import React from 'react';
import Image from 'next/image'
import pretitleImg from '../../public/img/hero/pretitle-img-green.svg'
import Link from 'next/link'

const Hero = () => {
  return (
    <section className='bg-pwgreen-100 lg:bg-hero lg:bg-cover lg:bg-no-repeat h-max lg:h-screen'>
      <div className='container mx-auto flex justify-start items-center min-h-[400px] lg:h-full'>
        <div className='lg:max-w-[650px] text-left mx-auto lg:mx-0'>
          <div className='hidden xl:flex mb-6 ml-5'>
            <Image
            src={pretitleImg}
            className='h-auto w-full'
            alt=''
            />
          </div>
          <h1 className='font-Rubik text-5xl lg:text-7xl 2xl:text-8xl uppercase font-bold -tracking-[0.05em] mb-10'>Un primer<br /> <span className='text-pwgreen-500 font-normal'>acercamiento de la mascota</span> <br /> al bienestar</h1>
          <Link href={'/adoptions'}>
            <button className='h-[62px] flex justify-center items-center py-3 px-8 rounded-full text-[20px] transition-all bg-pwgreen-300 text-pwgreen-50 hover:bg-pwgreen-500 mx-auto lg:mx-0'>Ver mas</button>
          </Link>
        </div>
      </div>
    </section>
    );
};

export default Hero;
