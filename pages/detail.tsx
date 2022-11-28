import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { MainLayout } from 'components'
import { IAdoption } from 'app/types'
import axios from "axios"

export type Props = {
  [key: string]: any
}

export const getServerSideProps: GetServerSideProps<{
  adoption: IAdoption
}> = async () => {
  const response = await axios.get(
      'http://localhost:3000/api/read/adoptionposts/id/1'
  )

  const adoption: IAdoption = await response.data

  if (!adoption) {
      return {
          notFound: true
      }
  }

  return {
      props: {
          adoption
      }
  }
}

const Detail: NextPage = ({adoption}:Props) => {
  return (
    <MainLayout title="Pawsitive - Adoptions">
        <h1>{adoption.name}</h1>
    </MainLayout>
  )
}

export default Detail
