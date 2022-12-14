import * as React from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAllTransactions, putTransaction, createTransaction, sendMailT, getUserById } from 'utils/dbFetching'
import { Quantity, TransactionT, ContactForm,Users, EmailT } from 'app/types'
import { useSortableData, useSearchData, FormCreateUser } from '../tools' //sort function
import AlternativePagination from 'components/layout/AlternativePagination'
import { TbSearch } from 'react-icons/tb'
import { alerts } from 'utils/alerts';
import {
    FaSort,
    FaEdit,
    FaTrash,
    FaArrowDown,
    FaArrowUp,
    FaSave
} from 'react-icons/fa'

interface FormEstructure {
    amount: number
    userId: string
    status: string
    array: EstructureArray[]
}
interface EstructureArray {
    quantity: string
    productId: string
}
const TableTransaction = () => {
    //QUERY DATA GET AND PUT
    const { data: transactions, isLoading, isSuccess } = useQuery(['transactions'], getAllTransactions)

    const queryClient = useQueryClient()

    const mutation = useMutation(({ id, data }: any) => putTransaction(id, data), {
        onSuccess: () => {
            queryClient.prefetchQuery('transactions', getAllTransactions)
        }
    })

    const mutationCreate = useMutation((data: any) => createTransaction(data), {
        onSuccess: () => {
            queryClient.prefetchQuery('transactions', getAllTransactions)
        }
    })
    const mutationSendEmail = useMutation(sendMailT, {
        onSuccess: data => {
            alerts({ icon: 'info', title: '<strong>Email</strong>', text: 'Se envio un email sobre es estado de la compra.', toast: true })
        },
        onError: () => {
            alerts({ icon: 'error', title: '<strong>Email</strong>', text: 'No se envio el email', toast: true })
        },
        onSettled: () => {
            queryClient.invalidateQueries('create');
        }
    });

    //Sort Table

    const { items, requestSort, sortConfig } = useSortableData(transactions)

    //FUNCTIONS CHANGE DATA

    function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault()
        const status = e.target.value as string
        const id = e.target.id as string

        const user:any = transactions.filter((e:any)=>e.id===id)
        
        let data: EmailT = {
            name: user[0].userFirstName as string,
            email: user[0].userEmail as string,
            idT: id,
            status: status,
            action: 'sendStatus',
            message: "estado enviado",
        }
        console.log(paymentData)
        if (status && id) {
            mutationSendEmail.mutate(data)
            mutation.mutate({ id, data: { status } })
            return
        } else return
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
    let currentItems: TransactionT[] = []
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
                {/* <FormCreateTransaction
                    {...mutationCreate}
                /> */}
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
                                    onClick={() => requestSort('userFirstName')}>
                                    NOMBRE
                                    <FaSort />
                                </button>
                            </th>
                            <th className="th-head">
                                <button
                                    className="button-head"
                                    type="button"
                                    onClick={() => requestSort('userLastName')}>
                                    APELLIDO
                                    <FaSort />
                                </button>
                            </th>

                            <th className="th-head">
                                <button
                                    className="button-head"
                                    type="button"
                                    onClick={() => requestSort('userEmail')}>
                                    EMAIL
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
                            ? currentItems.map((u: TransactionT) => {
                                return (
                                    <>
                                        <tr
                                            key={u.id}
                                            className="tr-body bg-pwgreen-50">
                                            <td className="td-body">
                                                <div className="flex flex-col items-center content-center">
                                                    <span className="text-center text-ellipsis overflow-hidden ml-2 font-semibold">
                                                        {u.id}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="td-body">
                                                {u.user.firstName}
                                            </td>
                                            <td className="td-body">
                                                {u.user.lastName}
                                            </td>
                                            <td className="td-body">
                                                {u.user.email}
                                            </td>
                                            <td className="td-body">
                                                {u.amount}
                                            </td>
                                            <td className="td-body">
                                                <select
                                                    className="input w-max"
                                                    name="role"
                                                    value={u.status}
                                                    id={u.id}
                                                    onChange={
                                                        handleStatusChange
                                                    }>
                                                    <option value="REFUND">
                                                        REEMBOLSO
                                                    </option>
                                                    <option value="INCOMPLETE_PAYMENT">
                                                        PAGO INCOMPLETO
                                                    </option>
                                                    <option value="PROCESSING_PAYMENT">
                                                        PROCESANDO PAGO
                                                    </option>
                                                    <option value="PROCESSING_SHIPPING">
                                                        PROCESANDO ENVIO
                                                    </option>
                                                    <option value="SHIPPING">
                                                        ENVIADO
                                                    </option>
                                                    <option value="PAYMENT_COMPLETE">
                                                        PAGO COMPLETO
                                                    </option>
                                                </select>
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
                                                    key={u.updatedAt}
                                                    className="tr-head">
                                                    <th className="th-head">
                                                        Categoria
                                                    </th>
                                                    <th className="th-head">
                                                        Nombre del Producto
                                                    </th>
                                                    <th className="th-head">
                                                        Cantidad
                                                    </th>
                                                    <th className="th-head">
                                                        Costo
                                                    </th>
                                                    <th className="th-head">
                                                        Vendido
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
                                                                    {q.quantity || 'n/a'}
                                                                </td>
                                                                <td className="td-body">
                                                                    {q.product.price * q.quantity || 'n/a'}
                                                                </td>
                                                                <td className="td-body">
                                                                    {q.product.displayPrice * q.quantity || 'n/a'}
                                                                </td>
                                                            </tr>

                                                        </>
                                                    )
                                                }) : <></>}
                                            </>
                                        )

                                            : null}
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
                                (filteredData ? filteredData : transactions)?.length
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
export default TableTransaction
