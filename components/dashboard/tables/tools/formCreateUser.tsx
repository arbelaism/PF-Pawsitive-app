import React, { useState } from 'react'
import { alerts } from 'utils/alerts'
import { FaUserPlus } from 'react-icons/fa'

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

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        e.preventDefault()
        const name = e.target.name as string
        const value = e.target.value as string
        if (name === 'active' && value === 'true')
            setForm({ ...form, [name]: true })
        if (name === 'active' && value === 'false')
            setForm({ ...form, [name]: false })
        if (name === 'birthday') setForm({ ...form, [name]: value.toString() })
        else {
            setForm({ ...form, [name]: value })
        }
    }

    //Collapse/Expand Form

    const [condition, setCondition] = useState(false)

    function toggleCondition(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        if (condition === false) setForm({ ...formEstructure })
        setCondition(!condition)
    }

    //Submit Form

    function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        if (form.lastName && form.firstName && form.email) {
            setCondition(!condition)
            mutationCreate.mutate(form)
            return alerts({
                icon: 'info',
                title: '<strong>Se registro el Usuario Exitosamente </strong>',
                text: 'Registered User',
                toast: true
            })
        } else
            return alerts({
                icon: 'error',
                title: '<strong>Falta completar datos</strong>',
                text: "Can't Register User",
                toast: true
            })
    }

    return (
        <div className="w-max">
            <div className="left flex gap-3">
                <button
                    className="dashboardButton text-base font-base border border-transparent shadow-lg bg-pwgreen-800 text-pwgreen-50 hover:bg-pwgreen-100 hover:text-pwgreen-800 hover:border-pwgreen-800 transition-colors"
                    onClick={toggleCondition}>
                    <FaUserPlus />
                    Agregar Usuario
                </button>
            </div>

            {condition ? (
                <form action="">
                    <div className="container w-full  flex flex-row gap-x-0.5 ">
                        {/* COLUMNA 1 */}

                        <div className="w-2/4">
                            <div className="input-type">
                                <label
                                    htmlFor="firstName"
                                    className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white">
                                    Nombre:
                                </label>
                                <input
                                    id="firstName"
                                    type="text"
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={handleChange}
                                    placeholder="Nombre"
                                    className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                />
                            </div>
                            <div className="input-type">
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white">
                                    Email:
                                </label>
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                />
                            </div>
                            <div className="input-type">
                                <label
                                    htmlFor="birthday"
                                    className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white">
                                    Fecha de Nacimiento:
                                </label>
                                <input
                                    id="birthday"
                                    type="date"
                                    name="birthday"
                                    value={form.birthday}
                                    onChange={handleChange}
                                    placeholder="Fecha de Nacimiento"
                                    className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                />
                            </div>
                            <div className="input-type">
                                <label
                                    htmlFor="phone"
                                    className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white">
                                    Telefono:
                                </label>
                                <input
                                    id="phone"
                                    type="text"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="Telefono"
                                    className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                />
                            </div>
                            <div className="input-type">
                                <label
                                    htmlFor="province"
                                    className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white">
                                    Provincia:
                                </label>
                                <input
                                    id="province"
                                    type="text"
                                    name="province"
                                    value={form.province}
                                    onChange={handleChange}
                                    placeholder="Provincia/Estado"
                                    className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                />
                            </div>
                            <div className="input-type">
                                <label
                                    htmlFor="role"
                                    className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white">
                                    Rol:
                                </label>
                                <select
                                    id="role"
                                    className="bg-gray-50 border border-pwpurple-300 text-gray-900 text-xs rounded-lg focus:ring-pwpurple-500 focus:border-pwpurple-500 p-2.5 w-full"
                                    name="role"
                                    value={form.role}
                                    onChange={handleChange}>
                                    <option value="BASIC">BASICO</option>
                                    <option value="PROFESSIONAL">
                                        PROFESIONAL
                                    </option>
                                    <option value="ADMIN">ADMINISTRADOR</option>
                                </select>
                            </div>
                        </div>
                        {/* COLUMNA 2 */}

                        <div className="w-2/4 ">
                            <div className="input-type">
                                <label
                                    htmlFor="lastName"
                                    className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white">
                                    Apellido:
                                </label>
                                <input
                                    id="lastName"
                                    type="text"
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    placeholder="Apellido"
                                    className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                />
                            </div>
                            <div className="input-type">
                                <label
                                    htmlFor="gender"
                                    className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white">
                                    Genero:
                                </label>
                                <input
                                    id="gender"
                                    type="text"
                                    name="gender"
                                    value={form.gender}
                                    onChange={handleChange}
                                    placeholder="Genero"
                                    className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                />
                            </div>
                            <div className="input-type">
                                <label
                                    htmlFor="address"
                                    className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white">
                                    Direccion:
                                </label>
                                <input
                                    id="address"
                                    type="text"
                                    name="address"
                                    value={form.address}
                                    onChange={handleChange}
                                    placeholder="Direccion"
                                    className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                />
                            </div>
                            <div className="input-type">
                                <label
                                    htmlFor="city"
                                    className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white">
                                    Ciudad:
                                </label>
                                <input
                                    id="city"
                                    type="text"
                                    name="city"
                                    value={form.city}
                                    onChange={handleChange}
                                    placeholder="Ciudad"
                                    className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                />
                            </div>
                            <div className="input-type">
                                <label
                                    htmlFor="postCode"
                                    className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white">
                                    Correo Postal:
                                </label>
                                <input
                                    id="postCode"
                                    type="text"
                                    name="postCode"
                                    value={form.postCode}
                                    onChange={handleChange}
                                    placeholder="Codigo Postal"
                                    className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                />
                            </div>
                            <div className="input-type ">
                                <label
                                    htmlFor="active"
                                    className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white">
                                    Estado:
                                </label>
                                <select
                                    className="bg-gray-50 border border-pwpurple-300 text-gray-900 text-xs rounded-lg focus:ring-pwpurple-500 focus:border-pwpurple-500 p-2.5 w-full"
                                    id="firstName"
                                    name="active"
                                    value={form.active.toString()}
                                    onChange={handleChange}>
                                    <option
                                        value="true"
                                        className="bg-pwgreen-500 text-pwgreen-50 font-bold">
                                        ACTIVO
                                    </option>
                                    <option
                                        value="false"
                                        className="bg-pwpurple-500 text-pwpurple-50 font-bold">
                                        DESACTIVADO
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {/* IMAGEN */}

                    <div className="container ">
                        <div className="input-type">
                            <label
                                htmlFor="photo"
                                className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white">
                                Foto:
                            </label>
                            <input
                                id="photo"
                                type="text"
                                name="photo"
                                value={form.photo}
                                onChange={handleChange}
                                placeholder="Imagen"
                                className="border w-full px-10 py-3 focus:outline-none rounded-md"
                            />
                        </div>
                    </div>

                    <button
                        className="w-full p-2 focus:outline-none border-4 bg-pwgreen-800 border-pwpurple-600 text-white hover:bg-pwpurple-600 focus:ring-4 font-medium rounded-lg"
                        type="submit"
                        onClick={handleSubmit}>
                        Registrar
                    </button>
                </form>
            ) : null}
        </div>
    )
}

export default FormCreateUser
