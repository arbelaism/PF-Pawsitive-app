import React from 'react'
import { NextPage } from 'next'
import BarGraphic from '../graphics/BarGraphic'
import { getAdoptions } from 'utils/dbFetching'
import { useQuery } from 'react-query'
import { Adoptions } from '../../../app/types'



const RegisterAdoptions: NextPage = () => {

  const {
    data: adoptions,
    isSuccess
  } = useQuery(['adoptions'], getAdoptions)


  const fecha = new Date();

  const añoActual = fecha.getFullYear()


  function getRegister() {
    if (isSuccess) {
      const info: number[] = [];
      for (let i = fecha.getMonth() + 1; i > fecha.getMonth() - 1; i--) {
        let j = i > 9 ? i : `0${i}`
        let registeredCurrentMont: Adoptions[] = adoptions.filter((u: Adoptions) => u.createdAt.includes(`${añoActual}-${j}`))
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
      title: 'Mascotas Registradas',
      labelstitle: 'Mascotas',
      datos: result,
    }
    return data
  }

  const data = createData()


  return (
    <div >
      <BarGraphic key={6} {...data} />
    </div>
  )
}

export default RegisterAdoptions