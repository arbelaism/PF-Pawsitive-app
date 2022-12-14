import React from 'react';
import Image from 'next/image';
import Link from 'next/link'
import DogImg from 'public/img/newsletter/dog.png'

const Newsletter = () => {
  return (
    <section>
      <div className='h-[800px] flex flex-col flex-1 lg:h-[324px] lg:flex-row'>
        <div className='bg-newsletterOrange bg-center bg-cover bg-no-repeat flex-1 flex flex-col justify-center items-center px-8 lg:px-0 h-full'>
          <div className='font-Rubik'>
            <h2 className='text-[46px] font-medium text-center leading-tight mb-12'>¿Necesitas ayuda?<br /> Contacta con Nosotros</h2>
            <div className='flex text-center mx-auto justify-center'>
              <Link href={'/contact'}>
                <a className='h-[62px] flex justify-center items-center py-3 px-8 rounded-full text-[20px] transition-all bg-pwgreen-200 text-white hover:bg-pwgreen-500 mx-auto lg:mx-0'>Contacto</a>
              </Link>
            </div>
          </div>
        </div>
        <div className='bg-newsletterYellow bg-center bg-cover bg-no-repeat flex-1 flex justify-center items-end h-full'>
          <Image
          src={DogImg}
          alt=''
          />
        </div>
      </div>
    </section>
  )
};

export default Newsletter;
