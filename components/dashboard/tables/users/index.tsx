import * as React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getUsers, putUsers } from 'utils/dbFetching';
import { Users } from 'app/types'
import { useState } from 'react';
import { useEffect } from 'react';
import Image from 'next/image';

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

  interface Confi {
    key?: string | '',
    direction?: string | ''
  }


  //SORT DATA
  const useSortableData = (items: Users[], config: Confi = { key: "", direction: "" }) => {
    const [sortConfig, setSortConfig] = useState<Confi>(config);

    const sortedItems = React.useMemo(() => {
      let sortableItems = items;

      if (sortConfig && sortConfig.key && sortConfig.direction ) {
        // let keys = sortConfig.key as string
        // if (sortConfig.key != undefined) {
        //   result = obj2[sortConfig.key as keyof typeof a];
        // }
        sortableItems.sort((a: Users, b: Users) => {
          if ((a[sortConfig.key as keyof typeof a] as string).toLowerCase() < (b[sortConfig.key as keyof typeof b] as string).toLowerCase()) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if ((a[sortConfig.key as keyof typeof a] as string).toLowerCase() > (b[sortConfig.key as keyof typeof b] as string).toLowerCase()) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key: string) => {
      let direction = 'ascending';
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === 'ascending'
      ) {
        direction = 'descending';
      }
      setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
  };

  const { items, requestSort, sortConfig } = useSortableData(users);
  console.log(items)
  // const getClassNamesFor = (name) => {
  //   if (!sortConfig) {
  //     return;
  //   }
  //   return sortConfig.key === name ? sortConfig.direction : undefined;
  // };

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




  return (
    <div>
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
            <th className='px-5 py-2'>
              <span className='text-pwgreen-50'>
                ROL
              </span>
            </th>
            <th className='px-16 py-2'>
              <span className='text-pwgreen-50'>
                ACTIVO
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
          {isSuccess ? (items.map((u: Users) => {
            return (
              <tr key={u.id} className='bg-pawgreen-50 text-center'>
                <td className='px-5 py-2 flex flex-row items-center'>
                  <Image
                    src={u.photo || "#"}
                    alt={u.id}
                    width={80}
                    height={80}

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
                    <option value="true" >ACTIVO</option>
                    <option value="false">DESACTIVADO</option>
                  </select>
                </td>
                <td className='px-5 py-2'>{u.createdAt}</td>
              </tr>)
          }
          )) : isLoading
          }
        </tbody>
      </table>
    </div>
  );
}
export default TableUser