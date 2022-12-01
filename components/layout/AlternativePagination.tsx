import React from 'react'
import Pagination from '@mui/material/Pagination'

type Props = {
    totalItems: number
    itemsPerPage: number
    setCurrentPage: (currentPage: number) => void
}

const AlternativePagination = ({
    totalItems,
    itemsPerPage,
    setCurrentPage
}: Props) => {
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value)
    }
    return (
        <Pagination
            count={Math.ceil(totalItems / itemsPerPage)}
            shape="rounded"
            size="large"
            showFirstButton
            showLastButton
            onChange={handleChange}
        />
    )
}

export default AlternativePagination
