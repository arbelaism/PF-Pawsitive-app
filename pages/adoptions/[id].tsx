import React, { useEffect, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { MainLayout } from 'components'
import { IAdoption } from 'app/types'
import axios from 'axios'
import { useRouter } from 'next/router'

export type Props = {
    [key: string]: any
}

const Detail: NextPage = () => {
    const [adoption, setAdoption] = useState<IAdoption>()
    const router = useRouter()
    const { id } = router.query

    const fetchAdoption = async (id: string) => {
        if (id) {
            const response = await axios.get(
                `http://localhost:3000/api/read/adoptionposts/id/${id}`
            )
            const adoption = await response.data
            setAdoption(adoption)
            return
        }
    }

    useEffect(() => {
        fetchAdoption(id!)
    }, [])

    console.log(id)
    //console.log(adoption)
    return (
        <MainLayout title="Pawsitive - Adoptions">
            {/* <h1>{adoption?.name}</h1>
            <h1>{id}</h1> */}
        </MainLayout>
    )
}

export default Detail
