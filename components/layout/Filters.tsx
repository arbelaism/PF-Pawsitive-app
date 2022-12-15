import React, { useState } from 'react'
import { IAdoption } from 'app/types'
import { getMinAdoptions } from 'utils/dbFetching'
import { useQuery } from 'react-query'
import { FaFilter } from 'react-icons/fa'

type Props = {
    data: IAdoption[] | undefined
    setData: (data: IAdoption[]) => void
    setCurrentPage: (n: number) => void
}
interface Values {
    breed: string
    size: string
    age: string
}

const Filters = ({ setData, data, setCurrentPage }: Props) => {
    const [orderAge, setOrderAge] = useState('min')
    let values: Values = {
        breed: '',
        size: '',
        age: ''
    }
    const [options, setOptions] = useState({ ...values })
    const {
        data: adoptions,
        error,
        isLoading,
        isSuccess
    } = useQuery(['adoptions'], getMinAdoptions)
    
    function handleOptions(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault()
        let { name, value } = e.target
        if (!value) return //???

        let order: boolean = false
        if (name === 'age' && value !== '') {
            order = true
            values.age = value
            values.size = options.size
            values.breed = options.breed
        } else if (name === 'size') {
            values.size = value
            values.age = options.age
            values.breed = options.breed
        } else if (name === 'breed') {
            values.breed = value
            values.size = options.size
            values.age = options.age
        }
        setOptions({ ...options, [name]: value })
        orderData(values, adoptions, order)
    }

    function orderData(values: Values, data: IAdoption[], order: boolean) {
        const { breed, size, age } = values
        let filteredData: IAdoption[] = order ? adoptions : []
        if (order && age === orderAge) {
            filteredData = filteredData
        } else if (age === 'min') {
            filteredData = filteredData.reverse()
            setOrderAge('min')
        } else if (age === 'max') {
            filteredData = filteredData.reverse()
            setOrderAge('max')
        }
        if (breed !== '') {
            filteredData = data?.filter((d: IAdoption) => d.breed === breed)
            if (size !== '' && filteredData.length > 0) {
                filteredData = filteredData?.filter(
                    (d: IAdoption) => d.size === size
                )
            }
        } else if (size !== '') {
            filteredData = data?.filter((d: IAdoption) => d.size === size)
            if (breed !== '' && filteredData.length > 0) {
                filteredData = filteredData?.filter(
                    (d: IAdoption) => d.breed === breed
                )
            }
        }
        setCurrentPage(1)
        setData([...filteredData])
    }

    function handleReset() {
        setOptions({ breed: '', size: '', age: '' })
        const select = document.querySelectorAll('select')
        select.forEach(s => (s.value = ''))
        setData([...adoptions])
        return
    }

    const onClick = () => {
        const filters = document.querySelector('#filters')
        filters?.classList.toggle('hidden')
    }

    return (
        <div className="w-auto lg:top-10">
            <div className="fixed right-2 top-60 lg:hidden">
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
                    <div className="flex flex-col gap-1 text-pwgreen-700 text-sm rounded-lg w-full">
                        <h2 className="font-Rubik font-semibold text-sm text-pwgreen-700">
                            Filtrar por Categoría
                        </h2>
                        <select
                            name="breed"
                            onChange={e => handleOptions(e)}
                            className="input text-pwgreen-700 w-full">
                            {options.breed === '' && (
                                <option value="">Categoría...</option>
                            )}
                            <option className="text-pwgreen-700" value="gato">
                                Gatos
                            </option>
                            <option value="perro">Perros</option>
                            <option value="ave">Aves</option>
                            <option value="tortuga">Tortugas</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1 text-pwgreen-700 text-sm rounded-lg w-full">
                        <h2 className="font-Rubik font-semibold text-sm text-pwgreen-700">
                            Filtrar por Tamaño
                        </h2>
                        <select
                            name="size"
                            onChange={e => handleOptions(e)}
                            className="input text-pwgreen-700 w-full ">
                            {options.size === '' && (
                                <option value="">Tamaño...</option>
                            )}
                            <option value="BIG">Grande</option>
                            <option value="MEDIUM">Mediano</option>
                            <option value="SMALL">Pequeño</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1 text-pwgreen-600 text-sm rounded-lg w-full">
                        <h2 className="font-Rubik font-semibold text-sm text-pwgreen-700">
                            Filtrar por Edad
                        </h2>
                        <select
                            name="age"
                            onChange={e => handleOptions(e)}
                            className="input text-pwgreen-600 w-full">
                            {options.age === '' && (
                                <option value="">Edad...</option>
                            )}
                            <option value="min">Menor a mayor</option>
                            <option value="max">Mayor a menor</option>
                        </select>
                    </div>
                    <button
                        className="dashboardButton bg-pwgreen-600 uppercase font-Rubik text-base text-pwgreen-50"
                        onClick={handleReset}>
                        Reiniciar
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Filters
