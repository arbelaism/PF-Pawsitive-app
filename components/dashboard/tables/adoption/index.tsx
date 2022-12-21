import * as React from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { putAdoption, createPost as createAdoption, getAdoptions } from 'utils/dbFetching'
import { Adoptions } from 'app/types'
import { useSortableData, useSearchData, FormCreateAdoption } from '../tools' //sort function
import Image from 'next/image'
import AlternativePagination from 'components/layout/AlternativePagination'
import { TbSearch } from 'react-icons/tb'
import CreateAdoptionForm from '../tools/createAdoptionForm'
import {
    FaSort,
    FaEdit,
    FaTrash,
    FaArrowDown,
    FaArrowUp,
    FaSave
} from 'react-icons/fa'


interface FormEstructure {
    name: string;
    size: string;
    age: string;
    breed: string;
    photo: string;
    gender: string;
    active: boolean;
    description: string;
    userId: string
}

const TableAdoption = () => {
    //QUERY DATA GET AND PUT
    const { data: adoptions, isLoading, isSuccess } = useQuery(['adoptions'], getAdoptions)

    const queryClient = useQueryClient()

    const mutation = useMutation(({ id, data }: any) => putAdoption(id, data), {
        onSuccess: () => {
            queryClient.prefetchQuery('adoptions', getAdoptions)
        }
    })
    const mutationCreateAdoption = useMutation((data: any) => createAdoption(data), {
        onSuccess: () => {
            queryClient.prefetchQuery('adoptions', getAdoptions)
        }
    })

    //Sort Table

    const { items, requestSort, sortConfig } = useSortableData(adoptions)

    //FUNCTIONS CHANGE DATA
    function handleGenderChange(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault()
        const gender = e.target.value as string
        const id = e.target.id as string
        if (gender && id) {
            mutation.mutate({ id, data: { gender } })
            return
        } else return
    }
    function handleSizeChange(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault()
        const size = e.target.value as string
        const id = e.target.id as string
        if (size && id) {
            mutation.mutate({ id, data: { size } })
            return
        } else return
    }

    function handleActiveChange(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        const id = e.currentTarget.name
        const adoption = adoptions.find((a: Adoptions) => a.id === id)
        if (adoption.active && id) {
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
    let currentItems: Adoptions[] = []
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
        name: '',
        size: '',
        age: '',
        breed: '',
        photo: '',
        gender: 'UNKNOWN',
        active: true,
        description: '',
        userId: ''
    }
    const [uploadUser, setUploadUser] = React.useState(null)
    const [userUpdate, setUserUpdate] = React.useState<FormEstructure>({
        ...dataEstructure
    })

    function toggleUpload(e: any) {
        // e.preventDefault()
        const key = e
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
                <CreateAdoptionForm {...mutationCreateAdoption}/>
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
                                    onClick={() => requestSort('name')}>
                                    NOMBRE
                                    <FaSort />
                                </button>
                            </th>


                            <th className="th-head">
                                <button
                                    className="button-head"
                                    type="button"
                                    onClick={() => requestSort('age')}>
                                    EDAD
                                    <FaSort />
                                </button>
                            </th>
                            <th className="th-head">
                                <button
                                    className="button-head"
                                    type="button"
                                    onClick={() => requestSort('breed')}>
                                    RAZA
                                    <FaSort />
                                </button>
                            </th>
                            <th className="th-head">
                                <button
                                    className="button-head"
                                    type="button"
                                    onClick={() => requestSort('breed')}>
                                    REGISTRADO
                                    <FaSort />
                                </button>
                            </th>
                            <th className="th-head">
                                <button
                                    className="button-head"
                                    type="button"
                                    onClick={() => requestSort('size')}>
                                    TAMAÑO
                                    <FaSort />
                                </button>
                            </th>

                            <th className="th-head">GENERO</th>
                            <th className="th-head">ESTADO</th>
                            <th className="th-head">DESCRIPCION</th>
                            <th></th>
                        </tr>
                    </thead>

                    {/* DATOS DE LA TABLA */}

                    <tbody className="text-sm">
                        {isSuccess
                            ? currentItems.map((a: Adoptions) => {
                                return (
                                    <>
                                        <tr
                                            key={a.id}
                                            className="tr-body bg-pwgreen-50">
                                            <td className="td-body">
                                                <div className="hidden lg:block">
                                                    {a.photo ? (
                                                        <Image
                                                            src={a.photo}
                                                            alt={
                                                                a.name ||
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
                                                        {a.id}
                                                    </span>
                                                </div>
                                            </td>

                                            {uploadUser === a.id ? (
                                                <>
                                                    <td className="td-body">
                                                        <input
                                                            type="text"
                                                            placeholder={
                                                                a.name ||
                                                                'n/a'
                                                            }
                                                            name="name"
                                                            value={
                                                                userUpdate.name
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
                                                                a.age ||
                                                                'n/a'
                                                            }
                                                            name="age"
                                                            value={
                                                                userUpdate.age
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
                                                                a.breed ||
                                                                'n/a'
                                                            }
                                                            name="breed"
                                                            value={
                                                                userUpdate.breed
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
                                                        {a.name || 'n/a'}
                                                    </td>
                                                    <td className="td-body">
                                                        {a.age || 'n/a'}
                                                    </td>
                                                    <td className="td-body">
                                                        {a.breed || 'n/a'}
                                                    </td>
                                                </>
                                            )
                                            }
                                            <td className="td-body">
                                                {a.createdAt}
                                            </td>
                                            <td className="td-body">
                                                <select
                                                    className="input w-max"
                                                    name="size"
                                                    value={a.size}
                                                    id={a.id}
                                                    onChange={
                                                        handleSizeChange
                                                    }>
                                                    <option value="UNIQUE">
                                                        DESCONOCIDO
                                                    </option>
                                                    <option value="SMALL">
                                                        PEQUEÑO
                                                    </option>
                                                    <option value="MEDIUM">
                                                        MEDIANO
                                                    </option>
                                                    <option value="BIG">
                                                        GRANDE
                                                    </option>
                                                </select>
                                            </td>
                                            <td className="td-body">
                                                <select
                                                    className="input w-max"
                                                    name="gender"
                                                    value={a.gender}
                                                    id={a.id}
                                                    onChange={
                                                        handleGenderChange
                                                    }>
                                                    <option value="UNKNOWN">
                                                        DESCONOCIDO
                                                    </option>
                                                    <option value="MALE">
                                                        MACHO
                                                    </option>
                                                    <option value="FEMALE">
                                                        HEMBRA
                                                    </option>
                                                </select>
                                            </td>
                                            <td className="td-body">
                                                {a.active ? (
                                                    <span className="text-pwgreen-50 bg-pwgreen-700 px-3 py-1 rounded-full">
                                                        Activo
                                                    </span>
                                                ) : (
                                                    <span className="text-red-50 bg-red-700 px-3 py-1 rounded-full">
                                                        Desactivado
                                                    </span>
                                                )}
                                            </td>
                                            {uploadUser === a.id
                                                ?
                                                <>
                                                    <td className="td-body">
                                                        <input
                                                            type="text"
                                                            placeholder={
                                                                a.description ||
                                                                'n/a'
                                                            }
                                                            name="description"
                                                            value={
                                                                userUpdate.description
                                                            }
                                                            onChange={
                                                                handleInputDataChange
                                                            }
                                                        />
                                                    </td>
                                                </>
                                                :
                                                <td className="td-body">
                                                    {a.description}
                                                </td>
                                            }
                                            {/* BOTONES PARA MODIFICAR USUARIOS Y COLAPSE/EXPANDE TABLE */}

                                            <td className="td-body min-w-[130px] inline-flex space-x-2 lg:table-cell">
                                                {/* BOTON UPLOAD */}
                                                <button
                                                    className="button-table"
                                                    type="button"
                                                    name={a.id}
                                                    onClick={() =>
                                                        toggleUpload(a.id)
                                                    }>
                                                    <FaEdit />
                                                </button>

                                                {/* BOTON GUARDAR */}
                                                {uploadUser === a.id ? (
                                                    <button
                                                        className="button-table"
                                                        type="button"
                                                        name={a.id}
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
                                                    name={a.id}
                                                    onClick={e =>
                                                        handleActiveChange(e)
                                                    }>
                                                    <FaTrash />
                                                </button>

                                                {/* BOTON COLLAPSE/EXPANDE */}

                                                <button
                                                    className="button-table"
                                                    type="submit"
                                                    value={a.id}
                                                    onClick={e =>
                                                        toggleExpander(a.id)
                                                    }>
                                                    {rowExpande === a.id ? (
                                                        <FaArrowDown />
                                                    ) : (
                                                        <FaArrowUp />
                                                    )}
                                                </button>
                                            </td>
                                        </tr>

                                        {/* NOMBRES DE LA TABLA EXPANDIBLE */}

                                        {rowExpande === a.id
                                            ? (
                                                <>
                                                    <tr
                                                        key={a.updatedAt}
                                                        className="tr-head">
                                                        <th className="th-head">
                                                            NOMBRE
                                                        </th>
                                                        <th className="th-head">
                                                            APELLIDO
                                                        </th>
                                                        <th className="th-head">
                                                            EMAIL
                                                        </th>
                                                        <th className="th-head">
                                                            PAIS
                                                        </th>
                                                        <th className="th-head">
                                                            PROVINCIA
                                                        </th>
                                                        <th className="th-head">
                                                            CIUDAD
                                                        </th>
                                                        <th className="th-head">
                                                            DIRECCION
                                                        </th>
                                                    </tr>

                                                    {/* DATOS DE LA TABLA EXPANDIBLE */}

                                                    <tr key={a.createdAt}>
                                                        <td className="td-body">
                                                            {a.user.firstName ||
                                                                'n/a'}
                                                        </td>
                                                        <td className="td-body">
                                                            {a.user.lastName ||
                                                                'n/a'}
                                                        </td>
                                                        <td className="td-body">
                                                            {a.user.email ||
                                                                'n/a'}
                                                        </td>
                                                        <td className="td-body">
                                                            {a.user.country ||
                                                                'n/a'}
                                                        </td>
                                                        <td className="td-body">
                                                            {a.user.province ||
                                                                'n/a'}
                                                        </td>
                                                        <td className="td-body">
                                                            {a.user.city ||
                                                                'n/a'}
                                                        </td>
                                                        <td className="td-body">
                                                            {a.user.address ||
                                                                'n/a'}
                                                        </td>
                                                    </tr>

                                                </>
                                            )
                                            : null
                                        }

                                    </>
                                )
                            }) : isLoading}

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
                                (filteredData ? filteredData : adoptions)?.length
                            }
                            itemsPerPage={itemsPerPage}
                            setCurrentPage={setCurrentPage}
                            size={"large"}
                        />
                    ) : null}
                </div>
            </div>
        </div>
    )
}
export default TableAdoption
