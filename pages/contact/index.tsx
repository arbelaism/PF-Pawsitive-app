import { NextComponentType } from 'next'
import { MainLayout } from 'components'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { useRouter } from 'next/router'
import { sendMail } from 'utils/dbFetching'
import { ContactForm } from '../../app/types'
import { alerts } from 'utils/alerts'

const Contact: NextComponentType = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ContactForm>()

    const router = useRouter()
    const queryClient = useQueryClient()
    const { mutate, isLoading } = useMutation(sendMail, {
        onSuccess: data => {
            alerts({
                icon: 'info',
                title: '<strong>Email</strong>',
                text: 'Email Sent',
                toast: true
            })
            router.push('/')
        },
        onError: () => {
            alerts({
                icon: 'error',
                title: '<strong>Email</strong>',
                text: 'Cant send the mail',
                toast: true
            })
        },
        onSettled: () => {
            queryClient.invalidateQueries('create')
        }
    })
    const onSubmit: SubmitHandler<ContactForm> = async data => {
        console.log(data)
        const mail = {
            ...data,
            action: 'contact'
        }
        const email = {
            ...data,
            action: 'contactUs'
        }
        if (validate(data.email)) {
            mutate(email)
            mutate(mail)
        } else {
            alerts({
                icon: 'info',
                title: '<strong>Email</strong>',
                text: 'Email inválido',
                toast: true
            })
        }
    }
    const validate = (email: string): boolean => {
        const expression =
            /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i
        return expression.test(String(email).toLowerCase())
    }
    return (
        <MainLayout title="Contact">
            <div className="h-screen bg-pwgreen-50 flex justify-center items-center">
                <div className="w-5/6 flex flex-col justify-center gap-5 lg:w-4/6 xl:w-3/6">
                    <h2 className="title text-2xl lg:text-3xl xl:text-5xl">
                        CONTACTANOS
                    </h2>
                    <div className="relative w-full group drop-shadow-md rounded-xl border border-pwgreen-300 shadow-xl p-6 lg:p-14">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="relative z-0 mb-6 w-full group">
                                <input
                                    type="text"
                                    id=""
                                    className="block py-2.5 px-0 w-full text-sm text-gray-700 bg-transparent border-0 border-b-2 border-pwgreen-500 appearance-none focus:outline-none focus:ring-0 focus:border-pwgreen-600 peer"
                                    placeholder=" "
                                    {...register('name', {
                                        required: {
                                            value: true,
                                            message:
                                                'Es necesario poner un nombre'
                                        },
                                        maxLength: 20
                                    })}
                                />
                                <label
                                    htmlFor="floating_password"
                                    className="peer-focus:font-medium absolute text-sm text-pwgreen-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-pwgreen-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Nombre
                                </label>
                                {errors?.name?.message && (
                                    <div
                                        className="text-sm text-red-600 py-2"
                                        role="alert">
                                        <p>Es necesario poner un nombre</p>
                                    </div>
                                )}
                            </div>
                            <div className="relative z-0 mb-6 w-full group">
                                <input
                                    type="text"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-700 bg-transparent border-0 border-b-2 border-pwgreen-300 appearance-none focus:outline-none focus:ring-0 focus:border-pwgreen-600 peer"
                                    placeholder=" "
                                    {...register('email', {
                                        required: {
                                            value: true,
                                            message:
                                                'Es necesario poner un nombre'
                                        },
                                        maxLength: 40
                                    })}
                                />
                                <label
                                    htmlFor="floating_email"
                                    className="peer-focus:font-medium absolute text-sm text-pwgreen-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-pwgreen-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Su email
                                </label>
                                {errors?.email?.message && (
                                    <div
                                        className="text-sm text-red-600 py-2"
                                        role="alert">
                                        <p>
                                            Es necesario poner un email válido
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className="relative z-0 mb-6 w-full group">
                                <input
                                    type="text"
                                    id=""
                                    className="block py-2.5 px-0 w-full text-sm text-gray-700 bg-transparent border-0 border-b-2 border-pwgreen-300 appearance-none focus:outline-none focus:ring-0 focus:border-pwgreen-600 peer"
                                    placeholder=" "
                                    {...register('message', {
                                        required: true,
                                        maxLength: 20
                                    })}
                                />
                                <label
                                    htmlFor="floating_repeat_password"
                                    className="peer-focus:font-medium absolute text-sm text-pwgreen-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-pwgreen-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Mensaje{' '}
                                </label>
                            </div>
                            <div className='flex justify-end items-center'>
                                {isLoading ? (
                                    <button
                                        type="button"
                                        className="dashboardButton text-base bg-pwgreen-600 text-pwgreen-50"
                                        disabled>
                                        Enviando...
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="dashboardButton text-base bg-pwgreen-600 text-pwgreen-50">
                                        Enviar
                                    </button>
                                )}
                            </div>

                            <div className="md:absolute -bottom-3.5 right-2 bg-pwgreen-600 text-pwgreen-50 w-80 px-8 rounded-md text-center text-sm shadow-md shadow-pwgreen-700 sm:mt-24">
                                <span className="mx-8"></span> Email de contacto
                                <span className="mx-8"></span>{' '}
                                pawsitiveteam0@gmail.com
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
export default Contact
