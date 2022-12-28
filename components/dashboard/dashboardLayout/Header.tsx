import React from 'react'
import { HamburguerIcon } from 'components'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'

type Props = {
    title: string
}

const Header = ({ title }: Props) => {
    return (
        <div className="w-full z-20 bg-pwgreen-100 p-4 flex items-center justify-between sticky top-0 border border-b-pwgreen-800 border-opacity-30 shadow-md lg:static lg:border-none">
            <div className="flex gap-2 items-center">
                <div className="mx-3 lg:hidden">
                    <HamburguerIcon />
                </div>
                <Link href={'/'}>
                    <a className="text-xl border rounded-full border-pwgreen-700 p-2 text-pwgreen-700 hover:bg-pwgreen-700 hover:text-pwgreen-100 transition-colors">
                        <FaArrowLeft />
                    </a>
                </Link>
                <h1 className="font-Rubik text-xl text-pwgreen-900 font-semibold p-2 md:text-2xl lg:text-4xl">
                    {title}
                </h1>
            </div>
        </div>
    )
}

export default Header
