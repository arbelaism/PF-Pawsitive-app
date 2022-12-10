import * as React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getUsers, putUsers } from 'utils/dbFetching';
import { Users } from 'app/types'
import { useSortableData, useSearchData } from '../tools'; //sort function
import Image from 'next/image';
import AlternativePagination from 'components/layout/AlternativePagination'
import { Search } from '@mui/icons-material';

interface Data {
  id: string,
  data: {
    role: string,
    active?: string
  }
}

const TableUser = () => {

  //QUERY DATA GET AND PUT
  const {
    data: users,
    isLoading,
    isSuccess
  } = useQuery(['users'], getUsers)

  const queryClient = useQueryClient()
  const mutation = useMutation(({ id, data }: any) => putUsers(id, data), {
    onSuccess: () => {
      queryClient.prefetchQuery("users", getUsers)
    }
  })

  //Sort Table

  const { items, requestSort, sortConfig } = useSortableData(users);

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
    if (active === "false" && id) {
      mutation.mutate({ id, data: { active: false } })
      return
    } else {
      mutation.mutate({ id, data: { active: true } })
      return
    }
  }

  // //Collapsing table
  // const [condition, setCondition] = React.useState({ expanded: false })

  // console.log(condition)
  // function toggleExpander(e: React.MouseEvent<HTMLButtonElement>) {
  //   e.preventDefault()
  //   if (!condition.expanded) {
  //     setCondition({ ...condition, expanded: true })
  //   } else { setCondition({ ...condition, expanded: false }) }
  // }
  //Searach Values

  const [searchVal, setSearchVal] = React.useState(null);

  const { filteredData, loading } = useSearchData({
    searchVal,
    retrieve: items
  });



  //Pagination
  const [currentPage, setCurrentPage] = React.useState<number>(1)
  const [itemsPerPage, _setItemsPerPage] = React.useState<number>(6)
  const lastItemIndex = currentPage * itemsPerPage
  const firstItemIndex = lastItemIndex - itemsPerPage
  let currentItems: Users[] = []
  if (filteredData) currentItems = [...filteredData?.slice(firstItemIndex, lastItemIndex)]

  return (
    <div className='w-full'>
      <div className='flex flex-row justify-around w-full'>
        {!isLoading && currentItems ? (
          <AlternativePagination
            totalItems={(items ? items : users)?.length}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
          />
        ) : null}
        <form>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input type="search" id="search" className="block w-full p-4 pl-10 text-sm text-gray-900 border bg-gray-50 border-pwpurple-300 rounded-lg focus:ring-pwpurple-500 focus:border-pwpurple-500"
              placeholder="Search"
              onChange={(e: any) => setSearchVal(e.target.value)}
            />
          </div>
        </form>
      </div>

      <table className='min-w-full table-auto hover:table-fixed'>
        <thead>
          <tr className='bg-pwgreen-600 text-lg font-bold '>
            <th className='px-5 py-2'>
              <span className='text-pwgreen-50'>
                ID
              </span>
            </th>
            <th className='px-5 py-2'>
              <button
                className='w-full p-2 focus:outline-none border-4 border-pwpurple-600 text-white hover:bg-pwpurple-600 focus:ring-4 font-medium rounded-lg '
                type='button'
                onClick={() => requestSort('firstName')}
              >
                <span className='text-pwgreen-50'>
                  NOMBRE
                </span>
              </button>

            </th>
            <th className='px-5 py-2'>
              <button
                className='w-full p-2 focus:outline-none border-4 border-pwpurple-600 text-white hover:bg-pwpurple-600 focus:ring-4 font-medium rounded-lg '
                type='button'
                onClick={() => requestSort('lastName')}
              >
                <span className='text-pwgreen-50'>
                  APELLIDO
                </span>
              </button>

            </th>

            <th className='px-5 py-2'>
              <span className='text-pwgreen-50'>
                EMAIL
              </span>
            </th>
            <th className='px-5 py-2'>
              <span className='text-pwgreen-50'>
                GENERO
              </span>
            </th>
            <th className='px-5 py-2'>
              <span className='text-pwgreen-50'>
                FECHA DE NACIMIENTO
              </span>
            </th>
            <th className='px-5 py-2'>
              <span className='text-pwgreen-50'>
                DIRECCION
              </span>
            </th>
            <th className='px-16 py-2'>
              <span className='text-pwgreen-50'>
                ROL
              </span>
            </th>
            <th className='px-16 py-2'>
              <span className='text-pwgreen-50'>
                ESTADO
              </span>
            </th>
            <th className='px-5 py-2'>
              <button
                className='w-full p-2 focus:outline-none border-4 border-pwpurple-600 text-white hover:bg-pwpurple-600 focus:ring-4 font-medium rounded-lg '
                type='button'
                onClick={() => requestSort('createdAt')}
              >
                <span className='text-pwgreen-50'>
                  REGISTRADO
                </span>
              </button>
            </th>
          </tr>
        </thead>
        <tbody className='bg-pwgreen-200'>
          {isSuccess ? (currentItems.map((u: Users) => {
            return (
              <tr key={u.id} className='bg-pawgreen-50 text-center'>
                <td className='px-16 py-2 flex flex-row items-center'>
                  {/* <button
                    className='p-1 text-xs focus:outline-none border-4 border-pwpurple-600 text-white hover:bg-pwpurple-600 focus:ring-4 font-medium rounded-lg bg-pwgreen-600 '
                    type='button'
                    onClick={toggleExpander}
                  >
                    {condition.expanded
                      ? <span className='text-pwgreen-50'>
                        [+]
                      </span>
                      : <span className='text-pwgreen-50'>
                        [-]
                      </span>
                    }
                  </button> */}
                  <Image
                    src={u.photo || "#"}
                    alt={u.id}
                    width={50}
                    height={50}
                  />
                  <span className='text-center ml-2 font-semibold'>{u.id}</span>
                </td>
                <td className='px-5 py-2'>{u.firstName || "No hay Datos"}</td>
                <td className='px-5 py-2'>{u.lastName || "No hay Datos"}</td>
                <td className='px-5 py-2'>{u.email || "No hay Datos"}</td>
                <td className='px-5 py-2'>{u.gender || "No hay Datos"}</td>
                <td className='px-5 py-2'>{u.birthday || "No hay Datos"}</td>
                <td className='px-5 py-2'>{u.address || "No hay Datos"}</td>
                <td className='px-5 py-2'>
                  <select className='bg-gray-50 border border-pwpurple-300 text-gray-900 text-xs rounded-lg focus:ring-pwpurple-500 focus:border-pwpurple-500 block w-full p-2.5' name="role" id={u.id} value={u.role} onChange={handleRoleChange} >
                    <option value="BASIC">BASICO</option>
                    <option value="PROFESSIONAL">PROFESIONAL</option>
                    <option value="ADMIN">ADMINISTRADOR</option>
                  </select>
                </td>
                <td className='px-5 py-2'>
                  <select className='bg-gray-50 border border-pwpurple-300 text-gray-900 text-xs rounded-lg focus:ring-pwpurple-500 focus:border-pwpurple-500 block w-full p-2.5    ' name="active" id={u.id} value={u.active.toString()} onChange={(e) => handleActiveChange(e)} >
                    <option value="true" className='bg-pwgreen-500 text-pwgreen-50 font-bold' >ACTIVO</option>
                    <option value="false" className='bg-pwpurple-500 text-pwpurple-50 font-bold'>DESACTIVADO</option>
                  </select>
                </td>
                <td className='px-5 py-2'>{u.createdAt}</td>
              </tr>


            )
          }
          )) : isLoading
          }
          {/* { condition.expanded ?  <tr></tr>:null} */}
        </tbody>
      </table>
    </div>
  );
}
export default TableUser