import { NextComponentType } from "next";
import Link from "next/link";
import styles from "styles/Navbar.module.css";
import { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";
import { Product } from "../../app/types";
import { useUser } from "@auth0/nextjs-auth0/client";

const Navbar: NextComponentType = () => {
  const [cartProducts, setCartProducts] = useState([0]);
    const [products, setProducts] = useLocalStorage<Product[]>("cartProducts", [])

    const {user, error, isLoading} = useUser()

  useEffect(() => {
    setCartProducts(() => {
      let total: number[] = [0];
      if (products.length) {
        products.map((product: Product) => (total[0] += product.amount!));
      }
      return total;
    });
  }, [products]);
  return (
      <>
          <nav>
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
                      <div>
                          <Link href={'/shoppingCart'}>
                             
                                <a>🛒 {cartProducts[0]}</a>
                           
                          </Link>
                      </div>
                  </div>
                  <div className={styles.signUpContainer}>
                      {!user ? (
                          <div className={styles.signUpLink}>
                              <Link href="/api/auth/login">
                                  <a>Login</a>
                              </Link>
                          </div>
                      ) : (
                          <>
                              <span>Hola {user.name} | </span>
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
