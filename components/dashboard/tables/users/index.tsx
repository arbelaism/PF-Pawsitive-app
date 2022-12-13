import * as React from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getUsers, putUsers, createUser } from 'utils/dbFetching'
import { Users } from 'app/types'
import { useSortableData, useSearchData, FormCreateUser } from '../tools' //sort function
import Image from 'next/image'
import AlternativePagination from 'components/layout/AlternativePagination'
import { TbSearch } from 'react-icons/tb'
import {
    FaSort,
    FaEdit,
    FaTrash,
    FaArrowDown,
    FaArrowUp,
    FaSave
} from 'react-icons/fa'

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
    country: string
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

    function handleActiveChange(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        const id = e.currentTarget.name
        const user = users.find((u: Users) => u.id === id)
        if (user.active && id) {
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
    const [itemsPerPage, setItemsPerPage] = React.useState<number>(10)
    const lastItemIndex = currentPage * itemsPerPage
    const firstItemIndex = lastItemIndex - itemsPerPage
    let currentItems: Users[] = []
    if (filteredData)
        currentItems = [...filteredData?.slice(firstItemIndex, lastItemIndex)]

    const showItems = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value

        setItemsPerPage(Number(value))
        setCurrentPage(1)
        return
    }

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
        country: '',
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
            if (value) {
                newObj[key] = value
            }
        }
        mutation.mutate({ id: uploadUser, data: newObj })
        setUploadUser(null)
    }

    return (
        <div className="w-full my-5 z-20">
            <div className="flex items-center justify-between my-2 mx-5">
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
                    {...mutationCreate}
                />
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

                            <th className="th-head">ROL</th>
                            <th className="th-head">ESTADO</th>
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

                    <tbody className="text-sm">
                        {isSuccess
                            ? currentItems.map((u: Users) => {
                                return (
                                    <>
                                        <tr
                                            key={u.id}
                                            className="tr-body bg-pwgreen-50">
                                            <td className="td-body">
                                                <div className="hidden lg:block">
                                                    {u.photo ? (
                                                        <Image
                                                            src={u.photo}
                                                            alt={
                                                                u.lastName ||
                                                                'no image'
                                                            }
                                                            width={64}
                                                            height={64}
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
                                                    <td className="td-body">
                                                        <input
                                                            type="text"
                                                            placeholder={
                                                                u.firstName ||
                                                                'n/a'
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
                                                    <td className="td-body">
                                                        <input
                                                            className="w-fit"
                                                            type="text"
                                                            placeholder={
                                                                u.lastName ||
                                                                'n/a'
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
                                                    <td className="td-body">
                                                        <input
                                                            type="text"
                                                            placeholder={
                                                                u.email ||
                                                                'n/a'
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

                                                </>
                                            ) : (
                                                <>
                                                    <td className="td-body min-w-[120px]">
                                                        {u.firstName || 'n/a'}
                                                    </td>
                                                    <td className="td-body min-w-[120px]">
                                                        {u.lastName || 'n/a'}
                                                    </td>
                                                    <td className="td-body">
                                                        {u.email || 'n/a'}
                                                    </td>
                                                </>
                                            )}
                                            <td className="td-body">
                                                <select
                                                    className="input w-max"
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
                                            <td className="td-body">
                                                {u.active ? (
                                                    <span className="text-pwgreen-50 bg-pwgreen-700 px-3 py-1 rounded-full">
                                                        Activo
                                                    </span>
                                                ) : (
                                                    <span className="text-red-50 bg-red-700 px-3 py-1 rounded-full">
                                                        Desactivado
                                                    </span>
                                                )}
                                            </td>
                                            <td className="td-body">
                                                {u.createdAt}
                                            </td>

                                            {/* BOTONES PARA MODIFICAR USUARIOS Y COLAPSE/EXPANDE TABLE */}

                                            <td className="td-body min-w-[130px] inline-flex space-x-2 lg:table-cell">
                                                {/* BOTON UPLOAD */}
                                                <button
                                                    className="button-table"
                                                    type="button"
                                                    name={u.id}
                                                    onClick={() =>
                                                        toggleUpload(u.id)
                                                    }>
                                                    <FaEdit />
                                                </button>

                                                {/* BOTON GUARDAR */}
                                                {uploadUser === u.id ? (
                                                    <button
                                                        className="button-table"
                                                        type="button"
                                                        name={u.id}
                                                        onClick={e =>
                                                            handlerSubmitUserUpdate(
                                                                e
                                                            )
                                                        }>
                                                        <FaSave />
                                                    </button>
                                                ) : null}

                                                <button
                                                    className="button-table"
                                                    type="button"
                                                    name={u.id}
                                                    onClick={e =>
                                                        handleActiveChange(e)
                                                    }>
                                                    <FaTrash />
                                                </button>

                                                {/* BOTON COLLAPSE/EXPANDE */}

                                                <button
                                                    className="button-table"
                                                    type="submit"
                                                    value={u.id}
                                                    onClick={e =>
                                                        toggleExpander(u.id)
                                                    }>
                                                    {rowExpande === u.id ? (
                                                        <FaArrowDown />
                                                    ) : (
                                                        <FaArrowUp />
                                                    )}
                                                </button>
                                            </td>
                                        </tr>

                                        {/* NOMBRES DE LA TABLA EXPANDIBLE */}

                                        {rowExpande === u.id ? (
                                            <>
                                                <tr
                                                    key={u.email}
                                                    className="tr-head">
                                                    <th className="th-head">
                                                        GENERO
                                                    </th>
                                                    <th className="th-head">
                                                        FECHA DE NACIMIENTO
                                                    </th>
                                                    <th className="th-head">
                                                        PAIS
                                                    </th>
                                                    <th className="th-head">
                                                        CIUDAD
                                                    </th>
                                                    <th className="th-head">
                                                        PROVINCIA
                                                    </th>
                                                    <th className="th-head">
                                                        DIRECCION
                                                    </th>
                                                    <th className="th-head">
                                                        TELEFONO
                                                    </th>
                                                    <th className="th-head">
                                                        CORREO POSTAL
                                                    </th>
                                                </tr>

                                                {/* DATOS DE LA TABLA EXPANDIBLE */}
                                                {uploadUser === u.id ? (
                                                    <>
                                                        <td className="td-body">
                                                            <input
                                                                type="text"
                                                                placeholder={
                                                                    u.gender ||
                                                                    'n/a'
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
                                                        <td className="td-body">
                                                            <input
                                                                type="text"
                                                                placeholder={
                                                                    u.birthday ||
                                                                    'n/a'
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
                                                        <td className="td-body">
                                                            <input
                                                                type="text"
                                                                placeholder={
                                                                    u.country ||
                                                                    'n/a'
                                                                }
                                                                name="country"
                                                                value={
                                                                    userUpdate.country
                                                                }
                                                                onChange={
                                                                    handleInputDataChange
                                                                }
                                                            />
                                                        </td>
                                                        <td className="td-body">
                                                            <input
                                                                type="text"
                                                                placeholder={
                                                                    u.province ||
                                                                    'n/a'
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
                                                        <td className="td-body">
                                                            <input
                                                                className=" w-fit"
                                                                type="text"
                                                                placeholder={
                                                                    u.city ||
                                                                    'n/a'
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
                                                        <td className="td-body">
                                                            <input
                                                                type="text"
                                                                placeholder={
                                                                    u.address ||
                                                                    'n/a'
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
                                                        <td className="td-body">
                                                            <input
                                                                type="text"
                                                                placeholder={
                                                                    u.phone ||
                                                                    'n/a'
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
                                                        <td className="td-body">
                                                            <input
                                                                type="text"
                                                                placeholder={
                                                                    u.postCode ||
                                                                    'n/a'
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
                                                            <td className="td-body">
                                                                {u.gender || 'n/a'}
                                                            </td>
                                                            <td className="td-body">
                                                                {u.birthday || 'n/a'}
                                                            </td>
                                                            <td className="td-body">
                                                                {u.country ||
                                                                    'n/a'}
                                                            </td>
                                                            <td className="td-body">
                                                                {u.province ||
                                                                    'n/a'}
                                                            </td>
                                                            <td className="td-body">
                                                                {u.city ||
                                                                    'n/a'}
                                                            </td>
                                                            <td className="td-body">
                                                                {u.address ||
                                                                    'n/a'}
                                                            </td>
                                                            <td className="td-body">
                                                                {u.phone ||
                                                                    'n/a'}
                                                            </td>
                                                            <td className="td-body">
                                                                {u.postCode ||
                                                                    'n/a'}
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
            <div className="flex justify-between my-2 mx-5">
                <div>
                    <select className="input" name="items" onChange={showItems}>
                        <option value="5">5</option>
                        <option value="10" selected>
                            10
                        </option>
                        <option value="15">15</option>
                        <option value="25">25</option>
                    </select>
                </div>
                <div className="">
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
            </div>
        </div>
    )
}
export default TableUser
