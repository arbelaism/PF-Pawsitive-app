import { E } from 'chart.js/dist/chunks/helpers.core';
import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query';
import { createUser, getUsers } from 'utils/dbFetching';

const FormCreateUser = () => {
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
  const [form, setForm] = useState({ ...formEstructure })

  //Manejar form

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    e.preventDefault()
    const name = e.target.name as string
    const value = e.target.value as string


    if (name === 'active' && value === "true") setForm({ ...form, [name]: true })
    if (name === 'active' && value === "false") setForm({ ...form, [name]: false })
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
  // const [enable, setEnable] = useState(false)


  const queryClient = useQueryClient()
  const mutation = useMutation((data: any) => createUser(data), {
    onSuccess: () => {
      queryClient.prefetchQuery("users", getUsers)
    }
  })
  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    if (form.firstName && form.lastName && form.email && form.address && form.phone)
      mutation.mutate(form)
    else return
  }
  return (
    <div className=' w-3/4'>

      <div className='container mx-auto flex justify-between py-5 border-b'>
        <div className='left flex gap-3'>
          <button
            className='text-center inline-flex items-center mr-2 w-full p-2 focus:outline-none border-4 bg-pwgreen-800 border-pwpurple-600 text-white hover:bg-pwpurple-600 focus:ring-4 font-medium rounded-lg'
            onClick={toggleCondition}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
            Agregar Usuario
          </button>

        </div>
      </div>

      {condition
        ? (<form action="">
          <div className='container w-full  flex flex-row gap-x-0.5 '>

            {/* COLUMNA 1 */}

            <div className='w-2/4'>
              <div className='input-type'>
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white"
                >
                  Nombre:
                </label>
                <input
                  id='firstName'
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder='Nombre'
                  className='border w-full px-5 py-3 focus:outline-none rounded-md'
                />
              </div>
              <div className='input-type'>
                <label
                  htmlFor="email"
                  className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white"
                >
                  Email:
                </label>
                <input
                  id='email'
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder='Email'
                  className='border w-full px-5 py-3 focus:outline-none rounded-md'
                />
              </div>
              <div className='input-type'>
                <label
                  htmlFor="birthday"
                  className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white"
                >
                  Fecha de Nacimiento:
                </label>
                <input
                  id='birthday'
                  type="date"
                  name="birthday"
                  value={form.birthday}
                  onChange={handleChange}
                  placeholder='Fecha de Nacimiento'
                  className='border w-full px-5 py-3 focus:outline-none rounded-md'
                />
              </div>
              <div className='input-type'>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white"
                >
                  Telefono:
                </label>
                <input
                  id='phone'
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder='Telefono'
                  className='border w-full px-5 py-3 focus:outline-none rounded-md'
                />
              </div>
              <div className='input-type'>
                <label
                  htmlFor="province"
                  className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white"
                >
                  Provincia:
                </label>
                <input
                  id='province'
                  type="text"
                  name="province"
                  value={form.province}
                  onChange={handleChange}
                  placeholder='Provincia/Estado'
                  className='border w-full px-5 py-3 focus:outline-none rounded-md'
                />
              </div>
              <div className='input-type'>
                <label
                  htmlFor="role"
                  className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white"
                >
                  Rol:
                </label>
                <select
                  id='role'
                  className='bg-gray-50 border border-pwpurple-300 text-gray-900 text-xs rounded-lg focus:ring-pwpurple-500 focus:border-pwpurple-500 p-2.5 w-full'
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                >
                  <option value="BASIC">BASICO</option>
                  <option value="PROFESSIONAL">PROFESIONAL</option>
                  <option value="ADMIN">ADMINISTRADOR</option>
                </select>
              </div>

            </div>
            {/* COLUMNA 2 */}

            <div className='w-2/4 ' >
              <div className='input-type'>
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white"
                >
                  Apellido:
                </label>
                <input
                  id='lastName'
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder='Apellido'
                  className='border w-full px-5 py-3 focus:outline-none rounded-md'
                />
              </div>
              <div className='input-type'>
                <label
                  htmlFor="gender"
                  className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white"
                >
                  Genero:
                </label>
                <input
                  id='gender'
                  type="text"
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  placeholder='Genero'
                  className='border w-full px-5 py-3 focus:outline-none rounded-md'
                />
              </div>
              <div className='input-type'>
                <label
                  htmlFor="address"
                  className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white"
                >
                  Direccion:
                </label>
                <input
                  id='address'
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder='Direccion'
                  className='border w-full px-5 py-3 focus:outline-none rounded-md'
                />
              </div>
              <div className='input-type'>
                <label
                  htmlFor="city"
                  className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white"
                >
                  Ciudad:
                </label>
                <input
                  id='city'
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder='Ciudad'
                  className='border w-full px-5 py-3 focus:outline-none rounded-md'
                />
              </div>
              <div className='input-type'>
                <label
                  htmlFor="postCode"
                  className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white"
                >
                  Correo Postal:
                </label>
                <input
                  id='postCode'
                  type="text"
                  name="postCode"
                  value={form.postCode}
                  onChange={handleChange}
                  placeholder='Codigo Postal'
                  className='border w-full px-5 py-3 focus:outline-none rounded-md'
                />
              </div>
              <div className='input-type '>
                <label
                  htmlFor="active"
                  className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white"
                >
                  Estado:
                </label>
                <select
                  className='bg-gray-50 border border-pwpurple-300 text-gray-900 text-xs rounded-lg focus:ring-pwpurple-500 focus:border-pwpurple-500 p-2.5 w-full'
                  id='firstName'
                  name="active"
                  value={form.active.toString()}

                  onChange={handleChange}
                >
                  <option value="true" className='bg-pwgreen-500 text-pwgreen-50 font-bold' >ACTIVO</option>
                  <option value="false" className='bg-pwpurple-500 text-pwpurple-50 font-bold'>DESACTIVADO</option>
                </select>
              </div>
            </div>

          </div>
          {/* IMAGEN */}

          <div className='container '>
            <div className='input-type'>
              <label
                htmlFor="photo"
                className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white"
              >
                Foto:
              </label>
              <input
                id='photo'
                type="text"
                name="photo"
                value={form.photo}
                onChange={handleChange}
                placeholder='Imagen'
                className='border w-full px-10 py-3 focus:outline-none rounded-md'
              />
            </div>
          </div>

          <button
            className='w-full p-2 focus:outline-none border-4 bg-pwgreen-800 border-pwpurple-600 text-white hover:bg-pwpurple-600 focus:ring-4 font-medium rounded-lg'
            type='submit'
            onClick={handleSubmit}>
            Registrar
          </button>
        </form>)
        : null}


    </div>
  )
}

export default FormCreateUser