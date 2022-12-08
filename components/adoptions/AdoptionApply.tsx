import { NextComponentType } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import IsoGreen from 'public/iso-green.svg'

const AdoptionApply: NextComponentType = () => {
    const ids = window.localStorage.ids;
    console.log(ids);
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
                    ¡Adoptar!
                </h2>
                <p className="text-md mb-2 md:text-xl md:text-center">
                    Completa todos los datos de éste formulario para poder 
                    aplicar a adoptar ésta mascota.
                </p>
            </div>
            <form className="w-full grid grid-cols-1 gap-2 items-center justify-center md:w-2/6 lg:gap-3">
                <div className="flex flex-col gap-1 items-start justify-center">
                    <label htmlFor="reason" className="label">
                        ¿Por qué quieres adoptar ésta mascota?
                    </label>
                    <textarea
                        name="reason"
                        placeholder="Escribe aquí la razón por la cual quieres adoptar a esta Paw-Mascota."
                        className="input"
                    />
                </div>
                <div className="flex gap-1 flex-col items-start justify-center">
                    <label htmlFor="residence" className="label">
                        ¿Qué tipo de vivienda tienes?
                    </label>
                    <select
                        name="residence"
                        value=""
                        className="input"
                    >
                        <option value="" selected>Vivienda...</option>
                        <option value="DEPARTAMENTO" selected>Departamento</option>
                        <option value="CASA" selected>Casa</option>
                        <option value="PISO" selected>Piso</option>

                    </select>
                </div>
                <div className="flex gap-1 flex-col items-start justify-center">
                    <label htmlFor="employee" className="label">
                        ¿Tienes empleo?
                    </label>
                    <select
                        name="employee"
                        value=""
                        className="input"
                    >
                        <option value="" selected>Empleo...</option>
                        <option value='true' selected>Si tengo empleo</option>
                        <option value='false' selected>No tengo empleo</option>
                    </select>
                </div>
                <div className="w-full flex gap-1 flex-col items-start justify-center">
                    <label htmlFor="garden" className="label">
                        ¿Tienes jardín o patio?
                    </label>
                    <select
                        name="garden"
                        value=""
                        className="input"
                    >
                        <option value="" selected>Jardín o patio...</option>
                        <option value='true' selected>Si, tengo jardín y/o patio.</option>
                        <option value='false' selected>No, no tengo jardín y/o patio.</option>
                    </select>
                </div>
                <button className="text-center bg-pwgreen-500 py-3 my-2 rounded-md shadow-xl text-pwgreen-900 font-bold uppercase font-Rubik">
                    SOLICITAR ADOPCIÓN
                </button>
                {/* <div className="flex justify-center items-center">
                    <span>Ya tenés cuenta?&nbsp;</span>
                    <Link href={'/api/auth/login'}>
                        <a className="underline text-pwgreen-500">
                            Iniciar sesión
                        </a>
                    </Link>
                </div> */}
            </form>
        </div>
    )
}
export default AdoptionApply;
