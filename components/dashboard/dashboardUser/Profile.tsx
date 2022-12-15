import { NextComponentType } from 'next';
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from 'next/link';
import Image from 'next/image'
import IsoGreen from 'public/iso-green.svg';
import { useQuery } from 'react-query';
import {getUserById} from 'utils/dbFetching';

const MyProfile: NextComponentType = () => {

    const { user, isLoading: isLoadingU } = useUser();
    let id:string;
    if(!isLoadingU && typeof user?.sub === 'string'){
        id = user?.sub;
    }
    const {
        data: userProfile,
        error,
        isLoading,
        isSuccess,
      } = useQuery(["userProfile", user?.sub], () => getUserById(id));
      let photo: string;
      if(!isLoading){
        console.log(userProfile);
        photo = userProfile?.photo
      }

    return (
        <div className="p-8 flex flex-col justify-evenly items-center bg-pwgreen-100 rounded-lg md:flex-row">
            <div className="w-full flex flex-col gap-3 justify-center items-center md:w-1/3">
                {
                    isLoading ?
                    <>
                        <Image
                            src={IsoGreen}
                            alt="not found"
                            width={150}
                            height={150}
                        />
                        <h1>Espera un momento, estamos cargando tus datos...</h1>
                    </>
                    :
                    <>
                        <div className='flex flex-col justify-center items-center w-60 h-60 bg-pwpurple-100 rounded-full'>
                            <Image
                                src={userProfile?.photo}
                                alt="not found"
                                width={200}
                                height={200}
                                className="rounded-full static"
                            />
                        </div>
                        
                    </>
                }
                <div className="font-Rubik font-bold text-4xl lg:text-6xl">
                    {isLoading ?
                    'Mi perfil...'
                    :
                    <>
                    <h2 className='text-1x4'>Hola, <span className='font-bold'>{userProfile?.firstName}</span></h2>
                    </>
                        
                
                }
                </div>
                
                <p className="text-md text-center mb-2 md:text-xl md:text-center">
                    En este apartado podrás ver todos tus datos, si deseas actualizarlos o modificarlos, presiona el botón <span className='font-bold'>&quot;ACTUALIZAR DATOS&quot;</span>.
                </p>
            </div>

            <div className="w-full grid grid-cols-1 gap-2 items-center justify-center md:w-2/3 lg:gap-3">

                {isLoading ?
                <div className="flex flex-col gap-1 items-start justify-center">
                    <h1>Cargando usuario...</h1>
                </div>
                :
                <>
                    
                    <div className='w-3/4 p-5 flex flex-col justify-end'>
                        <div className="input">
                            <h2><span className='font-bold'>Nombre y apellido: </span>{`${userProfile?.firstName} ${userProfile?.lastName}`}</h2>
                        </div>
                        <div className="input">
                            <h2><span className='font-bold'>Email: </span>{`${userProfile?.email}`}</h2>
                        </div>
                        <div className="input">
                            <h2><span className='font-bold'>Género: </span>{`${userProfile?.gender}`}</h2>
                        </div>
                        <div className="input">
                            <h2><span className='font-bold'>País: </span>{`${userProfile?.country}`}</h2>
                        </div>
                        <div className="input">
                            <h2><span className='font-bold'>Provincia: </span>{`${userProfile?.province}`}</h2>
                        </div>
                        <div className="input">
                            <h2><span className='font-bold'>Ciudad: </span>{`${userProfile?.city}`}</h2>
                        </div>
                        <div className="input">
                            <h2><span className='font-bold'>Dirección: </span>{`${userProfile?.address}`}</h2>
                        </div>
                        <div className="input">
                            <h2><span className='font-bold'>Código postal: </span>{`${userProfile?.postCode}`}</h2>
                        </div>
                        <div className="input">
                            <h2><span className='font-bold'>Teléfono: </span>{`${userProfile?.phone}`}</h2>
                        </div>
                    </div>

                    <Link href={'/dashboard/myprofile/updateuser'}>
                        <button className="text-center bg-pwgreen-500 py-3 my-2 rounded-md shadow-xl text-pwgreen-900 font-bold uppercase font-Rubik">
                            ACTUALIZAR DATOS
                        </button>   
                    </Link>
             
                </>


                }               

            </div>
        </div>
    )
}
export default MyProfile;