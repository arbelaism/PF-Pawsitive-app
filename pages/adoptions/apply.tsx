import { NextPage } from 'next'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { IAdoption } from 'app/types';
import { MainLayout } from 'components'
import AdoptionApply from 'components/adoptions/AdoptionApply';
import { useQuery } from 'react-query'
import { getAdoptions } from 'utils/dbFetching'
import AlternativePagination from 'components/layout/AlternativePagination'
import NotFound from 'public/mong03b.gif'
import Image from 'next/image'



const Apply: NextPage = () => {
    

    return (
        <MainLayout title="Pawsitive - Adoptions Apply">
            <AdoptionApply/>
        </MainLayout>
    )
}

export default Apply;