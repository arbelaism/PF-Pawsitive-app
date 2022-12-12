import * as React from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getUsers, putUsers, createUser } from 'utils/dbFetching'
import { Users } from 'app/types'
import { useSortableData, useSearchData, FormCreateUser } from '../tools' //sort function
import Image from 'next/image'
import AlternativePagination from 'components/layout/AlternativePagination'
import { TbSearch } from 'react-icons/tb'
import { FaSort } from 'react-icons/fa'

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
}

const TableUser = () => {
    //QUERY DATA GET AND PUT
    const { data: users, isLoading, isSuccess } = useQuery(['users'], getUsers)

    const queryClient = useQueryClient()

    const mutation = useMutation(({ id, data }: any) => putUsers(id, data), {
        onSuccess: () => {
            queryClient.prefetchQuery('users', getUsers)
        }
    })

    const mutationCreate = useMutation((data: any) => createUser(data), {
        onSuccess: () => {
            queryClient.prefetchQuery('users', getUsers)
        }
    })

    //Sort Table

    const { items, requestSort, sortConfig } = useSortableData(users)

    //FUNCTIONS CHANGE DATA
    function handleRoleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault()
        const role = e.target.value as string
        const id = e.target.id as string
        if (role && id) {
            mutation.mutate({ id, data: { role } })
            return
        } else return
    }

    function handleActiveChange(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault()
        const active = e.target.value
        const id = e.target.id as string
        if (active === 'false' && id) {
            mutation.mutate({ id, data: { active: false } })
            return
        } else {
            mutation.mutate({ id, data: { active: true } })
            return
        }
    }

    //Collapsing table
    const [rowExpande, setRowExpande] = React.useState<string | null>(null)

    function toggleExpander(e: any) {
        // e.preventDefault()
        const key = e
        if (key !== rowExpande) setRowExpande(key)
        else setRowExpande(null)
    }

    // Searach Values
    const [searchVal, setSearchVal] = React.useState(null)

    const { filteredData, loading } = useSearchData({
        searchVal,
        retrieve: items
    })

    //Pagination
    const [currentPage, setCurrentPage] = React.useState<number>(1)
    const [itemsPerPage, _setItemsPerPage] = React.useState<number>(6)
    const lastItemIndex = currentPage * itemsPerPage
    const firstItemIndex = lastItemIndex - itemsPerPage
    let currentItems: Users[] = []
    if (filteredData)
        currentItems = [...filteredData?.slice(firstItemIndex, lastItemIndex)]

    // UPLOAD USER
    const dataEstructure = {
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
        photo: ''
    }
    const [uploadUser, setUploadUser] = React.useState(null)
    const [userUpdate, setUserUpdate] = React.useState<FormEstructure>({
        ...dataEstructure
    })

    function toggleUpload(e: any) {
        // e.preventDefault()
        const key = e
        console.log(uploadUser)
        if (key !== uploadUser) {
            setUserUpdate({ ...dataEstructure })
            setUploadUser(key)
        } else setUploadUser(null)
    }
    function handleInputDataChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        setUserUpdate({ ...userUpdate, [name]: value })
        return
    }

    function handlerSubmitUserUpdate(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        const newObj: any = {}
        for (const [key, value] of Object.entries(userUpdate)) {
            if (value !== '') {
                newObj[key] = value
            }
        }
        mutation.mutate({ id: uploadUser, data: newObj })
        setUploadUser(null)
    }

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mx-5">
                <form>
                    <div className="relative w-full">
                        <div className="text-slate-400 absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <TbSearch />
                        </div>
                        <input
                            type="search"
                            id="search"
                            className="input pl-9 py-3"
                            placeholder="Buscar..."
                            onChange={(e: any) => setSearchVal(e.target.value)}
                        />
                    </div>
                </form>
                <FormCreateUser
                    mutationCreate={mutationCreate}
                    uploadUser={uploadUser}
                />
            </div>
            <div className="flex flex-row justify-center w-full my-4">
                {!isLoading && currentItems ? (
                    <AlternativePagination
                        totalItems={
                            (filteredData ? filteredData : users)?.length
                        }
                        itemsPerPage={itemsPerPage}
                        setCurrentPage={setCurrentPage}
                    />
                ) : null}
            </div>

            <div className="overflow-x-auto mx-5 rounded-md relative shadow-lg">
                <table className="w-full table-auto text-sm">
                    {/* NOMBRES DE LA TABLA */}
                    <thead>
                        <tr className="tr-head">
                            <th>ID</th>
                            <th className="th-head">
                                <button
                                    className="button-head"
                                    type="button"
                                    onClick={() => requestSort('firstName')}>
                                    NOMBRE
                                    <FaSort />
                                </button>
                            </th>
                            <th className="th-head">
                                <button
                                    className="button-head"
                                    type="button"
                                    onClick={() => requestSort('lastName')}>
                                    APELLIDO
                                    <FaSort />
                                </button>
                            </th>

                            <th className="th-head">
                                <button
                                    className="button-head"
                                    type="button"
                                    onClick={() => requestSort('email')}>
                                    EMAIL
                                    <FaSort />
                                </button>
                            </th>
                            <th>GENERO</th>
                            <th>FECHA DE NACIMIENTO</th>
                            <th>ROL</th>
                            <th>ESTADO</th>
                            <th className="th-head">
                                <button
                                    className="button-head"
                                    type="button"
                                    onClick={() => requestSort('createdAt')}>
                                    REGISTRADO
                                    <FaSort />
                                </button>
                            </th>
                            <th></th>
                        </tr>
                    </thead>

                    {/* DATOS DE LA TABLA */}

                    <tbody className="bg-pwgreen-200 text-sm">
                        {isSuccess
                            ? currentItems.map((u: Users) => {
                                  return (
                                      <>
                                          <tr
                                              key={u.id}
                                              className="bg-pawgreen-50 text-center">
                                              <td className="px-16 py-2 flex flex-col items-center">
                                                  <div>
                                                      {u.photo.length ? (
                                                          <Image
                                                              src={u.photo}
                                                              alt={
                                                                  u.lastName ||
                                                                  'no image'
                                                              }
                                                              width={100}
                                                              height={100}
                                                          />
                                                      ) : (
                                                          <span className="text-center ml-2 font-semibold">
                                                              No image
                                                          </span>
                                                      )}
                                                  </div>
                                                  <div className="flex flex-col items-center content-center">
                                                      <span className="text-center text-ellipsis overflow-hidden ml-2 font-semibold">
                                                          {u.id}
                                                      </span>
                                                  </div>
                                              </td>

                                              {uploadUser === u.id ? (
                                                  <>
                                                      <td className="px-5 py-2">
                                                          <input
                                                              type="text"
                                                              placeholder={
                                                                  u.firstName ||
                                                                  'No hay datos'
                                                              }
                                                              name="firstName"
                                                              value={
                                                                  userUpdate.firstName
                                                              }
                                                              onChange={
                                                                  handleInputDataChange
                                                              }
                                                          />
                                                      </td>
                                                      <td className="px-5 py-2">
                                                          <input
                                                              className=" w-fit"
                                                              type="text"
                                                              placeholder={
                                                                  u.lastName ||
                                                                  'No hay datos'
                                                              }
                                                              name="lastName"
                                                              value={
                                                                  userUpdate.lastName
                                                              }
                                                              onChange={
                                                                  handleInputDataChange
                                                              }
                                                          />
                                                      </td>
                                                      <td className="px-5 py-2">
                                                          <input
                                                              type="text"
                                                              placeholder={
                                                                  u.email ||
                                                                  'No hay datos'
                                                              }
                                                              name="email"
                                                              value={
                                                                  userUpdate.email
                                                              }
                                                              onChange={
                                                                  handleInputDataChange
                                                              }
                                                          />
                                                      </td>
                                                      <td className="px-5 py-2">
                                                          <input
                                                              type="text"
                                                              placeholder={
                                                                  u.gender ||
                                                                  'No hay datos'
                                                              }
                                                              name="gender"
                                                              value={
                                                                  userUpdate.gender
                                                              }
                                                              onChange={
                                                                  handleInputDataChange
                                                              }
                                                          />
                                                      </td>
                                                      <td className="px-5 py-2">
                                                          <input
                                                              type="text"
                                                              placeholder={
                                                                  u.birthday ||
                                                                  'No hay datos'
                                                              }
                                                              name="birthday"
                                                              value={
                                                                  userUpdate.birthday
                                                              }
                                                              onChange={
                                                                  handleInputDataChange
                                                              }
                                                          />
                                                      </td>
                                                  </>
                                              ) : (
                                                  <>
                                                      <td className="px-5 py-2">
                                                          {u.firstName ||
                                                              'No hay Datos'}
                                                      </td>
                                                      <td className="px-5 py-2">
                                                          {u.lastName ||
                                                              'No hay Datos'}
                                                      </td>
                                                      <td className="px-5 py-2">
                                                          {u.email ||
                                                              'No hay Datos'}
                                                      </td>
                                                      <td className="px-5 py-2">
                                                          {u.gender ||
                                                              'No hay Datos'}
                                                      </td>
                                                      <td className="px-5 py-2">
                                                          {u.birthday ||
                                                              'No hay Datos'}
                                                      </td>
                                                  </>
                                              )}

                                              <td className="px-5 py-2">
                                                  <select
                                                      className="input"
                                                      name="role"
                                                      value={u.role}
                                                      id={u.id}
                                                      onChange={
                                                          handleRoleChange
                                                      }>
                                                      <option value="BASIC">
                                                          BASICO
                                                      </option>
                                                      <option value="PROFESSIONAL">
                                                          PROFESIONAL
                                                      </option>
                                                      <option value="ADMIN">
                                                          ADMINISTRADOR
                                                      </option>
                                                  </select>
                                              </td>
                                              <td className="px-5 py-2">
                                                  <select
                                                      className="input"
                                                      name="active"
                                                      value={u.active.toString()}
                                                      id={u.id}
                                                      onChange={e =>
                                                          handleActiveChange(e)
                                                      }>
                                                      <option value="true">
                                                          ACTIVO
                                                      </option>
                                                      <option value="false">
                                                          DESACTIVADO
                                                      </option>
                                                  </select>
                                              </td>
                                              <td className="px-5 py-2">
                                                  {u.createdAt}
                                              </td>

                                              {/* BOTONES PARA MODIFICAR USUARIOS Y COLAPSE/EXPANDE TABLE */}

                                              <td className="px-2 py-2 flex flex-row space-x-3">
                                                  {/* BOTON UPLOAD */}

                                                  <button
                                                      className="p-1 text-xs focus:outline-none border-4 border-pwpurple-600 text-pwgreen-50 hover:bg-pwpurple-600 focus:ring-4 font-medium rounded-lg bg-pwgreen-700 "
                                                      type="button"
                                                      name={u.id}
                                                      onClick={() =>
                                                          toggleUpload(u.id)
                                                      }>
                                                      <svg
                                                          className="w-6 h-6"
                                                          fill="none"
                                                          stroke="currentColor"
                                                          viewBox="0 0 24 24"
                                                          xmlns="http://www.w3.org/2000/svg">
                                                          <path
                                                              strokeLinecap="round"
                                                              strokeLinejoin="round"
                                                              strokeWidth="2"
                                                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                                                      </svg>
                                                  </button>

                                                  {/* BOTON GUARDAR */}
                                                  {uploadUser === u.id ? (
                                                      <button
                                                          className="p-1 text-xs focus:outline-none border-4 border-pwpurple-600 text-pwgreen-50 hover:bg-pwpurple-600 focus:ring-4 font-medium rounded-lg bg-pwgreen-700 "
                                                          type="button"
                                                          name={u.id}
                                                          onClick={e =>
                                                              handlerSubmitUserUpdate(
                                                                  e
                                                              )
                                                          }>
                                                          <svg
                                                              className="w-6 h-6"
                                                              fill="none"
                                                              stroke="currentColor"
                                                              viewBox="0 0 24 24"
                                                              xmlns="http://www.w3.org/2000/svg">
                                                              <path
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  strokeWidth="2"
                                                                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path>
                                                          </svg>
                                                      </button>
                                                  ) : null}

                                                  {/* BOTON COLLAPSE/EXPANDE */}

                                                  <button
                                                      className="p-1 text-xs focus:outline-none border-4 border-pwpurple-600 text-pwgreen-50 hover:bg-pwpurple-600 focus:ring-4 font-medium rounded-lg bg-pwgreen-700 "
                                                      type="submit"
                                                      value={u.id}
                                                      onClick={e =>
                                                          toggleExpander(u.id)
                                                      }>
                                                      {rowExpande === u.id ? (
                                                          <svg
                                                              className="w-6 h-6"
                                                              fill="none"
                                                              stroke="currentColor"
                                                              viewBox="0 0 24 24"
                                                              xmlns="http://www.w3.org/2000/svg">
                                                              <path
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  strokeWidth="2"
                                                                  d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"></path>
                                                          </svg>
                                                      ) : (
                                                          <svg
                                                              className="w-6 h-6"
                                                              fill="none"
                                                              stroke="currentColor"
                                                              viewBox="0 0 24 24"
                                                              xmlns="http://www.w3.org/2000/svg">
                                                              <path
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  strokeWidth="2"
                                                                  d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"></path>
                                                          </svg>
                                                      )}
                                                  </button>
                                              </td>
                                          </tr>

                                          {/* NOMBRES DE LA TABLA EXPANDIBLE */}

                                          {rowExpande === u.id ? (
                                              <>
                                                  <tr
                                                      key={u.email}
                                                      className="bg-pwgreen-800 text-base font-bold">
                                                      <th className="px-5 py-2 ">
                                                          <span className="text-pwgreen-50">
                                                              PROVINCIA
                                                          </span>
                                                      </th>
                                                      <th className="px-5 py-2">
                                                          <span className="text-pwgreen-50">
                                                              CIUDAD
                                                          </span>
                                                      </th>
                                                      <th className="px-5 py-2">
                                                          <span className="text-pwgreen-50">
                                                              DIRECCION
                                                          </span>
                                                      </th>
                                                      <th className="px-5 py-2">
                                                          <span className="text-pwgreen-50">
                                                              TELEFONO
                                                          </span>
                                                      </th>
                                                      <th className="px-5 py-2">
                                                          <span className="text-pwgreen-50">
                                                              CORREO
                                                          </span>
                                                      </th>
                                                  </tr>

                                                  {/* DATOS DE LA TABLA EXPANDIBLE */}
                                                  {uploadUser === u.id ? (
                                                      <>
                                                          <td className="px-5 py-2">
                                                              <input
                                                                  type="text"
                                                                  placeholder={
                                                                      u.province ||
                                                                      'No hay datos'
                                                                  }
                                                                  name="province"
                                                                  value={
                                                                      userUpdate.province
                                                                  }
                                                                  onChange={
                                                                      handleInputDataChange
                                                                  }
                                                              />
                                                          </td>
                                                          <td className="px-5 py-2">
                                                              <input
                                                                  className=" w-fit"
                                                                  type="text"
                                                                  placeholder={
                                                                      u.city ||
                                                                      'No hay datos'
                                                                  }
                                                                  name="city"
                                                                  value={
                                                                      userUpdate.city
                                                                  }
                                                                  onChange={
                                                                      handleInputDataChange
                                                                  }
                                                              />
                                                          </td>
                                                          <td className="px-5 py-2">
                                                              <input
                                                                  type="text"
                                                                  placeholder={
                                                                      u.address ||
                                                                      'No hay datos'
                                                                  }
                                                                  name="address"
                                                                  value={
                                                                      userUpdate.address
                                                                  }
                                                                  onChange={
                                                                      handleInputDataChange
                                                                  }
                                                              />
                                                          </td>
                                                          <td className="px-5 py-2">
                                                              <input
                                                                  type="text"
                                                                  placeholder={
                                                                      u.phone ||
                                                                      'No hay datos'
                                                                  }
                                                                  name="phone"
                                                                  value={
                                                                      userUpdate.phone
                                                                  }
                                                                  onChange={
                                                                      handleInputDataChange
                                                                  }
                                                              />
                                                          </td>
                                                          <td className="px-5 py-2">
                                                              <input
                                                                  type="text"
                                                                  placeholder={
                                                                      u.postCode ||
                                                                      'No hay datos'
                                                                  }
                                                                  name="postCode"
                                                                  value={
                                                                      userUpdate.postCode
                                                                  }
                                                                  onChange={
                                                                      handleInputDataChange
                                                                  }
                                                              />
                                                          </td>
                                                      </>
                                                  ) : (
                                                      <>
                                                          <tr key={u.createdAt}>
                                                              <td className="px-5 py-2">
                                                                  {u.province ||
                                                                      'No hay Datos'}
                                                              </td>
                                                              <td className="px-5 py-2">
                                                                  {u.city ||
                                                                      'No hay Datos'}
                                                              </td>
                                                              <td className="px-5 py-2">
                                                                  {u.address ||
                                                                      'No hay Datos'}
                                                              </td>
                                                              <td className="px-5 py-2">
                                                                  {u.phone ||
                                                                      'No hay Datos'}
                                                              </td>
                                                              <td className="px-5 py-2">
                                                                  {u.postCode ||
                                                                      'No hay Datos'}
                                                              </td>
                                                          </tr>
                                                      </>
                                                  )}
                                              </>
                                          ) : null}
                                      </>
                                  )
                              })
                            : isLoading}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default TableUser
