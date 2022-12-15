import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import { IAdoption } from 'app/types'
import { MainLayout, AdoptionCard, Filters } from 'components'
import { useQuery } from 'react-query'
import { getAdoptions } from 'utils/dbFetching'
import { redirectionAlert } from 'utils/alerts'
import AlternativePagination from 'components/layout/AlternativePagination'
import NotFound from 'public/mong03b.gif'
import Image from 'next/image'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { FaArrowRight, FaDog } from 'react-icons/fa'
import { useMediaQuery } from 'react-responsive'
import Loading from 'public/loading.gif'

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
    const isMobile = useMediaQuery({ query: '(max-width: 640px)' })
    const isTablet = useMediaQuery({ query: '(max-width: 768px)' })
    const isLaptop = useMediaQuery({ query: '(max-width: 1024px)' })
    const isMediumScreen = useMediaQuery({ query: '(max-width: 1280px)' })
    const isBigScreen = useMediaQuery({ query: '(min-width: 1536px)' })

    //Pagination with Data o Adoptions
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [itemsPerPage, setItemsPerPage] = useState<number>(4)
    const [data, setData] = useState<IAdoption[]>()

    const lastItemIndex = currentPage * itemsPerPage
    const firstItemIndex = lastItemIndex - itemsPerPage
    let currentItems: IAdoption[] = []
    if (data) currentItems = [...data.slice(firstItemIndex, lastItemIndex)]

    const alertAdoptionForm = () => {
        if (!user) {
            redirectionAlert({
                icon: 'info',
                title: '<strong>Inicio de sesion requerido</strong>',
                html:
                    'Para publicar un anuncio de adopcion y poder disfrutar de todas nuestras funcionalidades' +
                    ' te invitamos a iniciar sesion o crear una cuenta.',
                confirmButtonText: 'Iniciar sesion',
                confirmButtonAriaLabel: 'Thumbs up, great!',
                link: '/api/auth/login'
            })
        } else {
            router.push('/adoptions/post')
        }
    }

    useEffect(() => {
        if (isSuccess) {
            setData(adoptions)
            if (isMobile) {
                setItemsPerPage(4)
            } else if (isTablet) {
                setItemsPerPage(4)
            } else if (isLaptop) {
                setItemsPerPage(6)
            } else if (isMediumScreen) {
                setItemsPerPage(9)
            } else if (isBigScreen) {
                setItemsPerPage(10)
            }
        }
    }, [
        isSuccess,
        adoptions,
        isBigScreen,
        isMobile,
        isTablet,
        isLaptop,
        isMediumScreen
    ])

    return (
        <MainLayout title="Pawsitive - Adopciones">
            <div className="w-full flex justify-between items-center px-4">
                <h1 className="text-3xl font-Rubik font-bold py-6 lg:py-8 lg:text-5xl">
                    Adopciones
                </h1>
                <Link href="/adoptions/post">
                    <button
                        onClick={alertAdoptionForm}
                        className="dashboardButton text-base bg-pwgreen-600 text-pwgreen-50 hover:bg-pwgreen-800">
                        <a className="flex items-center gap-1.5">
                            <FaDog className="text-2xl" />
                            Poner en adopción
                            <FaArrowRight className="text-xl" />
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
                    <div className="grid grid-cols-2 gap-x-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                        {isLoading ? (
                            <div className="flex justify-center items-center my-16">
                                <Image
                                    src={Loading}
                                    alt="not found"
                                    width={100}
                                    height={100}
                                />
                            </div>
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
                <div className="w-auto fixed flex justify-center items-center left-0 top-[20%] lg:sticky lg:right-5 bg-pwgreen-50">
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
