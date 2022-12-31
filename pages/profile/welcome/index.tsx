import Image from 'next/image'
import IsoGreen from 'public/iso-green.svg'
import LaptopAdoptions from 'public/img/welcome/laptop-adoptions.png'
import LaptopProducts from 'public/img/welcome/laptop-products.png'
import LaptopProfile from 'public/img/welcome/laptop-profile.png'
import Head from 'next/head'
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'
import Link from 'next/link'

const Welcome = () => {
    return (
        <>
            <Head>
                <title>Bienvenido a Pawsitive</title>
                <meta name="description" content="Pawsitive welcome page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div
                id="0"
                className="w-full h-screen flex flex-col gap-3 items-center justify-around bg-pwgreen-100 text-center px-2 py-4">
                <div className="flex h-full flex-col items-center justify-center gap-5">
                    <Image
                        src={IsoGreen}
                        alt="error"
                        width={128}
                        height={128}
                    />
                    <h1 className="title font-bold text-pwgreen-900 lg:text-4xl xl:text-6xl 2xl:text-7xl">
                        ¡Te damos la bienvenida a{' '}
                        <span className="font-medium">Paw</span>
                        <span className="font-bold">sitive</span>!
                    </h1>
                </div>
                <div className="group flex items-center justify-center">
                    <a
                        href="#1"
                        className="border border-pwgreen-600 p-2 rounded-full animate-bounce group-hover:border-pwgreen-800 transition-all">
                        <FaArrowDown className="text-3xl text-pwgreen-600 group-hover:text-pwgreen-800" />
                    </a>
                </div>
            </div>
            <div
                id="1"
                className="w-full h-screen flex flex-col gap-3 items-center justify-around bg-pwgreen-100 px-10 py-2">
                <div className="group flex items-center justify-center">
                    <a
                        href="#0"
                        className="border border-pwgreen-600 p-2 rounded-full group-hover:border-pwgreen-800 transition-all">
                        <FaArrowUp className="text-3xl text-pwgreen-600 group-hover:text-pwgreen-800" />
                    </a>
                </div>
                <div className="flex flex-col lg:flex-row items-center gap-5 lg:gap-2 lg:justify-center">
                    <div className="w-full lg:w-2/4 h-max relative">
                        <Image
                            src={LaptopAdoptions}
                            alt="error"
                            className="absolute top-0 left-0 w-full object-cover object-right"
                        />
                    </div>
                    <div className="w-full lg:w-2/4 flex flex-col items-center justify-center gap-4 lg:items-start bg-white p-10 rounded-md shadow-xl">
                        <h1 className="title font-bold text-pwgreen-900 text-3xl md:text-4xl xl:text-6xl 2xl:text-7xl">
                            Adopta
                        </h1>
                        <p className="text-base text-pwgreen-900 lg:text-lg 2xl:text-xl">
                            Miles de mascotas buscan un hogar y ahora podés
                            aplicar a cualquiera de las adopciones disponibles
                            llenando una solicitud.
                        </p>
                        <Link href="/adoptions">
                            <a className="font-Rubik px-3 py-3 cursor-pointer rounded-md font-medium bg-pwgreen-700 text-sm lg:text-base uppercase text-pwgreen-50 self-center lg:self-end hover:bg-pwgreen-800 transition-all">
                                Ir a Adopciones
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="group flex items-center justify-center">
                    <a
                        href="#2"
                        className="border border-pwgreen-600 p-2 rounded-full animate-bounce group-hover:border-pwgreen-800 transition-all">
                        <FaArrowDown className="text-3xl text-pwgreen-600 group-hover:text-pwgreen-800" />
                    </a>
                </div>
            </div>
            <div
                id="2"
                className="w-full h-screen flex flex-col gap-3 items-center justify-around bg-pwgreen-100 px-10 py-2">
                <div className="group flex items-center justify-center">
                    <a
                        href="#1"
                        className="border border-pwgreen-600 p-2 rounded-full group-hover:border-pwgreen-800 transition-all">
                        <FaArrowUp className="text-3xl text-pwgreen-600 group-hover:text-pwgreen-800" />
                    </a>
                </div>
                <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-5 lg:gap-2">
                    <div className="w-full lg:w-2/4 flex flex-col items-center justify-center gap-4 lg:items-start bg-white p-10 rounded-md shadow-xl">
                        <h1 className="title font-bold text-pwgreen-900 text-3xl md:text-4xl xl:text-6xl 2xl:text-7xl">
                            PetShop
                        </h1>
                        <p className="text-base text-pwgreen-900 lg:text-lg 2xl:text-xl">
                            En nuestro PetShop vas a conseguir todo tipo de
                            productos para cubrir las necesidades de tu mascota.
                        </p>
                        <Link href="/products">
                            <a className="font-Rubik px-3 py-3 cursor-pointer rounded-md font-medium bg-pwgreen-700 text-sm lg:text-base uppercase text-pwgreen-50 self-center lg:self-end hover:bg-pwgreen-800 transition-all">
                                Ir a la tienda
                            </a>
                        </Link>
                    </div>
                    <div className="w-full lg:w-2/4 h-max">
                        <Image src={LaptopProducts} alt="error" />
                    </div>
                </div>
                <div className="group flex items-center justify-center">
                    <a
                        href="#3"
                        className="border border-pwgreen-600 p-2 rounded-full animate-bounce group-hover:border-pwgreen-800 transition-all">
                        <FaArrowDown className="text-3xl text-pwgreen-600 group-hover:text-pwgreen-800" />
                    </a>
                </div>
            </div>
            <div
                id="3"
                className="w-full h-screen flex flex-col gap-3 items-center justify-around bg-pwgreen-100 px-10 py-2">
                <div className="group flex items-center justify-center">
                    <a
                        href="#2"
                        className="border border-pwgreen-600 p-2 rounded-full group-hover:border-pwgreen-800 transition-all">
                        <FaArrowUp className="text-3xl text-pwgreen-600 group-hover:text-pwgreen-800" />
                    </a>
                </div>
                <div className="flex flex-col lg:flex-row items-center justify-center gap-5 lg:gap-2">
                    <div className="w-full lg:w-2/4 h-max">
                        <Image src={LaptopProfile} alt="error" />
                    </div>
                    <div className="w-full lg:w-2/4 flex flex-col items-center justify-center gap-4 lg:items-start bg-white p-10 rounded-md shadow-xl">
                        <h1 className="title font-bold text-pwgreen-900 text-3xl md:text-4xl xl:text-6xl 2xl:text-7xl">
                            Dashboard
                        </h1>
                        <p className="text-base text-pwgreen-900 lg:text-lg 2xl:text-xl">
                            Tenemos un Dashboard completo para que puedas
                            gestionar tu perfil, tus trámites de adopción,
                            compras y más.
                        </p>
                        <Link href="/profile">
                            <a className="font-Rubik px-3 py-3 cursor-pointer rounded-md font-medium bg-pwgreen-700 text-sm lg:text-base uppercase text-pwgreen-50 self-center lg:self-end hover:bg-pwgreen-800 transition-all">
                                Ir a mi Dashboard
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="group flex items-center justify-center"></div>
            </div>
        </>
    )
}

export default Welcome
