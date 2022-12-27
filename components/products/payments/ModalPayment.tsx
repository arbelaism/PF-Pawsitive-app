import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import { Props } from 'pages/adoptions'
import Checkout from './Checkout'
import { useQuery } from 'react-query'
import { redirectionAlert } from 'utils/alerts'
import { getUserById } from 'utils/dbFetching'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { PaymentIntent, StripeElementsOptions } from '@stripe/stripe-js'
import styles from 'styles/AdoptionDetails.module.css'
import axios from 'axios'
import getStripe from 'utils/stripe'
import { IoClose } from 'react-icons/io5'

const stripePromise = getStripe()

const ModalPayment = ({ price }: Props) => {
    const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(
        null
    )
    const [clientSecret, setClientSecret] = useState<string>('')
    const [open, setOpen] = useState(false)
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
                    link: '/profile'
                })
                return
            }
        }

        handleOpen()
    }

    useEffect(() => {
        if (!uIsLoading && dbUser) {
            const data = {
                totalPrice: price
            }

            if (!data.totalPrice) return
            axios.post('/api/product/payment', data).then(res => {
                const paymentIntent = res.data
                setPaymentIntent(paymentIntent)
                setClientSecret(paymentIntent.client_secret)
            })
        }
    }, [price])

    const options: StripeElementsOptions = {
        clientSecret
    }

    return (
        <div className="flex justify-center">
            <button
                onClick={alertAdoptionForm}
                className="dashboardButton uppercase text-lg bg-pwgreen-700 px-5 text-pwgreen-50">
                Pagar
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
                closeAfterTransition>
                <Fade in={open}>
                    <Box className={styles.container}>
                        <div className="flex relative bg-pwgreen-100 rounded-md justify-center items-center text-center">
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 text-3xl text-pwpurple-800 hover:bg-pwpurple-700 hover:text-pwpurple-50 transition-all hover:rotate-90 hover:rounded-full">
                                <IoClose />
                            </button>
                            <div className="w-full h-full">
                                {paymentIntent && (
                                    <Elements
                                        stripe={stripePromise}
                                        options={options}>
                                        <Checkout
                                            setOpen={setOpen}
                                            clientSecret={clientSecret}
                                            paymentIntent={paymentIntent}
                                        />
                                    </Elements>
                                )}
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}
export default ModalPayment
