import { NextComponentType } from 'next'
import React from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import Link from 'next/link'
import Image from 'next/image'
import IsoGreen from 'public/iso-green.svg'
import { useQuery } from 'react-query'
import { getUserById } from 'utils/dbFetching'

const MyProfile: NextComponentType = () => {
    const { user, isLoading: isLoadingU } = useUser()
    let id: string
    if (!isLoadingU && typeof user?.sub === 'string') {
        id = user?.sub
    }
    const {
        data: userProfile,
        error,
        isLoading,
        isSuccess
    } = useQuery(['userProfile', user?.sub], () => getUserById(id))
    let photo: string
    if (!isLoading) {
        photo = userProfile?.photo
    }

    return (
        <div className="p-8 flex flex-col justify-evenly items-center bg-pwgreen-100 rounded-lg md:flex-row">
            <div className="w-full flex flex-col gap-3 justify-center items-center mx-4 md:w-1/3">
                {isLoading ? (
                    <>
                        <Image
                            src={IsoGreen}
                            alt="not found"
                            width={150}
                            height={150}
                        />
                        <h1>
                            Espera un momento, estamos cargando tus datos...
                        </h1>
                    </>
                ) : (
                    <>
                        <div className="flex flex-col justify-center items-center w-60 h-60 bg-pwpurple-100 rounded-full">
                            <Image
                                src={userProfile?.photo}
                                alt="not found"
                                width={200}
                                height={200}
                                className="rounded-full static"
                            />
                        </div>
                    </>
                )}
                <div className="font-Rubik font-bold text-4xl lg:text-6xl">
                    {isLoading ? (
                        'Mi perfil...'
                    ) : (
                        <>
                            <h2 className="text-1x4">
                                Hola,{' '}
                                <span className="font-bold">
                                    {userProfile?.firstName}
                                </span>
                            </h2>
                        </>
                    )}
                </div>

                <p className="text-md text-center mb-2 md:text-xl md:text-center">
                    En este apartado podrás ver todos tus datos, si deseas
                    actualizarlos o modificarlos, presiona el botón{' '}
                    <span className="font-bold">
                        &quot;ACTUALIZAR DATOS&quot;
                    </span>
                    .
                </p>
            </div>

            <div className="w-2/4 grid grid-cols-1 gap-2 items-center justify-center lg:gap-3">
                {isLoading ? (
                    <div className="flex flex-col gap-1 items-start justify-center">
                        <h1>Cargando usuario...</h1>
                    </div>
                ) : (
                    <>
                        <div className="p-5 flex flex-col gap-2 justify-center">
                            <div className="input">
                                <h2>
                                    <span className="font-bold">
                                        Nombre y apellido:{' '}
                                    </span>
                                    {`${userProfile?.firstName} ${userProfile?.lastName}`}
                                </h2>
                            </div>
                            <div className="input">
                                <h2>
                                    <span className="font-bold">Email: </span>
                                    {`${userProfile?.email}`}
                                </h2>
                            </div>
                            {userProfile.email_verified ? (
                                <span className="text-sm text-pwgreen-700 mx-2 uppercase font-Rubik">
                                    Verificado
                                </span>
                            ) : (
                                <span className="text-sm text-red-500 mx-2 uppercase font-Rubik">
                                    Necesitas verificar tu email
                                </span>
                            )}
                            <div className="input">
                                <h2>
                                    <span className="font-bold">Género: </span>
                                    {userProfile?.gender || 'n/a'}
                                </h2>
                            </div>
                            <div className="input">
                                <h2>
                                    <span className="font-bold">País: </span>
                                    {userProfile?.country || 'n/a'}
                                </h2>
                            </div>
                            <div className="input">
                                <h2>
                                    <span className="font-bold">
                                        Provincia:&nbsp;
                                    </span>
                                    {userProfile?.province || 'n/a'}
                                </h2>
                            </div>
                            <div className="input">
                                <h2>
                                    <span className="font-bold">Ciudad: </span>
                                    {userProfile?.city || 'n/a'}
                                </h2>
                            </div>
                            <div className="input">
                                <h2>
                                    <span className="font-bold">
                                        Dirección:{' '}
                                    </span>
                                    {userProfile?.address || 'n/a'}
                                </h2>
                            </div>
                            <div className="input">
                                <h2>
                                    <span className="font-bold">
                                        Código postal:{' '}
                                    </span>
                                    {userProfile?.postCode || 'n/a'}
                                </h2>
                            </div>
                            <div className="input">
                                <h2>
                                    <span className="font-bold">
                                        Teléfono:{' '}
                                    </span>
                                    {userProfile?.phone || 'n/a'}
                                </h2>
                            </div>
                        </div>

                        <Link href={'/profile/update-user'}>
                            <button className="text-center bg-pwgreen-700 py-3 my-2 rounded-md shadow-xl text-pwgreen-50 font-bold uppercase font-Rubik hover:bg-pwgreen-800 transition-colors">
                                ACTUALIZAR DATOS
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    )
}
export default MyProfile
