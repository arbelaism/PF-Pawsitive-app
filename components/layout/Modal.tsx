import React from 'react'

type Props = {
    children: React.ReactNode
}

const Modal = ({ children }: Props) => {
    return (
        <div className="backdrop-blur-md bg-black bg-opacity-60 absolute top-0 left-0 right-0 z-50 w-full flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
            <div className="relative w-full bg-pwgreen-50 px-10 py-6 max-w-xl max-h-max rounded-xl shadow-xl md:h-auto">
                {children}
            </div>
        </div>
    )
}

export default Modal
