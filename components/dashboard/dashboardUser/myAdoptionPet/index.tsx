import * as React from 'react'
import { useQuery } from 'react-query'
import { getTransactionsByUserId } from 'utils/dbFetching'
import { Quantity, MyTransaction } from 'app/types'
import { useSortableData, useSearchData, } from '../../tables/tools' //sort function
import AlternativePagination from 'components/layout/AlternativePagination'
import { TbSearch } from 'react-icons/tb'
import {
    FaSort,
    FaArrowDown,
    FaArrowUp,
} from 'react-icons/fa'
import { useUser } from "@auth0/nextjs-auth0/client";
import { Modal } from 'components'


const MyAdoption = () => {

    const { user, error: err, isLoading: load } = useUser();
    const id = user?.sub as string
    //QUERY DATA GET AND PUT

    const {
        data: myTransactions,
        error,
        isLoading,
        isSuccess,
    } = useQuery(["myTransactions", id], () => getTransactionsByUserId(id));


    //Sort Table

    const { items, requestSort, sortConfig } = useSortableData(myTransactions)

    //FUNCTIONS CHANGE DATA



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
    let currentItems: MyTransaction[] = []
    if (filteredData)
        currentItems = [...filteredData?.slice(firstItemIndex, lastItemIndex)]

    const showItems = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value

        setItemsPerPage(Number(value))
        setCurrentPage(1)
        return
    }





    return (
        <div className="w-full my-5 z-20">
            {myTransactions && myTransactions.length ? 
            <>
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
                    {/* <FormCreateTransaction
                    {...mutationCreate}
                /> */}
                </div>

                <div className="overflow-x-auto mx-5 rounded-md relative shadow-lg">
                    <table className="w-full table-auto text-sm">
                        {/* NOMBRES DE LA TABLA */}
                        <thead>
                            <tr className="tr-head">

                                <th className="th-head">
                                    <button
                                        className="button-head"
                                        type="button"
                                        onClick={() => requestSort('id')}>
                                        ID DE LA COMPRA
                                        <FaSort />
                                    </button>
                                </th>
                                <th className="th-head">
                                    <button
                                        className="button-head"
                                        type="button"
                                        onClick={() => requestSort('createdAt')}>
                                        FECHA
                                        <FaSort />
                                    </button>
                                </th>
                                <th className="th-head">
                                    <button
                                        className="button-head"
                                        type="button"
                                        onClick={() => requestSort('amount')}>
                                        TOTAL
                                        <FaSort />
                                    </button>
                                </th>

                                <th className="th-head">
                                    <button
                                        className="button-head"
                                        type="button"
                                        onClick={() => requestSort('status')}>
                                        ESTADO
                                        <FaSort />
                                    </button>
                                </th>


                                <th></th>
                            </tr>
                        </thead>

                        {/* DATOS DE LA TABLA */}

                        <tbody className="text-sm">
                            {isSuccess && currentItems.length
                                ? currentItems.map((u: MyTransaction) => {
                                    return (
                                        <>
                                            <tr
                                                key={u.id}
                                                className="tr-body bg-pwgreen-50">
                                                <td className="td-body">
                                                    <span className="text-center text-ellipsis overflow-hidden ml-2 font-semibold">
                                                        {u.id}
                                                    </span>
                                                </td>
                                                <td className="td-body">
                                                    {u.createdAt}
                                                </td>
                                                <td className="td-body">
                                                    {u.amount}
                                                </td>
                                                <td className="td-body">
                                                    {u.status}
                                                </td>


                                                {/* BOTONES PARA MODIFICAR USUARIOS Y COLAPSE/EXPANDE TABLE */}

                                                <td className="td-body min-w-[130px] inline-flex space-x-2 lg:table-cell">

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
                                                        key={u.updatedAt}
                                                        className="tr-head">
                                                        <th className="th-head">
                                                            Categoria
                                                        </th>
                                                        <th className="th-head">
                                                            Nombre del Producto
                                                        </th>
                                                        <th className="th-head">
                                                            Marca del Producto
                                                        </th>
                                                        <th className="th-head">
                                                            Cantidad
                                                        </th>
                                                        <th className="th-head">
                                                            Precio
                                                        </th>
                                                    </tr>

                                                    {/* DATOS DE LA TABLA EXPANDIBLE */}
                                                    {u.quantity ? u.quantity.map((q: Quantity) => {
                                                        return (
                                                            <>
                                                                <tr
                                                                    key={q.id}
                                                                    className="td-body">
                                                                    <td className="td-body">
                                                                        {q.product.category || 'n/a'}
                                                                    </td>
                                                                    <td className="td-body">
                                                                        {q.product.name || 'n/a'}
                                                                    </td>
                                                                    <td className="td-body">
                                                                        {q.product.brand || 'n/a'}
                                                                    </td>
                                                                    <td className="td-body">
                                                                        {q.quantity || 'n/a'}
                                                                    </td>
                                                                    <td className="td-body">
                                                                        {q.product.displayPrice * q.quantity || 'n/a'}
                                                                    </td>
                                                                </tr>

                                                            </>
                                                        )
                                                    }) : <><tr>
                                                        <td>NO HAY DATOS</td>
                                                    </tr></>}
                                                </>
                                            )

                                                : <tr>
                                                    <td>NO HAY DATOS</td>
                                                </tr>}
                                        </>
                                    )
                                })
                                : <>
                                    <tr
                                        className="tr-body bg-pwgreen-50"
                                    >
                                        <td
                                            className="td-body"
                                        >
                                            <span className="text-center text-ellipsis overflow-hidden ml-2 font-semibold">
                                                NO HAY DATOS
                                            </span>

                                        </td>

                                    </tr>
                                </>}
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
                                    (filteredData ? filteredData : myTransactions)?.length
                                }
                                itemsPerPage={itemsPerPage}
                                setCurrentPage={setCurrentPage}
                            />
                        ) : null}
                    </div>
                </div>
            </> : <>
           
                <div>
                    <h1>NO HAY DATOS</h1>

                </div>    
            

            </>}


        </div>
    )
}
export default MyAdoption
