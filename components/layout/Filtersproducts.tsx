import styles from 'styles/Filters.module.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Product } from 'app/types'
import { getProducts } from 'utils/dbFetching'
import { useQuery } from 'react-query'
import Adoptions from '../../pages/adoptions/index';
import { privateDecrypt } from 'crypto'

export type Props = {

    setData: (data: Product[]) => void
    setCurrentPage: (n: number) => void
}

interface Values {
    category: string,
    size: string,
    price: number,
}

const Filters = ({ setData, setCurrentPage }: Props) => {

    const {
        data: products,
        error,
        isLoading,
        isSuccess
    } = useQuery(['products'], getProducts)

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
    const [dataLocal, setDataLocal] = useState<Product[]>({ ...products }) // copy products

    //Handle the change in the object options

    let values = { //initial state
        category: "",
        size: "",
        price: 0,
    }
    const [options, setOptions] = useState({ ...values }) //copy values

    function handleOptions(e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        let { name, value } = e.target
        if (!value) return
        setOptions({ ...options, [name]: value })
        return
    }


    //Execute the filters with the option and the localData

    useEffect(() => {
        setDataLocal(products)
    }, [products])


    function orderData(options: Values, dataLocal: Product[]) {
        const { category, size, price } = options
        let filteredData: Product[] = [];

        if (category && size && price) {
            filteredData = (products)?.filter((d: Product) => d.category === category)
                .filter((d: Product) => d.size === size)
                .filter((d: Product) => d.price < price)
            setCurrentPage(1)
            setDataLocal({ ...products })
            return setData(filteredData)
        }
        if (category !== "") {
            filteredData = (products)?.filter((d: Product) => d.category === category)
        }
        if (size !== "") {
            filteredData = (filteredData.length > 0 ? filteredData : dataLocal)?.filter((d: Product) => d.size === size)
        }
        if (price > 0) {
            filteredData = (filteredData.length > 0 ? filteredData : dataLocal)?.filter((d: Product) => d.displayPrice < price)
        }
        setCurrentPage(1)
        setDataLocal({ ...products })
        return setData(filteredData)
    }

    //Dispacth the filter options 

    async function handleFilter() {
        if (options.category || options.price || options.size) {
            orderData(options, dataLocal)
            setDataLocal(products)
            const select = document.querySelectorAll('select')
            select.forEach(s => (s.value = ''))
            setOptions(values)
            return
        }
        return

    }
    //Dispacth the SORT

    async function handleSortMax() {

        // const sorted = (dataLocal ? dataLocal : products).sort((a: Product, b: Product) => {
        //     if (a.displayPrice < b.displayPrice) return -1
        //     if (a.displayPrice > b.displayPrice) return 1
        //     return 0
        // })
        // setData(sorted)
        return
    }
    async function handleSortMin() {
        // const sorted = (dataLocal ? dataLocal : products).sort((a: Product, b: Product) => {
        //     if (a.displayPrice < b.displayPrice) return 1
        //     if (a.displayPrice > b.displayPrice) return -1
        //     return 0
        // })
        // setData(sorted)
        return
    }

    //Reset Filters

    async function handleReset() {
        const select = document.querySelectorAll('select')
        select.forEach(s => (s.value = ''))
        setOptions(values)
        setCurrentPage(1)
        setData(products)
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
                <h2>Ordenar por Precio</h2>
                <button className={styles.buttons} onClick={handleSortMax}>▲</button>
                <button className={styles.buttons} onClick={handleSortMin}>▼</button>
            </div>

            <div className={styles.itemFilter}>
                <h2>Filtrar por Categoria</h2>
                <select
                    name="category"
                    onChange={(e) => handleOptions(e)}
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
                    onChange={(e) => handleOptions(e)}
                    className={styles.itemSelector}>
                    <option value="">Tamaño...</option>
                    <option value="UNIQUE">Unico</option>
                    <option value="BIG">Grande</option>
                    <option value="MEDIUM">Mediano</option>
                    <option value="SMALL">Pequeño</option>
                </select>
            </div>


            <form className={styles.itemFilter}>
                <h2>Filtrar por Precio</h2>
                <input
                    name='price'
                    type="number"
                    id='price'
                    placeholder='Precio Maximo'
                    className={styles.itemSelector}
                    value={options.price ? options.price : ""}
                    onChange={(e) => handleOptions(e)}
                    min="1"
                    max="50000"
                />
            </form>

            <div  >
                <button className={styles.buttons} onClick={handleFilter}>Filtrar</button>
                <button className={styles.buttons} onClick={handleReset}>Reset</button>
            </div>
        </div>
    )
}
export default Filters
