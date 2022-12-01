import styles from 'styles/Filters.module.css'
import React from 'react'
import axios from 'axios'
import { IAdoption } from 'app/types'
import { getAdoptions } from 'utils/dbFetching'
import { useQuery } from 'react-query'
import { set } from 'react-hook-form'
type Props = {
    data: IAdoption[] | undefined
    setData: (data: IAdoption[]) => void
}

const Filters = ({ setData, data }: Props) => {
    // async function handleFilterBreed(e: React.ChangeEvent<HTMLInputElement>) {
    //     e.preventDefault()
    //     const breed = e.target.value
    //     if (breed === '') return

    //     const breeds: IAdoption = await axios.get(
    //         `http://localhost:3000/api/adoptionposts/type/${breed}`
    //     )
    //     console.log(breeds)
    //     setData(breeds)
    //     return
    // }
    const {
        data: adoptions,
        error,
        isLoading,
        isSuccess
    } = useQuery(['adoptions'], getAdoptions)
    console.log("setData", setData)


    function handleFilterCategory(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault()
        const breed = e.target.value as string
        if (breed === '') return

        const filteredData = (data ? data : adoptions)?.filter((d) => d.breed === breed)
        setData(filteredData)
        return


    }
    function handleFilterSize(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault()
        const size = e.target.value as string
        if (size === '') return

        const filteredData = (data ? data : adoptions)?.filter((d) => d.size === size.toUpperCase())
        setData(filteredData)
        return


    }
    function handleFilterAge(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault()
        const age = e.target.value as string
        if (age === '') return

        const filteredData = (data ? data : adoptions)?.filter((d) => d.breed === age.toLowerCase())
        setData(filteredData)
        return
    }

    async function handleReset() {
        const select = document.querySelectorAll('select')

        select.forEach(s => (s.value = ''))
        setData(adoptions)

        return
    }

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
                    <option value="1 mes">1 Mes</option>
                    <option value="2 meses">2 Meses</option>
                    <option value="3 meses">3 Meses</option>
                    <option value="4 meses">4 Meses</option>
                    <option value="5 meses">5 Meses</option>
                    <option value="1 year">1 año</option>
                    <option value="2 years">2 años</option>
                    <option value="3 years">3 años</option>
                </select>
                <button onClick={handleReset}>Reset</button>
            </div>
        </div>
    )
}
export default Filters
