import { NextComponentType } from 'next';
import { useState } from 'react';
import { useUser } from "@auth0/nextjs-auth0/client";
import { useQueryClient } from 'react-query';
import Image from 'next/image'
import Link from 'next/link'
import IsoGreen from 'public/iso-green.svg'
import { type } from 'os';

const AdoptionApply: NextComponentType = () => {

    const { user, error: err, isLoading: loading } = useUser();
    //De momento se usa un USERID hardcodeado, hasta que se modifique el model correspondiente a los usuarios. Arriba, se ve como se accede
//user que se necesita.
    const queryClient = useQueryClient();   
    console.log(queryClient.getQueriesData('pet')); //Manda undefined, tanto por queries como por caché. No puede accederse desde otro componente al caché

    const [data, setData] = useState({                
        reason: "",
        past: "",
        residence: "",
        employee: "",
        garden: "",
        adoptionPostId: "",
        userId: ""
    });
    const [errores, setErrores] = useState({});
    
    interface Obj{                
        reason: "",
        past: "",
        residence: "",
        employee: "",
        garden: "",
        adoptionPostId: "",
        userId: ""
    }
    function validate(obj:Obj){
        let error={}; //Objeto en que se almacenarán los errores.
        //Valida que exista el nombre
        if(obj.reason.length <= 1 || typeof obj.reason !== "string") error.reason = "Debes ingresar una descripción";
        //Valida que exista la descripcion
        if(obj.past === "") error.past = "Debes indicar si has tenido una mascota anteriormente";
        //Valida que exista la URL para la imagen del juego a crear
        if(obj.Img_URL.length <=1 || typeof obj.Img_URL !== "string") error.Img_URL = "Debes ingresar una URL para tu imagen";
        //Valida que se haya ingresado al menos una plataforma
        if(obj.Plataformas.length <1) error.Plataformas = "Debes ingresar al menos una plataforma";
        //Valida que exista un arreglo con al menos un género
        if(obj.Generos.length <1) error.Generos = "Debes ingresar al menos un género";
        //Valida que el rating ingresado sea menor o igual a cinco, y mayor o igual a 1
        if(obj.Rating > 5) error.Rating = "El Rating debe ser igual o menor a 5";
        if(obj.Rating < 1) error.Rating = "El Rating debe ser igual o mayor a 1";
        
        
        return error;
};
function handleChange(e){
    setErrores(validate(data));
    setData({
            ...data, //Pushea al obj solo lo que se indique segun sea el input
            [e.target.name]:e.target.value
    });
   

}



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
                        <option value="">Vivienda...</option>
                        <option value="DEPARTAMENTO">Departamento</option>
                        <option value="CASA">Casa</option>
                        <option value="PISO">Piso</option>

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
                        <option value="">Empleo...</option>
                        <option value='true'>Si tengo empleo</option>
                        <option value='false'>No tengo empleo</option>
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
                        <option value="">Jardín o patio...</option>
                        <option value='true'>Si, tengo jardín y/o patio.</option>
                        <option value='false'>No, no tengo jardín y/o patio.</option>
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
