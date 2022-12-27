import Link from 'next/link'
import Image from 'next/image'
import NotFound from 'public/img/404/dogs-cats-pw.png'

const FourOhFour = () => {
    return (
        <div className="h-screen w-full">
            <div className="relative flex flex-col justify-center items-center w-full h-2/4 bg-white">
                <div className="w-2/4 absolute -bottom-[1.3rem] md:-bottom-[2.8rem] lg:-bottom-[3.4rem] xl:-bottom-[4rem] 2xl:-bottom-[5.6rem]">
                    <Image
                        src={NotFound}
                        alt="not found"
                        layout="responsive"
                        objectFit="contain"
                        objectPosition="fixed"
                    />
                </div>
            </div>
            <div className="flex flex-col items-center h-2/4 gap-2 border-t border-t-pwgreen-400 bg-pwgreen-100">
                <div className="flex flex-col items-center justify-center z-20">
                    <h1 className="title font-extrabold text-2xl lg:text-5xl z-20 mt-10">
                        Oops! 404 Error.
                    </h1>
                    <p className="lg:text-lg">Esta página no existe.</p>
                </div>
                <Link href={'/'}>
                    <a className="underline text-pwgreen-600 hover:text-pwgreen-800 transition-all">
                        Volver a Inicio
                    </a>
                </Link>
            </div>
        </div>
    )
}

export default FourOhFour
