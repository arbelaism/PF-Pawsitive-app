import { NextPage } from 'next'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { IAdoption } from 'app/types'
import { MainLayout, AdoptionCard, Filters } from 'components'
import { useQuery } from 'react-query'
import { getAdoptions } from 'utils/dbFetching'
import { redirectionAlert } from "utils/alerts";
import AlternativePagination from 'components/layout/AlternativePagination'
import NotFound from 'public/mong03b.gif'
import Image from 'next/image'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useRouter } from 'next/router'

export type Props = {
    [key: string]: any
}

const Adoptions: NextPage = () => {
    const {
        data: adoptions,
        error,
        isLoading,
        isSuccess
    } = useQuery(['adoptions'], getAdoptions)

    //hooks para mostrar alerta o redireccionar
    const { user, error: errorU, isLoading: isLoadingU } = useUser()
    const router = useRouter()

    //Pagination with Data o Adoptions
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [itemsPerPage, _setItemsPerPage] = useState<number>(6)
    const [data, setData] = useState<IAdoption[]>()

    const lastItemIndex = currentPage * itemsPerPage
    const firstItemIndex = lastItemIndex - itemsPerPage
    let currentItems: IAdoption[] = []
    if (data) currentItems = [...data.slice(firstItemIndex, lastItemIndex)]

    const alertAdoptionForm = ()=>{
      if(!user){
        redirectionAlert({
          icon: 'info',
                  title: '<strong>Inicio de sesion requerido</strong>',
                  html: 'Para publicar un anuncio de adopcion y poder disfrutar de todas nuestras funcionalidades' +
                  ' te invitamos a iniciar sesion o crear una cuenta.',
                  confirmButtonText: 'Iniciar sesion',                
                  confirmButtonAriaLabel:  'Thumbs up, great!',
                  link : '/api/auth/login'
        })
      }
      else{
        router.push('/adoptions/post')
      }
    }

    useEffect(() => {
        if (isSuccess) {
            setData(adoptions)
        }
    }, [isSuccess, adoptions])

    return (
        <MainLayout title="Pawsitive - Adopciones">          
          <div className="px-4 py-2 w-full flex justify-between items-center bg-pwgreen-100 mt-4">
                <h1 className="text-3xl font-bold p-4 bg-pwpurple-50 rounded-xl border-pwgreen-700 shadow-xl lg:text-5xl">
                  Adopciones
                </h1>
                <Link href="/adoptions/post">
                <button onClick={alertAdoptionForm}>
                <a
                  className="inline-flex justify-center items-center p-5 text-base font-medium text-white bg-pwgreen-700 rounded-lg hover:text-white hover:bg-pwpurple-800 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                <svg
                  aria-hidden="true"
                  className="mr-3 w-5 h-5"
                  viewBox="0 0 22 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_4151_63004)">
                    <path
                      d="M5.50085 30.1242C8.53625 30.1242 10.9998 27.8749 10.9998 25.1035V20.0828H5.50085C2.46546 20.0828 0.00195312 22.332 0.00195312 25.1035C0.00195312 27.8749 2.46546 30.1242 5.50085 30.1242Z"
                      fill="#58c184"
                    />
                    <path
                      d="M0.00195312 15.062C0.00195312 12.2905 2.46546 10.0413 5.50085 10.0413H10.9998V20.0827H5.50085C2.46546 20.0827 0.00195312 17.8334 0.00195312 15.062Z"
                      fill="#3ea76a"
                    />
                    <path
                      d="M0.00195312 5.02048C0.00195312 2.24904 2.46546 -0.000244141 5.50085 -0.000244141H10.9998V10.0412H5.50085C2.46546 10.0412 0.00195312 7.79193 0.00195312 5.02048Z"
                      fill="#308253"
                    />
                    <path
                      d="M11 -0.000244141H16.4989C19.5343 -0.000244141 21.9978 2.24904 21.9978 5.02048C21.9978 7.79193 19.5343 10.0412 16.4989 10.0412H11V-0.000244141Z"
                      fill="#823060"
                    />
                    <path
                      d="M21.9978 15.062C21.9978 17.8334 19.5343 20.0827 16.4989 20.0827C13.4635 20.0827 11 17.8334 11 15.062C11 12.2905 13.4635 10.0413 16.4989 10.0413C19.5343 10.0413 21.9978 12.2905 21.9978 15.062Z"
                      fill="#5d2344"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4151_63004">
                      <rect
                        width="22"
                        height="30.1244"
                        fill="white"
                        transform="translate(0 -0.000244141)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                
                  <span className="w-full">
                    Poner en adopción
                  </span>
                
                <svg
                  aria-hidden="true"
                  className="ml-3 w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
                </button>
                </Link>
            </div>
          

            <div className="flex">
                <div className="flex grow flex-col justify-center items-center bg-transparent">
                    {!isLoading && currentItems ? (
                        <AlternativePagination
                            totalItems={(data ? data : adoptions)?.length}
                            itemsPerPage={itemsPerPage}
                            setCurrentPage={setCurrentPage}
                        />
                    ) : null}
                    <div className="flex flex-wrap justify-center items-center bg-pwgreen-100">
                        {isLoading ? (
                            <h1>Loading...</h1>
                        ) : currentItems.length === 0 ? (
                            <div className="flex flex-col justify-center items-center">
                                <h1 className="font-bold text-3xl">
                                    No encontramos items
                                </h1>
                                <Image
                                    src={NotFound}
                                    alt="not found"
                                    width={500}
                                    height={400}
                                />
                            </div>
                        ) : (
                            currentItems.map((adoption: IAdoption) => {
                                return (
                                    <AdoptionCard
                                        key={adoption.id}
                                        id={adoption.id}
                                        name={adoption.name}
                                        size={adoption.size.toLowerCase()}
                                        age={adoption.age}
                                        breed={adoption.breed}
                                        photo={adoption.photo}
                                    />
                                )
                            })
                        )}
                    </div>
                </div>
                <div className="w-auto ml-4 fixed left-0 top-[20%] lg:sticky lg:right-10 lg:top-10">
                    <Filters
                        setData={setData}
                        data={data}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
            
        </MainLayout>
    )
}

export default Adoptions
