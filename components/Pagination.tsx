import React, { EventHandler, useEffect } from 'react'
import { useState } from 'react'
import styles from '../styles/Pagination.module.css'
import AdoptionCard from './AdoptionCard'

interface Props {
    data: Adoption[]
    pageLimit: number
    dataLimit: number
}
type Adoption = {
    id: number
    name: string
    size: string
    age: string
    breed: string
    photo: string
    active?: boolean
    userAdop?: User
}
type User = {
    name: string
    lastName: string
    email: string
}

export default function Pagination({ data, pageLimit, dataLimit }: Props) {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages] = useState(Math.round(data.length / dataLimit))

    if (pageLimit > totalPages) {
        pageLimit = totalPages
    }
    useEffect(() => {
        setCurrentPage(1)
    }, [totalPages, data])

    function nextPage() {
        setCurrentPage(page => page + 1)
    }

    function previousPage() {
        setCurrentPage(page => page - 1)
    }

    function initPage() {
        setCurrentPage(1)
    }
    function finalPage() {
        setCurrentPage(totalPages)
    }

    function changePage(event: any) {
        const pageNumber = Number(event.target.textContent)
        setCurrentPage(pageNumber)
    }

    function getPageData() {
        const startIndex = currentPage * dataLimit - dataLimit
        const endIndex = startIndex + dataLimit
        return data.slice(startIndex, endIndex)
    }
    function getViewOfPages() {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit
        return new Array(pageLimit)
            .fill(undefined)
            .map((_, idx) => start + idx + 1)
    }
    return (
        <div className={styles.container}>
            {getPageData().length === 0 ? (
                <h1 className={styles.h1}>No hay datos</h1>
            ) : (
                <>
                    <div className={styles.pagination}>
                        <button
                            onClick={initPage}
                            className={`${styles.prev} ${
                                currentPage === 1 ? `${styles.disabled}` : ''
                            }`}>
                            «
                        </button>

                        <button
                            onClick={previousPage}
                            className={`${styles.prev} ${
                                currentPage === 1 ? `${styles.disabled}` : ''
                            }`}>
                            prev
                        </button>

                        {getViewOfPages().map((item, index) => (
                            <button
                                key={index}
                                value={item}
                                onClick={changePage}
                                className={`${styles.paginationItem} ${
                                    currentPage === item
                                        ? `${styles.active}`
                                        : null
                                }`}>
                                {item}
                            </button>
                        ))}

                        <button
                            onClick={nextPage}
                            className={`${styles.next} ${
                                currentPage >= totalPages
                                    ? `${styles.disabled}`
                                    : ''
                            }`}>
                            next
                        </button>

                        <button
                            onClick={finalPage}
                            className={`${styles.next} ${
                                currentPage >= totalPages
                                    ? `${styles.disabled}`
                                    : ''
                            }`}>
                            »
                        </button>
                    </div>
                    <div className={styles.dataContainer}>
                        {getPageData().map((d, idx) => (
                            <AdoptionCard key={idx} {...d} />
                        ))}
                    </div>
                    )
                </>
            )}
        </div>
    )
}
