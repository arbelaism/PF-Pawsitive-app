import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import { Props } from 'pages/adoptions'
import { AiOutlineClose } from 'react-icons/ai'
import { loadStripe } from '@stripe/stripe-js'
import {
    Elements,
    CardElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js'
import Checkout from './Checkout'
import paymentIcon from 'public/pngwing.com.png'
import Image from 'next/image'
import { useQuery } from 'react-query'
import { redirectionAlert } from 'utils/alerts'
import router from 'next/router'
import { getUserById } from 'utils/dbFetching'
import { useUser } from '@auth0/nextjs-auth0/client'

const stripePromise = loadStripe(
    'pk_test_51MCoCQKy1tWUr0G9bIjjBwCg9hCK7rC3pD3n0bR5rsjwROzCWBcoyHahEa62IEsd3gRfOdysQM9j4NzbygKCB8it00XjZLuyTi'
)

const ModalPayment = ({ price }: Props) => {
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const { user, error: errorU, isLoading: isLoadingU } = useUser()

    let id: string = ''
    if (!isLoadingU && user && user.sub) {
        id = user.sub
    }

    const { data: dbUser, isLoading: uIsLoading } = useQuery(['user', id], () =>
        getUserById(id)
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

            return
        }
        if (!uIsLoading && dbUser) {
            if (dbUser.email_verified === false) {
                handleClose()

                redirectionAlert({
                    icon: 'info',
                    title: '<strong>Se requiere que verifiques tu email antes de poder comprar un producto!</strong>',
                    html:
                        'Para poder comprar en nuestra página y poder disfrutar de todas nuestras funcionalidades' +
                        ' te invitamos a verificar tu email por motivos de seguridad.',
                    confirmButtonText: 'Ir a mi perfil',
                    confirmButtonAriaLabel: 'Thumbs up, great!',
                    link: '/dashboard/myProfile'
                })
                return
            }
        }

        handleOpen()
    }

    return (
        <Elements stripe={stripePromise}>
            <div className="flex justify-center">
                <button onClick={alertAdoptionForm} className="dashboardButton">
                    Pagar
                </button>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500
                    }}>
                    <Fade in={open}>
                        <Box className="left3/5 w-auto h-3/4 bg-pwgreen-200 border border-pwgreen-700 rounded-lg shadow-xl font-Rubik text-black mx-4 my-8 translate-x-0 translate-y-0">
                            <div className="w-1/6 absolute top-2 right-2 text-right text-lg font-bold">
                                <button
                                    onClick={handleClose}
                                    className="text-lg">
                                    <AiOutlineClose />
                                </button>
                            </div>
                            <div className="flex h-full flex-col justify-center items-center p-4 text-center">
                                <div className="my-5">
                                    <Image
                                        src={paymentIcon}
                                        alt="not found"
                                        width="100%"
                                        height="100%"
                                        className="cursor-pointer"
                                    />
                                </div>
                                <div className="w-full h-full rounded-lg bg-pwgreen-300 p-3">
                                    <Checkout price={price} setOpen={setOpen} />
                                </div>
                            </div>
                        </Box>
                    </Fade>
                </Modal>
            </div>
        </Elements>
    )
}
export default ModalPayment
