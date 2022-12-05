import { NextComponentType } from "next";
import Link from "next/link";
import styles from "styles/Navbar.module.css";
import { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";
import { Product } from "@prisma/client";
import { useUser } from "@auth0/nextjs-auth0/client";

const Navbar: NextComponentType = () => {
    const [cartProducts, setCartProducts] = useState([0]);
    const [products, setProducts] = useLocalStorage<Product[]>("cartProducts", [])
    const [numberDisplayed, setNumberDisplayed] = useState(0)
    const { user, error, isLoading } = useUser()

    useEffect(() => {
        // const saved = localStorage.getItem("cartProducts" || "[]");
        // const products = JSON.parse(saved!);
        if (cartProducts.length > 0) {
            let numb = cartProducts.reduce((a, b) => a + b, 0)
            setNumberDisplayed(numb)
        }
        if (products.length > 0)
            setCartProducts(products.map((p: any) => p.amount))
    }, [cartProducts, products]);
    return (
        <>
            <nav className="w-full bg-yellow-300">
                <div className={styles.navContainer}>
                    <div className={styles.logoContainer}>
                        <Link href={'/'}>
                            <a>
                                <span className={styles.paw}>Paw</span>
                                <span className={styles.sitive}>sitive</span>
                            </a>
                        </Link>
                    </div>
                    <div className={styles.linksContainer}>
                        <div>
                            <Link href={'/'}>
                                <a>Home</a>
                            </Link>
                        </div>
                        <div>
                            <Link href={'/adoptions'}>
                                <a>Adopciones</a>
                            </Link>
                        </div>
                        <div>
                            <Link href={'/products'}>
                                <a>Productos</a>
                            </Link>
                        </div>
                        <div>
                            <Link href={'/contact'}>
                                <a>Contacto</a>
                            </Link>
                        </div>
                        <div>
                            <Link href={'/about'}>
                                <a>About</a>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.signUpContainer}>
                        <div>
                            <Link href={'/shoppingCart'}>
                                <a>
                                    🛒 {numberDisplayed}
                                </a>
                            </Link>
                        </div>
                        {!user ? (
                            <div className={styles.signUpLink}>
                                <Link href="/api/auth/login">
                                    <a>Login</a>
                                </Link>
                            </div>
                        ) : (
                            <>
                                <span>Hola {user.name} &nbsp;&nbsp;| </span>
                                <Link href="/api/auth/logout">
                                    <a>Logout</a>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </>
    )
};
export default Navbar;
