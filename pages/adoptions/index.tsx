import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import { IAdoption, PaginationSize } from 'app/types'
import { MainLayout, AdoptionCard, Filters } from 'components'
import { useQuery } from 'react-query'
import { getAdoptions, getUserById } from 'utils/dbFetching'
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

    const [open, setOpen] = useState(false)
    const handleClose = () => setOpen(false)

    let id: string = ''
    if (!isLoadingU && user && user.sub) {
        id = user.sub
    }

    const { data: dbUser, isLoading: uIsLoading } = useQuery(['user', id], () =>
        getUserById(id)
    )

    const isMobile = useMediaQuery({ minWidth: 0, maxWidth: 768 })
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 })
    const isLaptop = useMediaQuery({ minWidth: 1024, maxWidth: 1280 })
    const isMediumScreen = useMediaQuery({ minWidth: 1280, maxWidth: 1536 })
    const isBigScreen = useMediaQuery({ minWidth: 1536 })

    //Pagination with Data o Adoptions
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [itemsPerPage, setItemsPerPage] = useState<number>(4)
    const [paginationSize, setPaginationSize] = useState<PaginationSize>(
        PaginationSize.large
    )
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
        }
        if (!isLoadingU && dbUser) {
            if (!dbUser.email_verified) {
                handleClose()
                redirectionAlert({
                    icon: 'info',
                    title: '<strong>Se requiere que verifiques tu email antes de aplicar a una adopción!</strong>',
                    html:
                        'Para solicitar una adopción y poder disfrutar de todas nuestras funcionalidades' +
                        ' te invitamos a verificar tu email por motivos de seguridad.',
                    confirmButtonText: 'Ir a mi perfil',
                    confirmButtonAriaLabel: 'Thumbs up, great!',
                    link: '/dashboard/myProfile'
                })
                return
            }
        } else {
            router.push('/adoptions/post')
        }
    }

    useEffect(() => {
        if (isSuccess) {
            setData(adoptions)
            if (isMobile) {
                setItemsPerPage(4)
                setPaginationSize(PaginationSize.small)
            } else if (isTablet) {
                setItemsPerPage(6)
                setPaginationSize(PaginationSize.medium)
            } else if (isLaptop) {
                setItemsPerPage(6)
                setPaginationSize(PaginationSize.large)
            } else if (isMediumScreen) {
                setItemsPerPage(8)
                setPaginationSize(PaginationSize.large)
            } else if (isBigScreen) {
                setItemsPerPage(10)
                setPaginationSize(PaginationSize.large)
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
                <h1 className="text-2xl text-pwgreen-800 font-Rubik font-bold py-6 lg:py-8 lg:text-5xl">
                    Adopciones
                </h1>
                <Link href="/adoptions/post">
                    <button
                        onClick={alertAdoptionForm}
                        className="dashboardButton text-base py-2 px-2 bg-pwgreen-600 lg:p-4 text-pwgreen-50 hover:bg-pwgreen-800">
                        <a className="flex items-center gap-1.5">
                            <FaDog className="text-xl md:text-2xl" />
                            Poner en adopción
                            <FaArrowRight className="text-lg md:text-xl" />
                        </a>
                    </button>
                </Link>
            </div>

            <div className="flex">
                <div className="flex grow flex-col gap-2 pb-6 justify-center items-center bg-transparent lg:gap-3 xl:gap-5">
                    {!isLoading && currentItems ? (
                        <AlternativePagination
                            totalItems={(data ? data : adoptions)?.length}
                            itemsPerPage={itemsPerPage}
                            setCurrentPage={setCurrentPage}
                            size={paginationSize}
                        />
                    ) : null}
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-4 2xl:grid-cols-5">
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
                <div className="w-auto fixed flex justify-center items-center left-0 top-[20%] lg:sticky lg:right-5 bg-pwgreen-100">
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
