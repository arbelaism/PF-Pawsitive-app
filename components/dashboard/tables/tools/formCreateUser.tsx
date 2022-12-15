import React, { useState } from 'react'
import { alerts } from 'utils/alerts'
import { mediaUploader } from 'utils/mediaUploader'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FaUserPlus, FaFileImage } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { Modal } from 'components'

interface FormEstructure {
    firstName: string
    lastName: string
    email: string
    gender: string
    birthday: string
    address: string
    phone: string
    city: string
    province: string
    postCode: string
    photo: string
    role: string
    active: boolean
}

const FormCreateUser = (mutationCreate: any) => {
    const formEstructure = {
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        birthday: '',
        address: '',
        phone: '',
        city: '',
        province: '',
        postCode: '',
        photo: '',
        role: 'BASIC',
        active: true
    }

    //Manejar form

    const [form, setForm] = useState<FormEstructure>({ ...formEstructure })

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormEstructure>()
    const [media, setMedia] = useState<File[]>([])
    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        const target = e.target as HTMLInputElement
        const files = [...Object.values(target.files!)]
        setMedia([...files])
    }

    //Collapse/Expand Form

    const [condition, setCondition] = useState(false)

    function toggleCondition(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        if (condition === false) setForm({ ...formEstructure })
        setCondition(!condition)
    }
    const onSubmit: SubmitHandler<FormEstructure> = async data => {
        let urlPhoto: any = []
        if (media.length > 0) {
            urlPhoto = await mediaUploader(media)
        }
        data = { ...data, photo: urlPhoto ? urlPhoto[0] : null }
        data.phone = String(data.phone.match('[0-9]+'))
        data.active = String(data.active) === 'true' ? true : false
        if (underAgeValidate(data.birthday, 12)) {
            if (validate(data.email)) {
                setCondition(!condition)
                mutationCreate.mutate(data)
            } else {
                alerts({
                    icon: 'info',
                    title: '<strong>Email</strong>',
                    text: 'Email inválido',
                    toast: true
                })
            }
        } else {
            alerts({
                icon: 'info',
                title: '<strong>Email</strong>',
                text: 'La Edad mínima es 12 años',
                toast: true
            })
        }
    }
    function underAgeValidate(birthday: string, minAge: number): boolean {
        let optimizedBirthday = birthday.replace(/-/g, '/')
        var myBirthday = Number(new Date(optimizedBirthday))
        // calculate age comparing current date and birthday
        var myAge = ~~((Date.now() - myBirthday) / 31557600000)
        if (myAge < minAge) {
            return false
        } else {
            return true
        }
    }
    const validate = (email: string): boolean => {
        const expression =
            /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i
        return expression.test(String(email).toLowerCase())
    }
    return (
        <div>
            <div>
                <div className="flex gap-3">
                    <button
                        className="dashboardButton text-base bg-pwgreen-700 text-pwgreen-50 hover:bg-pwgreen-800 transition-colors"
                        onClick={toggleCondition}>
                        <FaUserPlus />
                        Agregar Usuario
                    </button>
                </div>
            </div>
            {condition ? (
                <Modal>
                    <h1 className="text-2xl mb-3 font-semibold lg:text-3xl">
                        Crear nuevo usuario
                    </h1>
                    <button
                        onClick={toggleCondition}
                        className="absolute top-5 right-5 text-3xl text-pwgreen-800 cursor-pointer hover:bg-pwgreen-800 hover:text-pwgreen-50 transition-all hover:rotate-90 hover:rounded-full">
                        <IoClose />
                    </button>
                    <div className="overflow-y-visible">
                        <form action="" onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
                                <div className="input-type">
                                    <label
                                        htmlFor="firstName"
                                        className="label">
                                        Nombre:
                                    </label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        placeholder="Nombre"
                                        className="input"
                                        {...register('firstName', {
                                            required: {
                                                value: true,
                                                message:
                                                    'Es necesario poner un nombre'
                                            },
                                            maxLength: 20
                                        })}
                                    />
                                    {errors?.firstName?.message && (
                                        <div
                                            className="bg-pwgreen-800 border-l-2 border-r-2  border4 border-white text-white p-2"
                                            role="alert">
                                            <p>Es necesario poner un nombre</p>
                                        </div>
                                    )}
                                </div>
                                <div className="input-type">
                                    <label htmlFor="lastName" className="label">
                                        Apellido:
                                    </label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        {...register('lastName', {
                                            required: {
                                                value: true,
                                                message: 'Error'
                                            },
                                            maxLength: 20
                                        })}
                                        placeholder="Apellido"
                                        className="input"
                                    />
                                    {errors?.lastName?.message && (
                                        <div
                                            className="bg-pwgreen-800 border-l-2 border-r-2  border4 border-white text-white p-2"
                                            role="alert">
                                            <p>
                                                Es necesario poner un apellido
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div className="input-type">
                                    <label htmlFor="email" className="label">
                                        Email:
                                    </label>
                                    <input
                                        id="email"
                                        type="text"
                                        placeholder="Email"
                                        className="input"
                                        {...register('email', {
                                            required: {
                                                value: true,
                                                message:
                                                    'Es necesario poner un email'
                                            },
                                            maxLength: 40
                                        })}
                                    />
                                    {errors?.email?.message && (
                                        <div
                                            className="bg-pwgreen-800 border-l-2 border-r-2  border4 border-white text-white p-2"
                                            role="alert">
                                            <p>Es necesario poner un nombre</p>
                                        </div>
                                    )}
                                </div>
                                <div className="input-type">
                                    <label htmlFor="birthday" className="label">
                                        Fecha de Nacimiento:
                                    </label>
                                    <input
                                        id="birthday"
                                        type="date"
                                        {...register('birthday', {
                                            required: {
                                                value: true,
                                                message:
                                                    'Es necesario poner un email'
                                            },
                                            maxLength: 20
                                        })}
                                        placeholder="Fecha de Nacimiento"
                                        className="input"
                                    />
                                    {errors?.birthday?.message && (
                                        <div
                                            className="bg-pwgreen-800 border-l-2 border-r-2  border4 border-white text-white p-2"
                                            role="alert">
                                            <p>
                                                Es necesario poner una fecha de
                                                nacimiento
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div className="input-type">
                                    <label htmlFor="number" className="label">
                                        Telefono:
                                    </label>
                                    <input
                                        id="phone"
                                        type="text"
                                        {...register('phone', {
                                            required: {
                                                value: true,
                                                message:
                                                    'Es necesario poner una teléfono'
                                            },
                                            maxLength: 20
                                        })}
                                        placeholder="Telefono"
                                        className="input"
                                    />
                                    {errors?.phone?.message && (
                                        <div
                                            className="bg-pwgreen-800 border-l-2 border-r-2  border4 border-white text-white p-2"
                                            role="alert">
                                            <p>
                                                Es necesario poner un teléfono
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="input-type">
                                    <label htmlFor="gender" className="label">
                                        Genero:
                                    </label>
                                    <input
                                        id="gender"
                                        type="text"
                                        {...register('gender', {
                                            required: {
                                                value: true,
                                                message: 'Error'
                                            },
                                            maxLength: 20
                                        })}
                                        placeholder="Genero"
                                        className="input"
                                    />
                                    {errors?.gender?.message && (
                                        <div
                                            className="bg-pwgreen-800 border-l-2 border-r-2  border4 border-white text-white p-2"
                                            role="alert">
                                            <p>Es necesario poner un género</p>
                                        </div>
                                    )}
                                </div>

                                <div className="input-type">
                                    <label htmlFor="address" className="label">
                                        Direccion:
                                    </label>
                                    <input
                                        id="address"
                                        type="text"
                                        {...register('address', {
                                            required: false,
                                            maxLength: 60
                                        })}
                                        placeholder="Direccion"
                                        className="input"
                                    />
                                </div>
                                <div className="input-type">
                                    <label htmlFor="postCode" className="label">
                                        Código Postal:
                                    </label>
                                    <input
                                        id="postCode"
                                        type="text"
                                        {...register('postCode', {
                                            required: {
                                                value: true,
                                                message:
                                                    'Es necesario poner una ciudad'
                                            },
                                            maxLength: 20
                                        })}
                                        placeholder="Codigo Postal"
                                        className="input"
                                    />
                                    {errors?.postCode?.message && (
                                        <div
                                            className="bg-pwgreen-800 border-l-2 border-r-2  border4 border-white text-white p-2"
                                            role="alert">
                                            <p>
                                                Es necesario poner un Codigo
                                                Postal
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="input-type">
                                    <label htmlFor="city" className="label">
                                        Ciudad:
                                    </label>
                                    <input
                                        id="city"
                                        type="text"
                                        {...register('city', {
                                            required: {
                                                value: true,
                                                message: 'Error'
                                            },
                                            maxLength: 20
                                        })}
                                        placeholder="Ciudad"
                                        className="input"
                                    />
                                    {errors?.city?.message && (
                                        <div
                                            className="bg-pwgreen-800 border-l-2 border-r-2  border4 border-white text-white p-2"
                                            role="alert">
                                            <p>Es necesario poner una ciudad</p>
                                        </div>
                                    )}
                                </div>
                                <div className="input-type">
                                    <label htmlFor="province" className="label">
                                        Provincia:
                                    </label>
                                    <input
                                        id="province"
                                        type="text"
                                        {...register('province', {
                                            required: false,
                                            maxLength: 20
                                        })}
                                        placeholder="Provincia/Estado"
                                        className="input"
                                    />
                                </div>
                                <div className="input-type">
                                    <label htmlFor="role" className="label">
                                        Rol:
                                    </label>
                                    <select
                                        id="role"
                                        className="input"
                                        {...register('role', {
                                            required: {
                                                value: true,
                                                message:
                                                    'Es necesario poner un rol'
                                            }
                                        })}>
                                        <option value="BASIC">BASICO</option>
                                        <option value="PROFESSIONAL">
                                            PROFESIONAL
                                        </option>
                                        <option value="ADMIN">
                                            ADMINISTRADOR
                                        </option>
                                    </select>
                                </div>

                                <div className="input-type ">
                                    <label htmlFor="active" className="label">
                                        Estado:
                                    </label>
                                    <select
                                        className="input"
                                        id="firstName"
                                        {...register('active', {
                                            required: {
                                                value: true,
                                                message:
                                                    'Es necesario poner una ciudad'
                                            }
                                        })}>
                                        <option
                                            value="true"
                                            className="bg-pwgreen-500 text-pwgreen-50 font-bold">
                                            ACTIVO
                                        </option>
                                        <option
                                            value="false"
                                            className="bg-pwpurple-500 text-pwpurple-50 font-bold">
                                            INACTIVO
                                        </option>
                                    </select>
                                </div>
                            </div>
                            {/* IMAGEN */}
                            <div className="flex flex-col items-center">
                                <label
                                    htmlFor="photo"
                                    className="w-full bg-white my-3 py-3 flex items-center justify-center gap-3 text-base text-pwgreen-800 rounded-lg cursor-pointer border border-pwgreen-400 shadow-xl hover:bg-pwgreen-700 hover:text-pwgreen-50 transition-all">
                                    <FaFileImage /> Seleccionar
                                </label>
                                <input
                                    onChange={e => handleChange(e)}
                                    className="hidden"
                                    id="photo"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                />
                                <button
                                    className="w-full font-Rubik py-3 bg-pwgreen-700 text-pwgreen-50 hover:bg-pwgreen-800 font-semibold uppercase rounded-lg shadow-2xl"
                                    type="submit">
                                    Registrar
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>
            ) : null}
        </div>
    )
}

export default FormCreateUser
