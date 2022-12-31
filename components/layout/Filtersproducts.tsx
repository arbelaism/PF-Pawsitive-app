import React, { useEffect, useState } from 'react'
import { Product } from 'app/types'
import { getProducts } from 'utils/dbFetching'
import { useQuery } from 'react-query'
import { FaFilter } from 'react-icons/fa'

export type Props = {
    setData: (data: Product[]) => void
    setCurrentPage: (n: number) => void
}

interface Values {
    category: string
    size: string
    price: number
}

const Filters = ({ setData, setCurrentPage }: Props) => {
    const {
        data: products,
        error,
        isLoading,
        isSuccess
    } = useQuery(['products'], getProducts)
    const [dataLocal, setDataLocal] = useState<Product[]>(products) // copy products
    let values: Values = {
        category: '',
        size: '',
        price: 0
    }
    const [options, setOptions] = useState<Values>({
        category: '',
        size: '',
        price: 0
    })
    const [name, setName] = useState('')

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        setName(e.target.value)
        filterName()
    }
    function filterName() {
        let filteredData: Product[] = []
        filteredData =
            name.length > 0
                ? products?.filter((d: Product) =>
                      d.name.toLowerCase().includes(name.toLowerCase())
                  )
                : products
        orderData(options, filteredData)
    }
    function orderData(options: Values, localData: Product[]) {
        const { category, size, price } = options
        let filteredData: Product[] = []
        if (category !== '') {
            filteredData = localData?.filter(
                (d: Product) => d.category === category
            )
            if (size !== '') {
                filteredData = filteredData?.filter(
                    (d: Product) => d.size === size
                )
            }
        } else if (size !== '') {
            filteredData = localData?.filter((d: Product) => d.size === size)
        } else {
            filteredData = localData
        }
        if (price > 0) {
            filteredData = filteredData?.filter((d: Product) => d.price < price)
        }
        setDataLocal([...filteredData])
        setCurrentPage(1)
        setData([...filteredData])
    }

    // FILTERS

    function handleOptions(
        e:
            | React.ChangeEvent<HTMLSelectElement>
            | React.ChangeEvent<HTMLInputElement>
    ) {
        e.preventDefault()
        let { name, value } = e.target
        if (!value) return
        if (name === 'price' && value !== '') {
            const numValue = handleValue(value)
            setOptions({ ...options, [name]: numValue })
        } else {
            setOptions({ ...options, [name]: value })
        }
        return
    }

    async function handleSortMax() {
        const sorted = (dataLocal ? dataLocal : products).sort(
            (a: Product, b: Product) => {
                if (a.displayPrice < b.displayPrice) return -1
                if (a.displayPrice > b.displayPrice) return 1
                return 0
            }
        )
        setData([...sorted])
        return
    }
    async function handleSortMin() {
        const sorted = (dataLocal ? dataLocal : products).sort(
            (a: Product, b: Product) => {
                if (a.displayPrice < b.displayPrice) return 1
                if (a.displayPrice > b.displayPrice) return -1
                return 0
            }
        )
        setData([...sorted])
        return
    }
    async function handleReset() {
        const select = document.querySelectorAll('select')
        select.forEach(s => (s.value = ''))
        setOptions(values)
        setCurrentPage(1)
        setDataLocal([...products])
        setData([...products])
        return
    }

    function handleValue(value: string): number {
        let result = ''
        for (let i = 0; i < value.length; i++) {
            if (!isNaN(value.charAt(i) as any)) {
                result += value.charAt(i)
            }
        }
        parseInt(result)
        return Number(result)
    }
    useEffect(() => {
        if (
            options.category !== '' ||
            options.size !== '' ||
            options.price !== 0
        ) {
            filterName()
        }
    }, [options])
    //Execute the filters with the option and the localData

    useEffect(() => {
        setDataLocal(products)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products])

    const onClick = () => {
        const filters = document.querySelector('#filters')
        filters?.classList.toggle('hidden')
    }

    return (
        <div className="w-auto lg:top-10">
            <div className="fixed right-2 top-60 lg:hidden ">
                <button
                    onClick={onClick}
                    className="flex items-center px-3 py-2 border rounded text-pwgreen-500 border-pwgreen-500 hover:text-pwpurple-400 hover:border-pwpurple-400 hover:border-2 hover:animate-pulse">
                    <FaFilter />
                </button>
            </div>
            <div
                id="filters"
                className="hidden lg:relative lg:block w-auto lg:w-64 h-full py-8 px-4 shadow-2xl border border-pwgreen-500 rounded-md bg-white font-Rubik">
                <div className="flex flex-col justify-center items-center gap-5 w-full h-max">
                    <div className="flex flex-col gap-1 text-pwgreen-900 text-sm rounded-lg w-full ">
                        <h2 className="font-Rubik font-semibold text-sm text-pwgreen-700">
                            Filtrar por Nombre
                        </h2>
                        <input
                            type="text"
                            id="search"
                            placeholder="Buscar por Nombre"
                            className=" input text-pwgreen-800 w-full placeholder-pwgreen-300"
                            value={name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="flex flex-col justify-center items-start gap-2 w-full h-max">
                        <h2 className="font-Rubik font-semibold text-sm text-pwgreen-700">
                            Filtrar por Precio
                        </h2>
                        <input
                            name="price"
                            type="text"
                            id="price"
                            placeholder="Precio Maximo"
                            className="input text-pwgreen-800 w-full placeholder-pwgreen-300 "
                            value={options.price ? options.price : ''}
                            onChange={e => handleOptions(e)}
                        />
                    </div>

                    <div className="flex flex-col justify-center items-start gap-2 w-full h-max">
                        <h2 className="font-Rubik font-semibold text-sm text-pwgreen-700">
                            Filtrar por Categoria
                        </h2>
                        <select
                            name="category"
                            onChange={e => handleOptions(e)}
                            className="input text-pwgreen-700 w-full ">
                            {options.category === '' && (
                                <option value="">Categoria...</option>
                            )}
                            <option value="TOY">Juguete</option>
                            <option value="FOOD">Comida</option>
                            <option value="SNACK">Snack</option>
                            <option value="ACCESORIES">Accesorios</option>
                            <option value="HYGIENE">Higiene</option>
                            <option value="HEALTH">Salud</option>
                            <option value="OTHER">Otros</option>
                        </select>
                    </div>
                    <div className="flex flex-col justify-center items-start gap-2 w-full h-max">
                        <h2 className="font-Rubik font-semibold text-sm text-pwgreen-700">
                            Filtrar por Tamaño
                        </h2>
                        <select
                            name="size"
                            onChange={e => handleOptions(e)}
                            className="input text-pwgreen-700 w-full">
                            {options.size === '' && (
                                <option value="">Tamaño...</option>
                            )}
                            <option value="UNIQUE">Unico</option>
                            <option value="BIG">Grande</option>
                            <option value="MEDIUM">Mediano</option>
                            <option value="SMALL">Pequeño</option>
                        </select>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-2 w-full h-max">
                        <h2 className="font-Rubik font-semibold text-sm text-pwgreen-700">
                            Ordenar por Precio
                        </h2>
                        <div className="flex flex-row justify-center items-center gap-5 w-full h-max">
                            <button
                                className="dashboardButton py-0"
                                onClick={handleSortMax}>
                                ▲
                            </button>
                            <button
                                className="dashboardButton py-0"
                                onClick={handleSortMin}>
                                ▼
                            </button>
                        </div>
                    </div>
                    <div className="pb-1">
                        <button
                            className="dashboardButton bg-pwgreen-600 uppercase font-Rubik text-base text-pwgreen-50 delay-200  hover:animate-bounce hover:opacity-65"
                            onClick={handleReset}>
                            Reiniciar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Filters
