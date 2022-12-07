import React from 'react'
import { NextPage } from 'next'
import { SignUp, MainLayout } from 'components'

const Register: NextPage = () => {
    return (
        <MainLayout title="Registrate! - Pawsitive">
            <SignUp />
        </MainLayout>
    )
}

export default Register
