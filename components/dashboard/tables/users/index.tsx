import * as React from 'react';
import { useQuery, useMutation } from 'react-query';
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
  const {
    data: users,
    refetch,
    isLoading,
    isSuccess
  } = useQuery(['users'], getUsers)

  // const [data, setData] = useState({
  //   role: '',
  //   active: ''
  // })

  const { mutate, isSuccess: isSuccesPut } = useMutation(({ id, data }: any) => putUsers(id, data))



  function handleRoleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault()
    const role = e.target.value as string
    const id = e.target.id as string
    console.log(role, id)
    if (role && id) {
      mutate({ id, data: { role } })
      refetch()
      return
    } else return

  }

  function handleActiveChange(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault()
    const active = e.target.value
    const id = e.target.id as string
    console.log(active, id)

    if (active === "false" && id) {
      mutate({ id, data: { active: false } })
      refetch()
      return
    } else {
      mutate({ id, data: { active: true } })
      refetch()
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
              <span className='text-pwgreen-50'>
                NOMBRE
              </span>
            </th>
            <th className='px-5 py-2'>
              <span className='text-pwgreen-50'>
                APELLIDO
              </span>
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
              <span className='text-pwgreen-50'>
                REGISTRADO
              </span>
            </th>
          </tr>
        </thead>
        <tbody className='bg-pwgreen-200'>
          {isSuccess ? (users.map((u: Users) => {
            return (
              <tr key={u.id} className='bg-pawgreen-50 text-center'>
                <td className='px-5 py-2 flex flex-row items-center'>
                  <Image
                    src={u.photo}
                    alt={u.id}
                    width={80}
                    height={80}
                    
                  />

                  <span className='text-center ml-2 font-semibold'>{u.id}</span>
                </td>
                <td className='px-5 py-2'>{u.lastName || "No hay Datos"}</td>
                <td className='px-5 py-2'>{u.firstName || "No hay Datos"}</td>
                <td className='px-5 py-2'>{u.email || "No hay Datos"}</td>
                <td className='px-5 py-2'>{u.gender || "No hay Datos"}</td>
                <td className='px-5 py-2'>{u.birthday || "No hay Datos"}</td>
                <td className='px-5 py-2'>{u.address || "No hay Datos"}</td>
                <td className='px-5 py-2'>
                  <select name="role" id={u.id} value={u.role} onChange={handleRoleChange} >
                    <option value="BASIC">BASICO</option>
                    <option value="PROFESSIONAL">PROFESIONAL</option>
                    <option value="ADMIN">ADMINISTRADOR</option>
                  </select>
                </td>
                <td className='px-5 py-2'>
                  <select name="active" id={u.id} value={u.active.toString()} onChange={(e) => handleActiveChange(e)} >
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