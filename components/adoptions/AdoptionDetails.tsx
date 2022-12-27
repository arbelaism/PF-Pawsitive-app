import * as React from 'react'
import { useState } from 'react'
import { redirectionAlert } from 'utils/alerts'
import useLocalStorage from 'use-local-storage'
import { useUser } from '@auth0/nextjs-auth0/client'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import styles from 'styles/AdoptionDetails.module.css'
import Image from 'next/image'
import { getPetById, getUserById } from 'utils/dbFetching'
import { ApplyAdAp } from 'app/types'
import { useQuery } from 'react-query'
import { AiOutlineArrowRight, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useRouter } from 'next/router'
import { IoClose } from 'react-icons/io5'

type Prop = {
    id: string
}

const AdoptionDetails = ({ id }: Prop) => {
    const { user, error: errorU, isLoading: isLoadingU } = useUser()
    const router = useRouter()
    const [ids, setIds] = useLocalStorage<ApplyAdAp>('ids', {
        petId: '',
        userId: ''
    })
    const [open, setOpen] = useState(false)
    const handleClose = () => setOpen(false)

    let userId: string = ''
    if (!isLoadingU && user && user.sub) {
        userId = user.sub
    }
    const { data: dbUser, isLoading: uIsLoading } = useQuery(
        ['user', userId],
        () => getUserById(userId)
    )

    const alertAdoptionForm = async () => {
        if (!user) {
            handleClose()
            redirectionAlert({
                icon: 'info',
                title: '<strong>Inicio de sesion requerido</strong>',
                html:
                    'Para solicitar una adopción y poder disfrutar de todas nuestras funcionalidades' +
                    ' te invitamos a iniciar sesion o crear una cuenta.',
                confirmButtonText: 'Iniciar sesion',
                confirmButtonAriaLabel: 'Thumbs up, great!',
                link: '/api/auth/login'
            })
        }
        if (!uIsLoading && dbUser) {
            if (dbUser.email_verified === false) {
                handleClose()
                redirectionAlert({
                    icon: 'info',
                    title: '<strong>Se requiere que verifiques tu email antes de aplicar a una adopción!</strong>',
                    html:
                        'Para solicitar una adopción y poder disfrutar de todas nuestras funcionalidades' +
                        ' te invitamos a verificar tu email por motivos de seguridad.',
                    confirmButtonText: 'Ir a mi perfil',
                    confirmButtonAriaLabel: 'Thumbs up, great!',
                    link: '/profile'
                })
                return
            }
        }
        if (user !== undefined) {
            router.push('/adoptions/apply')
        }
    }

    const {
        data: pet,
        error,
        isLoading,
        isSuccess
    } = useQuery(['pet', id], () => getPetById(id))

    const handleOpen = () => {
        const idToString: string = id.toString()
        const data = {
            petId: idToString,
            userId: user?.sub
        }
        setIds(data)
        setOpen(true)
    }

    return (
        <>
            <button
                onClick={() => {
                    handleOpen()
                }}>
                Adoptame!
            </button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(12px)'
                }}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500
                }}>
                <Fade in={open}>
                    <Box className={styles.container}>
                        <div className="w-full h-full">
                            {isLoading ? (
                                <div className="flex justify-center items-center gap-3 my-16">
                                    <AiOutlineLoading3Quarters className="text-4xl animate-spin text-pwpurple-700" />
                                </div>
                            ) : (
                                <div className="relative flex flex-col items-center justify-around py-4 lg:py-16 lg:flex-row bg-white border border-gray-200 rounded-lg shadow-md">
                                    <button
                                        onClick={handleClose}
                                        className="absolute top-4 right-4 text-3xl text-pwpurple-800 hover:bg-pwpurple-700 hover:text-pwpurple-50 transition-all hover:rotate-90 hover:rounded-full">
                                        <IoClose />
                                    </button>
                                    <div className="w-1/4 flex flex-row justify-center items-center">
                                        <div>
                                            <Image
                                                src={pet.photo}
                                                alt={`Adopt me: ${pet.name}`}
                                                objectFit={'cover'}
                                                width={256}
                                                height={256}
                                                className="rounded-full"
                                            />
                                        </div>
                                    </div>

                                    <div className="h-full w-3/4 flex flex-col justify-between lg:w-2/4">
                                        <div className="w-full">
                                            <h5 className="capitalize mb-2 text-2xl font-Rubik font-bold tracking-tight text-pwgreen-900 lg:text-3xl">
                                                {pet.name}
                                            </h5>
                                            <p className="font-Rubik text-gray-700 text-justify">
                                                Mi nombre es{' '}
                                                <span className="capitalize font-bold">
                                                    {pet.name}
                                                </span>
                                                {pet.description ? (
                                                    <p>{pet.description}</p>
                                                ) : (
                                                    <p>
                                                        Lorem ipsum dolor sit
                                                        amet, qui minim labore
                                                        adipisicing minim sint
                                                        cillum sint consectetur
                                                        cupidatat.Lorem ipsum
                                                        dolor sit amet, qui
                                                        minim labore adipisicing
                                                        minim sint cillum sint
                                                        consectetur cupidatat.
                                                    </p>
                                                )}
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-center my-2">
                                            <div className="dashboardButton lg:self-end uppercase text-lg bg-pwpurple-600 text-pwpurple-50 hover:bg-pwpurple-800">
                                                <button
                                                    onClick={alertAdoptionForm}>
                                                    ¡Adóptame!
                                                </button>
                                                <div>
                                                    <AiOutlineArrowRight className="text-2xl" />
                                                </div>
                                            </div>
                                            <span className="text-xs text-slate-500 text-center">
                                                Si deseas adoptarme, por favor
                                                presiona el botón
                                                &quot;¡Adóptame!&quot; y nuestro
                                                equipo se contactará contigo.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}
export default AdoptionDetails
