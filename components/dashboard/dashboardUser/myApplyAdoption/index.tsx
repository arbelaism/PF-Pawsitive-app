import React from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import Image from 'next/image'
import { useMutation, useQuery } from 'react-query'
import {
    getUserById,
    putAdoption,
    createPost as createAdoption,
    getApplyById,
    deleteApply
} from 'utils/dbFetching'
import Link from 'next/link'
import { alerts } from 'utils/alerts'

type Adoption = {
    id: string
    name: string
    size: string
    age: string
    breed: string
    photo: string
    gender: string
    active: boolean
    createdAt: string
    userId: string
}

const MyApplyAdoption = () => {
    const { user, error: err, isLoading: load } = useUser()
    const id = user?.sub as string
    //QUERY DATA GET AND PUT

    const {
        data: myTransactions,
        error,
        isLoading,
        isSuccess
    } = useQuery(['apply', id], () => getApplyById(id))

    const { mutate } = useMutation(
        (id: any) => deleteApply(id, myTransactions),
        {
            onSuccess: () => {
                alerts({
                    icon: 'success',
                    title: '<strong>Nice</strong>',
                    text: 'Adopcion eliminada correctamente',
                    toast: true
                })
            },
            onError: () => {
                alerts({
                    icon: 'error',
                    title: '<strong>Error</strong>',
                    text: 'No se ha podido eliminar la adopción',
                    toast: true
                })
            }
        }
    )

    function handleSubmit() {
        mutate(myTransactions.id)
    }

    return (
        <>
            {myTransactions === undefined ? (
                <h1>No tenés aplicacione</h1>
            ) : null}

            {isLoading ? (
                <div role="status" className="mt-16">
                    <svg
                        className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            ) : (
                <div
                    className="flex flex-col justify-between w-3/4 py-4 px-6 items-center m-5 bg-white shadow-2xl rounded-xl lg:w-60 lg:p-0 h-auto "
                    key={id}>
                    <div className="h-4/8">
                        <Image
                            src={myTransactions?.adoptionPost.photo}
                            alt="No hay imagen para mostrar"
                            width="30%"
                            height="30%"
                            layout="responsive"
                            objectFit="cover"
                            objectPosition={'static'}
                            className="rounded-full static"
                        />
                        <h2 className="text-pwgreen-800 font-Rubik text-xl font-medium capitalize"></h2>
                        <p className="text-pwgreen-800 font-Rubik capitalize">
                            Nombre : {myTransactions.adoptionPost.name}
                        </p>
                        <p className="text-pwgreen-800 font-Rubik">
                            Tamaño:{' '}
                            {myTransactions?.adoptionPost.size === 'SMALL'
                                ? 'Pequeño'
                                : myTransactions?.adoptionPost.size === 'MEDIUM'
                                ? 'Mediano'
                                : 'Grande'}{' '}
                        </p>
                        <p className="text-pwgreen-800 font-Rubik">
                            Edad: {myTransactions?.adoptionPost.age}
                        </p>

                        <p className="text-pwgreen-800 font-Rubik capitalize">
                            Raza: {myTransactions?.adoptionPost.breed}
                        </p>
                        {myTransactions?.adoptionPost.gender && (
                            <p className="text-pwgreen-800 font-Rubik capitalize">
                                Genero: {myTransactions.adoptionPost.gender}
                            </p>
                        )}
                        <p className="text-pwgreen-800 font-Rubik">
                            Creado el :{' '}
                            {myTransactions?.adoptionPost.createdAt.slice(
                                0,
                                10
                            )}
                        </p>
                        <p className="text-pwgreen-800 font-Rubik">
                            Datos del adoptante :
                        </p>
                        <p className="text-pwgreen-800 font-Rubik capitalize">
                            Tipo de residencia :{' '}
                            {myTransactions.residence.toLowerCase()}
                        </p>
                        <p className="text-pwgreen-800 font-Rubik">
                            Disponibilidad de jardin :{' '}
                            {myTransactions.garden ? 'Si' : 'No'}
                        </p>
                        <p className="text-pwgreen-800 font-Rubik">
                            Trabaja actualmente :{' '}
                            {myTransactions.employee ? 'Si' : 'No'}
                        </p>
                        <button className="" onClick={handleSubmit}>
                            <a className="ml-4 ease-in  rounded-lg duration-300 hover:py-2 hover:bg-pwgreen-800 hover:text-white text-pwgreen-800 font-Rubik font-semibold px-1 hover:rounded-lg">
                                Cancelar Solicitud
                            </a>
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default MyApplyAdoption
