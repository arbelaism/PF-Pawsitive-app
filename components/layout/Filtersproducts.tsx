import styles from 'styles/Filters.module.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Product } from 'app/types'
import { getProducts } from 'utils/dbFetching'
import { useQuery } from 'react-query'

export type Props = {
    data: Product[] | undefined
    setData: (data: Product[]) => void
    setCurrentPage: (n: number) => void
}

interface Values {
    category: string,
    size: string,
    price: number,
}

const Filters = ({ setData, data, setCurrentPage }: Props) => {

    const {
        data: products,
        error,
        isLoading,
        isSuccess
    } = useQuery(['products'], getProducts)

    let values = {
        category: "",
        size: "",
        price: 0
    }

    //SEARCHBAR

    const [name, setName] = useState("");
    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setName(e.target.value);
    }
    function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const productFiltered = products?.filter((product: Product) => new RegExp(name, 'ig').test(product.name))
        setData(productFiltered)
        setName("");
    }

    // FILTERS

    function handleFilterCategory(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault()
        const category = e.target.value as string
        if (category === '') return

        values = ({ ...values, category: category })
        console.log(values)
        // orderData(refValues.current, adoptions)
        return
    }

    function handleFilterSize(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault()
        const size = e.target.value as string
        if (size === '') return

        values = ({ ...values, size: size })
        console.log(values)
        // orderData(refValues.current, adoptions)
        return
    }

    function handleFilterPrice(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault()
        const price = Number(e.target.value) as number
        if (price === 0) return

        values = ({ ...values, price: price })
        console.log(values)
        // orderData(refValues.current, adoptions)
        return
    }
    function orderData(values: Values, data: Product[]) {
        const { category, size, price } = values
        let filteredData: Product[] = [];
        if (category && size && price) {
            filteredData = (products)?.filter((d: Product) => d.category === category)
                .filter((d: Product) => d.size === size)
                .filter((d: Product) => d.price < price)
            setCurrentPage(1)
            return setData(filteredData)
        }
        if (category) {
            filteredData = (data)?.filter((d: Product) => d.category === category)
        }
        if (size) {
            filteredData = (filteredData ? filteredData : data)?.filter((d: Product) => d.size === size)
        }
        if (price) {
            filteredData = ((filteredData ? filteredData : data))?.filter((d: Product) => d.price < price)
        }
        setCurrentPage(1)
        return setData(filteredData)
    }

    function handlerSort(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault()
        const orderSort = e.target.value as string
        let filteredD: Product[] = (products).sort((a: Product, b: Product) => {
            if (a.displayPrice > b.displayPrice) return 1
            if (b.displayPrice > a.displayPrice) return -1
            return 0
        })
        // console.log(filteredD)
        // setData(filteredD)
        // if (orderSort === "MAX") {
        //    let ordered = filteredD.reverse()
        //     setCurrentPage(1)
        //     return  setData(ordered)
        // } else if (orderSort === "MIN") {
        //     setCurrentPage(1)
        //     return setData(filteredD)
        // }
    }

    async function handleReset() {
        // orderData(values, adoptions)
        const select = document.querySelectorAll('select')

        select.forEach(s => (s.value = ''))
        setCurrentPage(1)
        setData(products)

        return
    }
    async function handleFilter() {
        orderData(values, products)
        const select = document.querySelectorAll('select')

        select.forEach(s => (s.value = ''))
        // setData(adoptions)

        return
    }

    return (
        <div className={styles.filtersContainer}>
            <form className={styles.itemFilter}>
                <h2>Filtrar por Nombre</h2>
                <input
                    type="text"
                    id='search'
                    placeholder='Buscar por Nombre'
                    className={styles.itemSelector}
                    value={name}
                    onChange={handleInputChange}

                />
                <button

                    className={styles.buttons}
                    type="submit"
                    onClick={e => handleSubmit(e)}
                > Buscar</button>
            </form>

            <div className={styles.itemFilter}>
                <h2>Filtrar por Categoria</h2>
                <select
                    name="category"
                    onChange={(e) => handleFilterCategory(e)}
                    className={styles.itemSelector}>
                    <option value="">Categoria...</option>
                    <option value="TOY">Juguete</option>
                    <option value="FOOD">Comida</option>
                    <option value="SNACK">Snack</option>
                    <option value="ACCESORIES">Accesorios</option>
                    <option value="HYGIENE">Higiene</option>
                    <option value="HEALTH">Salud</option>
                    <option value="OTHER">Otros</option>
                </select>
            </div>
            <div className={styles.itemFilter}>
                <h2>Filtrar por Tamaño</h2>
                <select
                    name="size"
                    onChange={(e) => handleFilterSize(e)}
                    className={styles.itemSelector}>
                    <option value="">Tamaño...</option>
                    <option value="UNIQUE">Unico</option>
                    <option value="BIG">Grande</option>
                    <option value="MEDIUM">Mediano</option>
                    <option value="SMALL">Pequeño</option>
                </select>
            </div>

            <div className={styles.itemFilter}>
                <h2>Filtrar por Precio</h2>
                <select
                    name="age"
                    onChange={(e) => handleFilterPrice(e)}
                    className={styles.itemSelector}>
                    <option value="" >Precio hasta...</option>
                    <option value={1000}>1000</option>
                    <option value={2000}>2000</option>
                    <option value={5000}>5000</option>
                    <option value={10000}>10000</option>
                </select>
            </div>
            <div className={styles.itemFilter}>
                <h2>Ordenar por Precio</h2>
                <select
                    name="sort"
                    onChange={(e) => handlerSort(e)}
                    className={styles.itemSelector}>
                    <option value="" >Ordenar de ...</option>
                    <option value="MAX" >Mayor a Menor</option>
                    <option value="MIN" >Menor a Mayor</option>
                </select>
            </div>
            <div  >
                <button className={styles.buttons} onClick={handleFilter}>Filtrar</button>
                <button className={styles.buttons} onClick={handleReset}>Reset</button>
            </div>
        </div>
    )
}
export default Filters
