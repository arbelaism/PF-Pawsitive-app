import { NextComponentType } from "next";
import Link from "next/link";
import { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";
import { Product } from "../../app/types";
import { useUser } from "@auth0/nextjs-auth0/client";

const Navbar: NextComponentType = () => {
  const [cartProducts, setCartProducts] = useState([0]);
    const [products, setProducts] = useLocalStorage<Product[]>("cartProducts", [])

    const { user, error, isLoading } = useUser()

  useEffect(() => {
    setCartProducts(() => {
      let total: number[] = [0];
      if (products.length) {
        products.map((product: Product) => (total[0] += product.amount!));
      }
      return total;
    });
  }, [products]);

  const onClick = ()=>{
    const menu = document.querySelector('#menu')
    menu?.classList.toggle('hidden')
  }
  return (
    <nav className="flex items-center justify-between flex-wrap bg-pwgreen-500 text-pwpurple-50 py-3 px-6">
        <div className='flex items-center flex-shrink-0 text-2xl'>
            <Link href={'/'}>
                <a>
                    <span className='font-thin'>Paw</span>
                    <span className='font-black'>sitive</span>
                </a>
            </Link>
        </div>
        <div className="block lg:hidden xl:hidden 2xl:hidden ">
            <button onClick={onClick} className="flex items-center px-3 py-2 border rounded text-pwgreen-50 border-pwpurple-50 hover:text-pwpurple-50 hover:border-pwgreen-400">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
        </div>
        <div id='menu' className="w-full block  justify-between font-medium lg:flex xl:flex 2xl:flex lg:items-center xl:items-center 2xl:items-center lg:w-auto xl:w-auto 2xl:w-auto">
            <div className="lg: xl: 2xl:">           
                <Link href={'/'}>
                    <a className="block mt-4 lg:inline-block lg:mt-0 xl:inline-block xl:mt-0 2xl:inline-block 2xl:mt-0 hover:text-pwgreen-100 mr-4">Home</a>
                </Link>
        
                <Link href={'/adoptions'}>
                    <a className="block mt-4 lg:inline-block lg:mt-0 xl:inline-block xl:mt-0 2xl:inline-block 2xl:mt-0 hover:text-pwgreen-100 mr-4">Adopciones</a>
                </Link>
                <Link href={'/products'}>
                    <a className="block mt-4 lg:inline-block lg:mt-0 xl:inline-block xl:mt-0 2xl:inline-block 2xl:mt-0 hover:text-pwgreen-100 mr-4">Productos</a>
                </Link>
            
                <Link href={'/contact'}>
                    <a className="block mt-4 lg:inline-block lg:mt-0 xl:inline-block xl:mt-0 2xl:inline-block 2xl:mt-0 hover:text-pwgreen-100 mr-4">Contacto</a>
                </Link>
                <Link href={'/about'}>
                    <a className="block mt-4 lg:inline-block lg:mt-0 xl:inline-block xl:mt-0 2xl:inline-block 2xl:mt-0 hover:text-pwgreen-100 mr-4">Sobre nosotros</a>
                </Link>
            </div>
            <div className='block mr-4 mt-4 lg:flex lg:flex-row xl:flex xl:flex-row 2xl:flex 2xl:flex-row lg:mt-1 xl:mt-1 2xl:mt-1 xl:ml-36 2xl:ml-44'>
                <div className="my-2 mr-4 lg:my-0 xl:my-0 2xl:my-0">
                    <Link href={'/shoppingCart'}>
                        <a className="hover:text-pwgreen-100">🛒 {cartProducts[0]}</a>
                    </Link>
                </div>
                {!user ? (
                    <div>
                        <Link href="/register">
                            <a className=' hover:text-pwgreen-100'>Registrate</a>
                        </Link>
                        <span>|</span>
                        <Link href="/api/auth/login">
                            <a className=' hover:text-pwgreen-100'>Iniciar sesión</a>
                        </Link>
                    </div>
                ) : (
                    <>
                        <span>Hola {user.name} &nbsp;&nbsp;| </span>
                        <Link href="/api/auth/logout">
                            <a className='hover:text-pwgreen-100'>Cerrar sesion</a>
                        </Link>
                    </>
                )}
            </div>
            
        </div>
    </nav>
  )
};
export default Navbar;
