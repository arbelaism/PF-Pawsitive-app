import { NextComponentType } from 'next'
import styles from '../styles/Filters.module.css'
import React, { useContext, useEffect, useReducer, useState } from 'react'
// import { fetchAdoptions } from 'app/actions'
// import { reducer } from 'app/reducer'
// import AppContext from 'app/store'
import { Props } from 'pages/adoptions'
import axios from 'axios'
import { Pagination } from 'components'

const Filters: NextComponentType = ({ adoptions }: Props) => {
    const [data, setData] = useState(adoptions)

    //TRYING TO FILTER BY AGE=>>>>

    // const ctx = useContext(AppContext)
    // const [state, dispatch] = useReducer(reducer, ctx)
    // useEffect(() => {
    //     fetchAdoptions().then(value => {
    //         dispatch({ type: FETCH_ADOPTIONS, payload: value })
    //     })
    // }, [dispatch])

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    //     const target = e.target as HTMLInputElement;
    //     dispatch
    //     filterByAge(target.value).then(value=>{
    //         dispatch({type: FILTER_BY_AGE, payload: value})
    //     })
    // }

    async function handleFilterSize(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault()
        const size = e.target.value
        const sizes = await axios.post(
            `http://localhost:3000/api/read/adoptionposts/size`,
            {
                size:size
            }
        )
        
        setData(sizes.data)

        return
    }
    async function handleFilterBreed(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault()
        const breed = e.target.value
        if (breed === '') return
        const breeds = await axios.get(
            `http://localhost:3000/api/read/adoptionposts/type/${breed}`
        )

        setData(breeds.data)

        return
    }
    async function handleOrderAge(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault()
        const order = e.target.value
        if (order === '') return
        const breeds = await axios.get(
            `http://localhost:3000/api/read/adoptionposts/age/${order}`
        )

        setData(breeds.data)

        return
    }
    async function handleReset() {
        const select = document.querySelectorAll('select')

        select.forEach(s => (s.value = ''))
        setData(adoptions)

        return
    }

    return (
        <div className={styles.container}>
            <div className={styles.filtersContainer}>
                <div className={styles.itemFilter}>
                    <h2>Filtrar por Categoría</h2>
                    <select
                        name="selector"
                        onChange={e => handleFilterBreed(e)}
                        className={styles.itemSelector}>
                        <option value="">Categoria...</option>
                        <option value="gato">Gatos</option>
                        <option value="perro">Perros</option>
                        <option value="ave">Aves</option>
                        <option value="tortuga">Tortugas</option>
                        <option value="roedor">Roedores</option>
                        <option value="otros">Otros</option>
                    </select>
                </div>

                <div className={styles.itemFilter}>
                    <h2>Filtrar por Tamaño</h2>
                    <select
                        name="size"
                        onChange={e => handleFilterSize(e)}
                        className={styles.itemSelector}>
                        <option value="">Tamaño...</option>
                        <option value="BIG">Grande</option>
                        <option value="MEDIUM">Mediano</option>
                        <option value="SMALL">Pequeño</option>
                    </select>
                </div>

                <div className={styles.itemFilter}>
                    <h2>Ordenar por Edad</h2>
                    <select
                        name="age"
                        onChange={(e) => handleOrderAge(e)}
                        className={styles.itemSelector}>
                        <option value="">Edad...</option>
                        <option value="min">Menor a mayor</option>
                        <option value="max">Mayor a menor</option>                        
                    </select>
                    <button onClick={handleReset}>Reset</button>
                </div>
            </div>
            <div className="flex flex-wrap justify-end items-center">
                <Pagination data={data} pageLimit={3} dataLimit={6} />
            </div>
        </div>
    )
}
export default Filters
