import React from 'react'
import Pagination from '@mui/material/Pagination'

type Props = {
    totalItems: number
    itemsPerPage: number
    setCurrentPage: (currentPage: number) => void
    size: 'small' | 'medium' | 'large' | undefined
}

const AlternativePagination = ({
    totalItems,
    itemsPerPage,
    setCurrentPage,
    size
}: Props) => {
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value)
    }
    return (
        <Pagination
            count={Math.ceil(totalItems / itemsPerPage)}
            shape="rounded"
            size={size}
            showFirstButton
            showLastButton
            onChange={handleChange}
        />
    )
}

export default AlternativePagination
