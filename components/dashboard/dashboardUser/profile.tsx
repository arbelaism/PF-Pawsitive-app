import { NextComponentType } from 'next';
import React, { useState } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { useUser } from "@auth0/nextjs-auth0/client";
import { mediaUploader } from "utils/mediaUploader";
import { useRouter } from "next/router"
import axios from 'axios';
import Image from 'next/image'
import IsoGreen from 'public/iso-green.svg'

const MyProfile: NextComponentType = () => {
    interface UserUpdate {};

    const { user, error: err, isLoading: loading } = useUser();    
    const [media, setMedia] = useState<File[]>([]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const target = e.target as HTMLInputElement;
        const files = [...Object.values(target.files!)];
        setMedia([...files]);
      };

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm({});
 
    const onSubmit: SubmitHandler<UserUpdate> = async(data)=> {
        let urlPhoto: any = []
        if (media.length > 0) {
            urlPhoto = await mediaUploader(media);
        }
        if(urlPhoto !== null || urlPhoto !== undefined){
            data = {...data,
                photo: urlPhoto ? urlPhoto[0] : null
            };
        }
        if(urlPhoto == null || urlPhoto == undefined){
            data = {...data}
        }

        axios.put(`/api/user/${user?.sub}`, data)
            .then(response => {
                 console.log("Update SUCCESS!")
            }).catch(error => {
                console.log(error)
                })
        reset({})
        alert('Datos actualizados!')
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

            <form className="w-full grid grid-cols-1 gap-2 items-center justify-center md:w-2/6 lg:gap-3"
                onSubmit={handleSubmit(onSubmit)}
            >

                {/* NOMBRE */}
                <div className="flex flex-col gap-1 items-start justify-center">
                    <label htmlFor="firstName" className="label">
                        Nombre:
                    </label>
                    <input
                        placeholder="Nombre..."
                        className="input"
                        {...register('firstName', {
                            maxLength: 20,
                            pattern: /[a-zA-Z\s:]/
                        })}
                    />
                    {
                        errors.firstName?.type === 'maxLength' ?
                        <span className="text-red-500 text-xs">
                            El nombre no puede tener más de 20 caracteres.
                        </span>
                        :
                        null                        
                    }
                    {
                        errors.firstName?.type === 'pattern' ?
                        <span className="text-red-500 text-xs">
                            El nombre no puede contener caracteres especiales.
                        </span>
                        :
                        null                        
                    }
                </div>

                {/* APELLIDO */}
                <div className="flex flex-col gap-1 items-start justify-center">
                    <label htmlFor="lastName" className="label">
                        Apellido:
                    </label>
                    <input
                        placeholder="Apellido..."
                        className="input"
                        {...register('lastName', {
                            maxLength: 20,
                            pattern: /[a-zA-Z\s:]/
                        })}
                    />
                    {
                        errors.lastName?.type === 'maxLength' ?
                        <span className="text-red-500 text-xs">
                            El apellido no puede tener más de 20 caracteres.
                        </span>
                        :
                        null                        
                    }
                    {
                        errors.lastName?.type === 'pattern' ?
                        <span className="text-red-500 text-xs">
                            El apellido no puede contener caracteres especiales.
                        </span>
                        :
                        null                        
                    }
                </div>

                {/* EMAIL */}
                <div className="flex flex-col gap-1 items-start justify-center">
                    <label htmlFor="email" className="label">
                        Email:
                    </label>
                    <input
                        placeholder="Email..."
                        className="input"
                        {...register('email', {
                               pattern: /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
                        })}
                    />
                    {
                        errors.email?.type === 'pattern' ?
                        <span className="text-red-500 text-xs">
                            El correo electrónico ingresado no es válido.
                        </span>
                        :
                        null                        
                    }
                </div>

                {/* GENERO */}
                <div className="flex gap-1 flex-col items-start justify-center">
                    <label htmlFor="gender" className="label">
                        Género:
                    </label>
                    <select
                        className="input"
                        {...register('gender')}
                    >
                        <option value="" >Género...</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Prefiero no decir">Prefiero no decir</option>

                    </select>                  
                </div>

                <div className="flex flex-col gap-1 items-start justify-center">
                    <label htmlFor="firstName" className="label">
                        Fecha de nacimiento:
                    </label>
                    <input
                        placeholder="Fecha de nacimiento..."
                        type='date'
                        className="input"
                        {...register('birthday')}
                    />
                    {}
                </div>

                {/* TELEFONO */}
                <div className="flex flex-col gap-1 items-start justify-center">
                    <label htmlFor="phone" className="label">
                        Teléfono:
                    </label>
                    <input
                        placeholder="Teléfono..."
                        className="input"
                        {...register('phone', {
                            maxLength: 15,
                            pattern: /^[0-9]+$/
                        })}
                    />
                    {
                        errors.phone?.type === 'maxLength' ?
                        <span className="text-red-500 text-xs">
                            El teléfono debe tener máximo 15 caracteres.
                        </span>
                        :
                        null                        
                    }
                    {
                        errors.phone?.type === 'pattern' ?
                        <span className="text-red-500 text-xs">
                            Ingresa solo datos numéricos.
                        </span>
                        :
                        null                        
                    }
                </div>
                {/* DIRECCION */}
                <div className="flex flex-col gap-1 items-start justify-center">
                    <label htmlFor="address" className="label">
                        Dirección:
                    </label>
                    <input
                        placeholder="Dirección..."
                        className="input"
                        {...register('address', {
                            maxLength: 100,
                        })}
                    />
                    {
                        errors.address?.type === 'maxLength' ?
                        <span className="text-red-500 text-xs">
                            Danos una descripción más corta de tu dirección.
                        </span>
                        :
                        null                        
                    }
                </div>

                {/* CIUDAD */}
                <div className="flex flex-col gap-1 items-start justify-center">
                    <label htmlFor="city" className="label">
                        Ciudad:
                    </label>
                    <input
                        placeholder="Ciudad..."
                        className="input"
                        {...register('city', {
                            maxLength: 20,
                        })}
                    />
                    {
                        errors.city?.type === 'maxLength' ?
                        <span className="text-red-500 text-xs">
                            El nombre de la ciudad no puede ser mayor a 20 caracteres.
                        </span>
                        :
                        null                        
                    }
                </div>

                {/* PROVINCE */}
                <div className="flex flex-col gap-1 items-start justify-center">
                    <label htmlFor="province" className="label">
                        Provincia:
                    </label>
                    <input
                        placeholder="Provincia..."
                        className="input"
                        {...register('province', {
                            maxLength: 20,
                        })}
                    />
                    {
                        errors.province?.type === 'maxLength' ?
                        <span className="text-red-500 text-xs">
                            El nombre de la provincia no puede ser mayor a 20 caracteres.
                        </span>
                        :
                        null                        
                    }
                </div>

                {/* CODIGO POSTAL */}
                <div className="flex flex-col gap-1 items-start justify-center">
                    <label htmlFor="postCode" className="label">
                        Código postal:
                    </label>
                    <input
                        placeholder="Código postal..."
                        className="input"
                        {...register('postCode', {
                            maxLength: 10,
                        })}
                    />
                    {
                        errors.postCode?.type === 'maxLength' ?
                        <span className="text-red-500 text-xs">
                            El código postal no puede ser mayor a 10 caracteres.
                        </span>
                        :
                        null                        
                    }
                </div>

                {/* FOTO */}
                <div className="flex flex-col gap-1 items-start justify-center">
                    <label className="label">
                        Foto:
                    </label>
                    <input
                        onChange={(e) => handleChange(e)}
                        className="input"
                        id="photo"
                        type="file"
                        multiple
                        accept="image/*"
                    />
                </div> 
                
                <button type='submit' className="text-center bg-pwgreen-500 py-3 my-2 rounded-md shadow-xl text-pwgreen-900 font-bold uppercase font-Rubik">
                    ACTUALIZAR DATOS
                </button>
            </form>
        </div>
    )
}
export default MyProfile;