import * as React from 'react'
import { useQuery } from 'react-query'
import { getAllApply } from 'utils/dbFetching'
import { Aplies } from 'app/types'
import { useSortableData, useSearchData } from '../tools' //sort function
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



const TableApply = () => {
    //QUERY DATA GET AND PUT
    const { data: applies, isLoading, isSuccess } = useQuery(['applies'], getAllApply)





    //Sort Table

    const { items, requestSort, sortConfig } = useSortableData(applies)




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
    let currentItems: Aplies[] = []
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

            </div>

            <div className="overflow-x-auto mx-5 rounded-md relative shadow-lg">
                <table className="w-full table-auto text-sm">
                    {/* NOMBRES DE LA TABLA */}
                    <thead>
                        <tr className="tr-head">
                        <th className="th-head">NOMBRE</th>
                        <th className="th-head">APELLIDO</th>
                        <th className="th-head">EMAIL</th>
                            <th className="th-head">
                                <button
                                    className="button-head"
                                    type="button"
                                    onClick={() => requestSort('reason')}>
                                    RAZON
                                    <FaSort />
                                </button>
                            </th>

                            <th className="th-head">EXPERIENCIA</th>
                            <th className="th-head">EMPLEADO</th>
                            <th className="th-head">JARDIN</th>
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
                            ? currentItems.map((u: Aplies) => {
                                return (
                                    <>
                                        <tr
                                            key={u.id}
                                            className="tr-body bg-pwgreen-50">
                                            <td className="td-body">
                                                {u.user.firstName || 'n/a'}
                                            </td>
                                            <td className="td-body">
                                                {u.user.lastName || 'n/a'}
                                            </td>
                                            <td className="td-body">
                                                {u.user.email || 'n/a'}
                                            </td>
                                            <td className="td-body">
                                                {u.reason || 'n/a'}
                                            </td>
                                            <td className="td-body">
                                                {u.past ? (
                                                    <span className="text-pwgreen-50 bg-pwgreen-700 px-3 py-1 rounded-full">
                                                        SI
                                                    </span>
                                                ) : (
                                                    <span className="text-red-50 bg-red-700 px-3 py-1 rounded-full">
                                                        NO
                                                    </span>
                                                )}
                                            </td>
                                            <td className="td-body">
                                                {u.employee ? (
                                                    <span className="text-pwgreen-50 bg-pwgreen-700 px-3 py-1 rounded-full">
                                                        SI
                                                    </span>
                                                ) : (
                                                    <span className="text-red-50 bg-red-700 px-3 py-1 rounded-full">
                                                        NO
                                                    </span>
                                                )}
                                            </td>
                                            <td className="td-body">
                                                {u.garden ? (
                                                    <span className="text-pwgreen-50 bg-pwgreen-700 px-3 py-1 rounded-full">
                                                        SI
                                                    </span>
                                                ) : (
                                                    <span className="text-red-50 bg-red-700 px-3 py-1 rounded-full">
                                                        NO
                                                    </span>
                                                )}
                                            </td>
                                            <td className="td-body">
                                                {u.createdAt}
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
                                                    key={u.createdAt}
                                                    className="tr-head">
                                                    <th className="th-head">
                                                        Nombre de la mascota
                                                    </th>
                                                    <th className="th-head">
                                                        Raza
                                                    </th>
                                                    <th className="th-head">
                                                        Genero
                                                    </th>
                                                    <th className="th-head">
                                                        Estado
                                                    </th>
                                                    <th className="th-head">
                                                        Apoderado
                                                    </th>
                                                    <th className="th-head">
                                                        Correo
                                                    </th>
                                                </tr>

                                                {/* DATOS DE LA TABLA EXPANDIBLE */}

                                                <>
                                                    <tr key={u.updatedAt}>
                                                        <td className="td-body">
                                                            {u.adoptionPost.name || 'n/a'}
                                                        </td>
                                                        <td className="td-body">
                                                            {u.adoptionPost.breed || 'n/a'}
                                                        </td>
                                                        <td className="td-body">
                                                            {u.adoptionPost.gender ||
                                                                'n/a'}
                                                        </td>
                                                        <td className="td-body">
                                                            {u.adoptionPost.active ? (
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
                                                            {`${u.adoptionPost.user?.firstName}, ${u.adoptionPost?.user?.lastName}` ||
                                                                'n/a'}
                                                        </td>
                                                        <td className="td-body">
                                                            {u.user?.email ||
                                                                'n/a'}
                                                        </td>
                                                    </tr>
                                                </>

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
                                (filteredData ? filteredData : items)?.length
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
export default TableApply
