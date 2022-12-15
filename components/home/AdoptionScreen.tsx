import Image from 'next/image'
import React from 'react'
import Img1 from 'public/img/adoption/img1.png'
import Link from 'next/link'

const AdoptionScreen = () => {
    return (
        <section className="bg-pwgreen-500 min-h-[760px] py-8 flex">
            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-x-16 ">
                <div className="flex-1 mb-6 lg:mb-0">
                    <Image src={Img1} width={542} height={560} alt="" />
                </div>
                <div className="flex-1 text-pwgreen-50 text-center max-w-md lg:text-left lg:max-w-none">
                    <h2 className="text-[46px] font-medium leading-tight mb-6">
                        Haciendo que adoptar sea mas facil para todos
                    </h2>
                    <p className="mb-6 text-xl">
                        Nuestra meta es hacer que más mascotas encuentren un
                        buen hogar y, que los mismos hogares sean mejores con la
                        compañia de un nuevo integrante en la familia.
                    </p>
                    <ul className="mb-[38px] flex flex-col gap-y-3 lg:list-disc lg:pl-4 text-xl">
                        <li>Rápido</li>
                        <li>Seguro</li>
                        <li>Responsable</li>
                    </ul>
                    <Link href={'/adoptions'}>
                        <button className="dashboardButton bg-pwgreen-600 text-pwgreen-50 lg:px-6">
                            Adopta!
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default AdoptionScreen
