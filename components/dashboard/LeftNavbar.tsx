import React from 'react'
import Link from 'next/link'

const LeftNavbar = () => {
  return (
    <div>
       <div>LOGO</div>
       <div>
        <ul>
            <li>
                <Link href={"#"}>Resumen</Link>
            </li>
            <li>
                <Link href={"#"}>Usuarios</Link>
            </li>
            <li>
                <Link href={"#"}>Adopciones</Link>
            </li>
            <li>
                <Link href={"#"}>Productos</Link>
            </li>
            <li>
                <Link href={"#"}>Transacciones</Link>
            </li>
            <li>
                <Link href={"#"}>Balance</Link>
            </li>
            <li>
                <Link href={"#"}>Postulaciones</Link>
            </li>
            <li>
                <Link href={"#"}>Actividad</Link>
            </li>
            <li>
                <Link href={"#"}>Opciones</Link>
            </li>
            <li>
                <Link href={"#"}>Logout</Link>
            </li>
        </ul>
       </div>

    </div>
  )
}

export default LeftNavbar