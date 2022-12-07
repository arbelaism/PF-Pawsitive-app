import { NextComponentType } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import IsoGreen from 'public/iso-green.svg'

const SignUp: NextComponentType = () => {
    return (
        <div className="p-8 flex flex-col justify-evenly items-center bg-pwgreen-100 rounded-lg md:flex-row">
            <div className="w-full flex flex-col gap-3 justify-center items-center md:w-3/6">
                <Image
                    src={IsoGreen}
                    alt="not found"
                    width={150}
                    height={150}
                />
                <h2 className="font-Rubik font-bold text-4xl lg:text-6xl">
                    ¡Registrate!
                </h2>
                <p className="text-md mb-2 md:text-xl md:text-center">
                    Registrate para acceder a todos los beneficios de{' '}
                    <span className="font-Rubik text-pwgreen-900">
                        Paw<span className="font-bold">sitive</span>
                    </span>
                </p>
            </div>
            <form className="w-full grid grid-cols-1 gap-2 items-center justify-center md:w-2/6 lg:gap-3">
                <div className="flex flex-col gap-1 items-start justify-center">
                    <label htmlFor="name" className="label">
                        Nombres
                    </label>
                    <input
                        type="text"
                        name="names"
                        placeholder="John"
                        className="input"
                    />
                </div>
                <div className="flex gap-1 flex-col items-start justify-center">
                    <label htmlFor="lastName" className="label">
                        Apellidos
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Doe"
                        className="input"
                    />
                </div>
                <div className="flex gap-1 flex-col items-start justify-center">
                    <label htmlFor="email" className="label">
                        Correo electrónico
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="johndoe@example.com"
                        className="input"
                    />
                </div>
                <div className="w-full flex gap-1 flex-col items-start justify-center">
                    <label htmlFor="birthday" className="label">
                        Fecha de nacimiento
                    </label>
                    <input
                        type="date"
                        name="birthday"
                        placeholder="Fecha de nacimiento"
                        className="input datePicker"
                    />
                </div>
                <div className="flex gap-1 flex-col items-start justify-center">
                    <label htmlFor="nationality" className="label">
                        Nacionalidad
                    </label>
                    <input
                        type="text"
                        name="nationality"
                        placeholder="Argentina"
                        className="input"
                    />
                </div>
                <div className="flex gap-1 flex-col items-start justify-center">
                    <label htmlFor="password" className="label">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        className="input"
                    />
                </div>
                <div className="flex gap-1 flex-col items-start justify-center">
                    <label htmlFor="confirmPassword" className="label">
                        Confirmar contraseña
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Contraseña"
                        className="input"
                    />
                </div>
                <button className="text-center bg-pwgreen-500 py-3 my-2 rounded-md shadow-xl text-pwgreen-900 font-bold uppercase font-Rubik">
                    Registrarse
                </button>
                <div className="flex justify-center items-center">
                    <span>Ya tenés cuenta?&nbsp;</span>
                    <Link href={'/api/auth/login'}>
                        <a className="underline text-pwgreen-500">
                            Iniciar sesión
                        </a>
                    </Link>
                </div>
            </form>
        </div>
    )
}
export default SignUp
