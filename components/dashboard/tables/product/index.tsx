import * as React from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAllProducts, putProduct, createProduct } from 'utils/dbFetching'
import { Product, Review } from 'app/types'
import { useSortableData, useSearchData, FormCreateProduct } from '../tools' //sort function
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
    name: string
    price: number
    displayPrice: number
    description: string
    stock: number
    photo: string
    brand: string
}

const TableProduct = () => {
    //QUERY DATA GET AND PUT
    const { data: products, isLoading, isSuccess } = useQuery(['products'], getAllProducts)

    const queryClient = useQueryClient()

    const mutation = useMutation(({ id, data }: any) => putProduct(id, data), {
        onSuccess: () => {
            queryClient.prefetchQuery('products', getAllProducts)
        }
    })

    const mutationCreate = useMutation((data: any) => createProduct(data), {
        onSuccess: () => {
            queryClient.prefetchQuery('products', getAllProducts)
        }
    })

    //Sort Table

    const { items, requestSort, sortConfig } = useSortableData(products)

    //FUNCTIONS CHANGE DATA
    function handleSizeChange(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault()
        const size = e.target.value as string
        const id = e.target.id as string
        if (size && id) {
            mutation.mutate({ id, data: { size } })
            return
        } else return
    }
    function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault()
        const category = e.target.value as string
        const id = e.target.id as string
        if (category && id) {
            mutation.mutate({ id, data: { category } })
            return
        } else return
    }

    function handleActiveChange(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        const id = e.currentTarget.name
        const product = products.find((u: Product) => u.id === id)
        if (product.active && id) {
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
    let currentItems: Product[] = []
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
        price: 0,
        displayPrice: 0,
        description: '',
        stock: 0,
        photo: '',
        brand: '',

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
        if (name === 'stock') {
            setUserUpdate({ ...userUpdate, [name]: parseInt(value) })
            return
        }
        if (name === 'price' || name === 'displayPrice') {
            setUserUpdate({ ...userUpdate, [name]: parseFloat(value) })
            return
        }
        else { setUserUpdate({ ...userUpdate, [name]: value }) }
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
                <FormCreateProduct
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
                                    onClick={() => requestSort('name')}>
                                    NOMBRE
                                    <FaSort />
                                </button>
                            </th>
                            <th className="th-head">
                                <button
                                    className="button-head"
                                    type="button"
                                    onClick={() => requestSort('price')}>
                                    COSTO
                                    <FaSort />
                                </button>
                            </th>

                            <th className="th-head">
                                <button
                                    className="button-head"
                                    type="button"
                                    onClick={() => requestSort('displayPrice')}>
                                    PRECIO
                                    <FaSort />
                                </button>
                            </th>
                            <th className="th-head">
                                <button
                                    className="button-head"
                                    type="button"
                                    onClick={() => requestSort('stock')}>
                                    STOCK
                                    <FaSort />
                                </button>
                            </th>
                            <th className="th-head">
                                <button
                                    className="button-head"
                                    type="button"
                                    onClick={() => requestSort('brand')}>
                                    MARCA
                                    <FaSort />
                                </button>
                            </th>
                            {/* <th className="th-head">DESCRIPCION DEL PRODUCTO</th> */}
                            <th className="th-head">TAMAÑO</th>
                            <th className="th-head">CATEGORIA</th>
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
                            ? currentItems.map((u: Product) => {
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
                                                                u.name ||
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
                                                                u.name ||
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
                                                            className="w-fit"
                                                            type="number"
                                                            min='0'
                                                            name="price"
                                                            value={
                                                                userUpdate.price
                                                            }
                                                            onChange={
                                                                handleInputDataChange
                                                            }
                                                        />
                                                    </td>
                                                    <td className="td-body">
                                                        <input
                                                            type="number"
                                                            min='0'
                                                            name="displayPrice"
                                                            value={
                                                                userUpdate.displayPrice
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
                                                                u.stock.toString() ||
                                                                'n/a'
                                                            }
                                                            name="stock"
                                                            value={
                                                                userUpdate.stock
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
                                                                u.brand ||
                                                                'n/a'
                                                            }
                                                            name="brand"
                                                            value={
                                                                userUpdate.brand
                                                            }
                                                            onChange={
                                                                handleInputDataChange
                                                            }
                                                        />
                                                    </td>
                                                    {/* <td className="td-body">
                                                        <input
                                                            type="text"
                                                            placeholder={
                                                                u.description ||
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
                                                    </td> */}
                                                </>
                                            ) : (
                                                <>
                                                    <td className="td-body min-w-[120px]">
                                                        {u.name || 'n/a'}
                                                    </td>
                                                    <td className="td-body min-w-[120px]">
                                                        {u.price || 'n/a'}
                                                    </td>
                                                    <td className="td-body">
                                                        {u.displayPrice || 'n/a'}
                                                    </td>
                                                    <td className="td-body">
                                                        {u.stock || 'n/a'}
                                                    </td>
                                                    <td className="td-body">
                                                        {u.brand || 'n/a'}
                                                    </td>
                                                    {/* <td className="td-body">
                                                        {u.description || 'n/a'}
                                                    </td> */}
                                                </>
                                            )}

                                            <td className="td-body">
                                                <select
                                                    className="input w-max"
                                                    name="size"
                                                    value={u.size}
                                                    id={u.id}
                                                    onChange={
                                                        handleSizeChange
                                                    }>
                                                    <option value="UNIQUE">
                                                        UNICO
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
                                                    name="size"
                                                    value={u.category}
                                                    id={u.id}
                                                    onChange={
                                                        handleCategoryChange
                                                    }>
                                                    <option value="TOY">
                                                        JUGUETE
                                                    </option>
                                                    <option value="FOOD">
                                                        COMIDA
                                                    </option>
                                                    <option value="SNACK">
                                                        BOCADILLO
                                                    </option>
                                                    <option value="ACCESORIES">
                                                        ACCESORIO
                                                    </option>
                                                    <option value="HYGIENE">
                                                        HIGIENE
                                                    </option>
                                                    <option value="HEALTH">
                                                        SALUD
                                                    </option>
                                                    <option value="OTHER">
                                                        OTRO
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

                                        {rowExpande === u.id ? (u.review.length ? u.review.map((r: Review) => {
                                            return (
                                                <>
                                                    <tr
                                                        key={u.updatedAt}
                                                        className="tr-head">
                                                        <th className="th-head">
                                                            ID
                                                        </th>
                                                        <th className="th-head">
                                                            RATING
                                                        </th>
                                                        <th className="th-head">
                                                            RESEÑA
                                                        </th>
                                                        <th className="th-head">
                                                            REGISTRADA
                                                        </th>
                                                        <th className="th-head">
                                                            MODIFICADA
                                                        </th>
                                                    </tr>
                                                    <tr key={u.createdAt}>
                                                        <td className="td-body">
                                                            {r.id ||
                                                                'n/a'}
                                                        </td>
                                                        <td className="td-body">
                                                            {r.rating ||
                                                                'n/a'}
                                                        </td>
                                                        <td className="td-body">
                                                            {r.review ||
                                                                'n/a'}
                                                        </td>
                                                        <td className="td-body">
                                                            {r.createdAt.toString() ||
                                                                'n/a'}
                                                        </td>
                                                        <td className="td-body">
                                                            {r.updatedAt.toString() ||
                                                                'n/a'}
                                                        </td>

                                                    </tr>


                                                </>
                                            )
                                        }
                                        )

                                            : <tr><td>{"No hay reseñas"}</td></tr>
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
                                (filteredData ? filteredData : products)?.length
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
export default TableProduct
