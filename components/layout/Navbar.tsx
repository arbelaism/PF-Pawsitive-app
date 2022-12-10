import { NextComponentType } from "next";
import Link from "next/link";
import { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";
import { Product } from "../../app/types";
import { useUser } from "@auth0/nextjs-auth0/client";
import { FaShoppingCart } from "react-icons/fa";

const Navbar: NextComponentType = () => {
  const [cartProducts, setCartProducts] = useState([0]);
    const [products, setProducts] = useLocalStorage<Product[]>("cartProducts", [])
    const [color1, setColor1] = useState("pwpurple-700")
    const [color2, setColor2] = useState("white")
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

  const paw:string = `font-thin text-${color1} hover:text-pwpurple-300  ease-in duration-400 delay-200`
  const sitive:string = `font-black text-${color2} hover:text-pwpurple-300 ease-in duration-400 delay-200`

  useEffect(() => {
    var timerID = setInterval(() => changeColor(), 2000);
    return () => clearInterval(timerID);
  });
  function changeColor() {
    color1 === "pwpurple-700" ? setColor1("white") : setColor1("pwpurple-700")
    color2 === "white" ? setColor2("pwpurple-500") : setColor2("white")
  }




  const onClick = ()=>{
    const menu = document.querySelector('#menu')
    const menuCart = document.querySelector('#menu-cart')
    menu?.classList.toggle('hidden')
    menuCart?.classList.toggle('hidden')
  }
  return (
    <nav className="flex items-center justify-between flex-wrap bg-pwgreen-500 text-pwpurple-50 py-3 px-6">
        <div className="flex items-center flex-shrink-0 text-2xl ease-in">
            <Link href={"/"}>
              <a >
                <span className={paw}>Paw</span>
                <span className={sitive}>sitive</span>
              </a>
            </Link>
          </div>
        <div className="block lg:hidden ">
            <button onClick={onClick} className="flex items-center px-3 py-2 border rounded text-pwgreen-50 border-pwpurple-50 hover:text-pwpurple-200 hover:border-pwpurple-200
            hover:border-2
        
            hover:animate-pulse
            ">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
        </div>
        <div id='menu' className="w-full block  justify-between font-medium lg:flex lg:items-center lg:w-auto">
            <div>           
                <Link href={'/'}>
                    <a className="block mt-4 lg:inline-block lg:mt-0 hover:text-pwpurple-600
                    hover:font-bold mr-4">Home</a>
                </Link>
        
                <Link href={'/adoptions'}>
                    <a className="block mt-4 mx-2 lg:inline-block lg:mt-0 hover:text-pwpurple-600
                    hover:font-bold mr-4">Adopciones</a>
                </Link>
                <Link href={'/products'}>
                    <a className="block mt-4 lg:inline-block lg:mt-0 hover:text-pwpurple-600
                    hover:font-bold mr-4">Productos</a>
                </Link>
            
                <Link href={'/contact'}>
                    <a className="block mt-4 lg:inline-block lg:mt-0 hover:text-pwpurple-600
                    hover:font-bold mr-4">Contacto</a>
                </Link>
                <Link href={'/about'}>
                    <a className="block mt-4 lg:inline-block lg:mt-0 hover:text-pwpurple-600
                    hover:font-bold mr-4">Sobre nosotros</a>
                </Link>
            </div>
            </div>
            <div className='block mr-4 mt-4 lg:flex lg:flex-row lg:mt-1' id="menu-cart">
                <div className="my-2 mr-4 lg:my-0">
                    <Link href={'/shoppingCart'}>
                        <a className="hover:text-pwpurple-600
                    hover:font-bold flex justify-between items-baseline"><FaShoppingCart/><div className="mx-2">{cartProducts[0]}</div></a>                     
                    </Link>
                </div>
                {!user ? (
                    <div>
                        <Link href="/register">
                            <a className=' hover:text-pwpurple-600
                    hover:font-bold'>Registrate</a>
                        </Link>
                        <span className="mx-2">|</span>
                        <Link href="/api/auth/login">
                            <a className=' hover:text-pwpurple-600
                    hover:font-bold'>Iniciar sesión</a>
                        </Link>
                    </div>
                ) : (
                    <>
                        <span>Hola {user.name} &nbsp;&nbsp;| </span>
                        <Link href="/api/auth/logout">
                            <a className='hover:text-pwpurple-600
                    hover:font-bold'>Cerrar sesion</a>
                        </Link>
                    </>
                )}
            </div>
            
        
    </nav>
  )
};
export default Navbar;
