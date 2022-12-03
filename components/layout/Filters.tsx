import styles from 'styles/Filters.module.css'
import React, { useEffect, useState } from 'react'
import { IAdoption } from 'app/types'
import { getAdoptions } from 'utils/dbFetching'
import { useQuery } from 'react-query'
type Props = {
    data: IAdoption[] | undefined
    setData: (data: IAdoption[]) => void
    setCurrentPage: (n: number) => void
}
interface Values {
    breed: string,
    size: string,
    age: string,
}

const Filters = ({ setData, data, setCurrentPage }: Props) => {
    const {
        data: adoptions,
        error,
        isLoading,
        isSuccess
    } = useQuery(['adoptions'], getAdoptions)

    let values = { breed: "", size: "", age: "" }

    function handleFilterCategory(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault()
        const breed = e.target.value as string
        if (breed === '') return
        values = ({ ...values, breed: breed })
        return


    }
    function handleFilterSize(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault()
        const size = e.target.value as string
        if (size === '') return
        values = ({ ...values, size: size })
        return


    }
    function handleFilterAge(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault()
        const age = e.target.value as string
        if (age === '') return
        values = ({ ...values, age: age })
        return
    }
    function orderData(values: Values, data: IAdoption[]) {
        const { breed, size, age } = values
        let filteredData: IAdoption[]=[];
        if (breed && size && age) {
            filteredData = adoptions?.filter((d: IAdoption) => d.breed === breed)
                .filter((d: IAdoption) => d.size === size)
                .filter((d: IAdoption) => d.age === age)
            setCurrentPage(1)
            return setData(filteredData)
        }
        if (breed) {
            filteredData = data?.filter((d: IAdoption) => d.breed === breed)
        }
        if (size) {
            filteredData = data?.filter((d: IAdoption) => d.size === size)
        }
        if (age) {
            filteredData = data?.filter((d: IAdoption) => d.age === age)
        }
        setCurrentPage(1)
        return setData(filteredData)
    }

    async function handleReset() {
        // orderData(values, adoptions)
        const select = document.querySelectorAll('select')

        select.forEach(s => (s.value = ''))
        setData(adoptions)

        return
    }
    async function handleFilter() {
        orderData(values, adoptions)
        const select = document.querySelectorAll('select')

        select.forEach(s => (s.value = ''))
        // setData(adoptions)

        return
    }
    useEffect(() => {

    }, [])
    return (
        <div className={styles.filtersContainer}>
            <div className={styles.itemFilter}>
                <h2>Filtrar por Categoría</h2>
                <select
                    name="selector"
                    onChange={e => handleFilterCategory(e)}
                    className={styles.itemSelector}>
                    <option value="">Categoría...</option>
                    <option value="gato">Gatos</option>
                    <option value="perro">Perros</option>
                    <option value="ave">Aves</option>
                    <option value="tortuga">Tortugas</option>
                </select>
            </div>

            <div className={styles.itemFilter}>
                <h2>Filtrar por Tamaño</h2>
                <select
                    name="size"
                    onChange={(e) => handleFilterSize(e)}
                    className={styles.itemSelector}>
                    <option value="">Tamaño...</option>
                    <option value="BIG">Grande</option>
                    <option value="MEDIUM">Mediano</option>
                    <option value="SMALL">Pequeño</option>
                </select>
            </div>

            <div className={styles.itemFilter}>
                <h2>Filtrar por Edad</h2>
                <select
                    name="age"
                    onChange={(e) => handleFilterAge(e)}
                    className={styles.itemSelector}>
                    <option value="">Edad...</option>
                    <option value="1 meses">1 Mes</option>
                    <option value="2 meses">2 Meses</option>
                    <option value="3 meses">3 Meses</option>
                    <option value="4 meses">4 Meses</option>
                    <option value="5 meses">5 Meses</option>
                    <option value="1 años">1 año</option>
                    <option value="2 años">2 años</option>
                    <option value="3 años">3 años</option>
                </select>
            </div>
            <div  >
                <button className={styles.buttons} onClick={handleFilter}>Filter</button>
                <button className={styles.buttons} onClick={handleReset}>Reset</button>
            </div>
        </div>
    )
}
export default Filters
