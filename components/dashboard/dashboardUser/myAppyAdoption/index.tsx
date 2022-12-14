import React from 'react'
import { useUser } from "@auth0/nextjs-auth0/client";
import { useQuery } from 'react-query'
import { getApplyById } from 'utils/dbFetching'

const MyApplyAdoption = () => {
    const { user, error: err, isLoading: load } = useUser();
    const id = user?.sub as string
    //QUERY DATA GET AND PUT

    const {
        data: applyData,
        error,
        isLoading,
        isSuccess,
    } = useQuery(["user", id], () => getApplyById(id));
  return (
    <div>MyApplyAdoption</div>
  )
}

export default MyApplyAdoption