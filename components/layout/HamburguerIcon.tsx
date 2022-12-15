import React, { useState } from 'react'

const HamburguerIcon = () => {
    const [isOpen, setIsOpen] = useState(false)
    const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300`
    const openNav = () => {
        const leftNav = document.getElementById('leftNav')

        if (!leftNav) return
        if (leftNav.style.left === '0px') {
            leftNav.style.left = '-15rem'
            setIsOpen(false)
            return
        }

        leftNav.style.left = '0'
        setIsOpen(true)
    }

    return (
        <button
            className="flex flex-col h-9 w-9 justify-center items-center group"
            onClick={openNav}>
            <div
                className={`${genericHamburgerLine} ${
                    isOpen
                        ? 'rotate-45 translate-y-3 opacity-50 group-hover:opacity-100'
                        : 'opacity-50 group-hover:opacity-100'
                }`}
            />
            <div
                className={`${genericHamburgerLine} ${
                    isOpen ? 'opacity-0' : 'opacity-50 group-hover:opacity-100'
                }`}
            />
            <div
                className={`${genericHamburgerLine} ${
                    isOpen
                        ? '-rotate-45 -translate-y-3 opacity-50 group-hover:opacity-100'
                        : 'opacity-50 group-hover:opacity-100'
                }`}
            />
        </button>
    )
}

export default HamburguerIcon
