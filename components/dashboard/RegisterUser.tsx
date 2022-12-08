import React from 'react'
import { NextPage } from 'next'
import BarGraphic from './graphics/BarGraphic'
import { getUsers } from 'utils/dbFetching'
import { useQuery } from 'react-query'
import { Users } from '../../app/types'

interface Data {
  title: string,
  bridge: string,
  labelRow: string[],
  labels1title: string,
  labels2title: string,
  labels1: string[],
  labels2: string[],
  dat1: number[],
  dat2: number[],
}
type Dat1Dat2 = [number[], number[]]

const RegisterUser: NextPage = () => {

  const {
    data: users,
    error,
    isLoading,
    isSuccess
  } = useQuery(['users'], getUsers)


  const fecha = new Date();

  const añoActual = fecha.getFullYear()


  function getRegister() {
    if (isSuccess) {
      const info: number[] = [];
      for (let i = fecha.getMonth() + 1; i > fecha.getMonth() - 1; i--) {
        let j = i > 9 ? i : `0${i}`
        let registeredCurrentMont: Users[] = users.filter((u: Users) => u.createdAt.includes(`${añoActual}-${j}`))
        info.push(registeredCurrentMont.length)


      }
      return info
    }
  }

  interface Props {
    title: string,
    labelstitle: string,
    datos: number[],
  }


  function createData() {
    const result = getRegister() || [0, 0]

    const data = {
      title: 'Usuarios Registrados',
      labelstitle: 'Usuarios',
      datos: result,
    }
    return data
  }

  const data = createData()


  return (
    <div >
      <BarGraphic key={5} {...data} />
    </div>
  )
}

export default RegisterUser