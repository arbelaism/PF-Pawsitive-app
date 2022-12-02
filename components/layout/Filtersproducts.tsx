import styles from 'styles/Filters.module.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { IAdoption } from 'app/types'
import { getProducts } from 'utils/dbFetching'
import { useQuery } from 'react-query'

export type Props = {
    data: CartItemType[] | undefined
    setData: (data: CartItemType[]) => void
    setCurrentPage: (n: number) => void
}
export type CartItemType = {
    id: string;
    category: string;
    size: string;
    description: string;
    image?: string;
    price: number;
    name: string;
    amount: number;
}
interface Values {
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
        const productFiltered = products?.filter((product: CartItemType) => new RegExp(name, 'ig').test(product.name))
        setData(productFiltered)
        setName("");
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
    function orderData(values: Values, data: CartItemType[]) {
        const { size, price } = values
        let filteredData: CartItemType[] = [];
        if (size && price) {
            filteredData = (data)?.filter((d: CartItemType) => d.size === size).filter((d: CartItemType) => d.price < price)
            setCurrentPage(1)
            return setData(filteredData)
        }
        if (size) {
            filteredData = (data)?.filter((d: CartItemType) => d.size === size)
        }
        if (price) {
            filteredData = (data)?.filter((d: CartItemType) => d.price < price)
        }
        setCurrentPage(1)
        return setData(filteredData)
    }

    async function handleReset() {
        // orderData(values, adoptions)
        const select = document.querySelectorAll('select')

        select.forEach(s => (s.value = ''))
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
    useEffect(() => {

    }, [])
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
            <div  >
                <button className={styles.buttons} onClick={handleFilter}>Filtrar</button>
                <button className={styles.buttons} onClick={handleReset}>Reset</button>
            </div>
        </div>
    )
}
export default Filters
