import { NextComponentType } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import IsoGreen from 'public/iso-green.svg'
import { IUserForm, Role } from 'app/types'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation } from 'react-query'
import { calculateAge } from 'utils/calculateAge'
import { registerUser } from 'utils/dbFetching'

const SignUp: NextComponentType = () => {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors }
    } = useForm<IUserForm>()

    console.log(getValues('password'))

    const { mutate, error, isLoading } = useMutation(registerUser)

    const onSubmit: SubmitHandler<IUserForm> = async data => {
        data = { ...data, role: 'USER', active: true }
        mutate(data)
        console.log(data)

        alert('success?')
    }

    return (
        <div className="p-8 flex flex-col justify-evenly items-center bg-pwgreen-100 rounded-lg md:flex-row">
            <div className="w-full flex flex-col gap-3 justify-center items-center md:w-2/6">
                <Image
                    src={IsoGreen}
                    alt="not found"
                    width={150}
                    height={150}
                />
                <h2 className="font-Rubik font-bold text-4xl lg:text-6xl">
                    ¡Registrate!
                </h2>
                <p className="text-md mb-2 md:text-xl md:text-center">
                    Registrate para acceder a todos los beneficios de{' '}
                    <span className="font-Rubik text-pwgreen-900">
                        Paw<span className="font-bold">sitive</span>
                    </span>
                </p>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full grid grid-cols-1 gap-2 items-center justify-center md:w-3/6 lg:gap-3">
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    <div className="flex flex-col gap-1 items-start justify-center">
                        <label htmlFor="name" className="label">
                            Nombres <span className="text-pwpurple-800">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="John"
                            className={
                                //TODO: FIX
                                '' + !Object.hasOwn(errors, 'name')
                                    ? 'input border-red-500'
                                    : 'input border-blue-400'
                            }
                            {...register('name', {
                                required: true,
                                maxLength: 100,
                                pattern: /[a-zA-Z\s:]/
                            })}
                        />
                        {(errors.name?.type === 'required' && (
                            <span className="text-red-500 text-xs">
                                Completa tu nombre, por favor.
                            </span>
                        )) ||
                            (errors.name?.type === 'maxLength' && (
                                <span className="text-red-500 text-xs">
                                    Tu nombre no puede contener mas de 100
                                    caracteres
                                </span>
                            )) ||
                            (errors.name?.type === 'pattern' && (
                                <span className="text-red-500 text-xs">
                                    Tu nombre no puede contener caracteres
                                    especiales!
                                </span>
                            ))}
                    </div>
                    <div className="flex gap-1 flex-col items-start justify-center">
                        <label htmlFor="lastName" className="label">
                            Apellidos{' '}
                            <span className="text-pwpurple-800">*</span>
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            placeholder="Doe"
                            className="input"
                            {...register('lastName', {
                                required: true,
                                maxLength: 100,
                                pattern: /[a-zA-Z\s:]/
                            })}
                        />
                        {(errors.lastName?.type === 'required' && (
                            <span className="text-red-500 text-xs">
                                Completa tu apellido, por favor.
                            </span>
                        )) ||
                            (errors.lastName?.type === 'maxLength' && (
                                <span className="text-red-500 text-xs">
                                    Tu apellido no puede contener mas de 100
                                    caracteres
                                </span>
                            )) ||
                            (errors.lastName?.type === 'pattern' && (
                                <span className="text-red-500 text-xs">
                                    Tu apellido no puede contener caracteres
                                    especiales!
                                </span>
                            ))}
                    </div>
                </div>
                <div className="flex gap-1 flex-col items-start justify-center">
                    <label htmlFor="email" className="label">
                        Correo electrónico
                        <span className="text-pwpurple-800">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="johndoe@example.com"
                        className="input"
                        {...register('email', {
                            required: true,
                            pattern: /\S+@\S+\.\S+/
                        })}
                    />
                    {(errors.email?.type === 'required' && (
                        <span className="text-red-500 text-xs">
                            Completa tu email, por favor.
                        </span>
                    )) ||
                        (errors.email?.type === 'pattern' && (
                            <span className="text-red-500 text-xs">
                                Tu email es incorrecto.
                            </span>
                        ))}
                </div>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    <div className="w-full flex gap-1 flex-col items-start justify-center">
                        <label htmlFor="birthday" className="label">
                            Fecha de nacimiento
                            <span className="text-pwpurple-800">*</span>
                        </label>
                        <input
                            type="date"
                            id="birthday"
                            placeholder="Fecha de nacimiento"
                            className="input"
                            {...register('birthday', {
                                required: true,
                                validate: val => calculateAge(val) >= 18
                            })}
                        />
                        {(errors.birthday?.type === 'required' && (
                            <span className="text-red-500 text-xs">
                                Completa tu fecha de nacimiento.
                            </span>
                        )) ||
                            (errors.birthday?.type === 'validate' && (
                                <span className="text-red-500 text-xs">
                                    Tenés que ser mayor de 18 años para poder
                                    registrarte.
                                </span>
                            ))}
                    </div>
                    <div className="w-full flex gap-1 flex-col items-start justify-center">
                        <label htmlFor="gender" className="label">
                            Genero
                        </label>
                        <select name="gender" className="input bg-white">
                            <option value="none">Seleccionar</option>
                            <option value="male">Hombre</option>
                            <option value="female">Mujer</option>
                            <option value="personal">
                                Prefiero no decirlo
                            </option>
                        </select>
                    </div>
                </div>
                <div className="flex gap-1 flex-col items-start justify-center">
                    <label htmlFor="nationality" className="label">
                        Nacionalidad
                    </label>
                    <input
                        type="text"
                        name="nationality"
                        placeholder="Argentina"
                        className="input"
                    />
                </div>
                <div className="flex gap-1 flex-col items-start justify-center">
                    <label htmlFor="password" className="label">
                        Contraseña <span className="text-pwpurple-800">*</span>
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Contraseña"
                        className="input"
                        {...register('password', {
                            required: true,
                            pattern:
                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
                        })}
                    />
                    {(errors.password?.type === 'required' && (
                        <span className="text-red-500 text-xs">
                            Ingresa una contraseña
                        </span>
                    )) ||
                        (errors.password?.type === 'pattern' && (
                            <span className="text-red-500 text-xs">
                                Por motivos de seguridad tu contraseña debe
                                contener:
                                <ul className="mx-6">
                                    <li className="list-disc">
                                        Al menos 8 caracteres
                                    </li>
                                    <li className="list-disc">
                                        Al menos una letra mayuscula
                                    </li>
                                    <li className="list-disc">
                                        Al menos un número
                                    </li>
                                </ul>
                            </span>
                        ))}
                </div>
                <div className="flex gap-1 flex-col items-start justify-center">
                    <label htmlFor="confirmPassword" className="label">
                        Confirmar contraseña{' '}
                        <span className="text-pwpurple-800">*</span>
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Contraseña"
                        className="input"
                        {...register('confirmPassword', {
                            required: true,
                            validate: val => getValues('password') === val
                        })}
                    />
                    {(errors.confirmPassword?.type === 'required' && (
                        <span className="text-red-500 text-xs">
                            Te falta rellenar este campo
                        </span>
                    )) ||
                        (errors.confirmPassword?.type === 'validate' && (
                            <span className="text-red-500 text-xs">
                                Tus contraseñas no coinciden
                            </span>
                        ))}
                </div>
                <button
                    type="submit"
                    className="text-center bg-pwgreen-500 py-3 my-2 rounded-md shadow-xl text-pwgreen-900 font-bold uppercase font-Rubik">
                    Registrarse
                </button>
                <div className="flex justify-center items-center">
                    <span>Ya tenés cuenta?&nbsp;</span>
                    <Link href={'/api/auth/login'}>
                        <a className="underline text-pwgreen-500">
                            Iniciar sesión
                        </a>
                    </Link>
                </div>
            </form>
        </div>
    )
}
export default SignUp
