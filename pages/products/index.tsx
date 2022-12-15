import { NextPage } from "next";
import { useState, useEffect } from "react";
import React from "react";
import { Product } from "app/types";
import { MainLayout, Filtersproducts } from "components";
import ProductCard from "components/products/ProductCard";
import { useQuery } from "react-query";
import { getProducts } from "utils/dbFetching";
import { redirectionAlert } from "utils/alerts";
import AlternativePagination from "components/layout/AlternativePagination";
import useLocalStorage from "use-local-storage";
import NotFound from "public/mong03b.gif";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";
import Loading from 'public/loading.gif'

export type Props = {
  [key: string]: any;
};

const Products: NextPage = () => {
  //pagination anda data for filter
  const {
    data: products,
    error,
    isLoading,
    isSuccess,
  } = useQuery(["products"], getProducts);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(6);
  const [data, setData] = useState<Product[]>();

  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 768px)" });
  const isLaptop = useMediaQuery({ query: "(max-width: 1024px)" });
  const isMediumScreen = useMediaQuery({ query: "(max-width: 1280px)" });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1536px)" });

  //get user data from auth0
  const { user, error: errorU, isLoading: isLoadingU } = useUser();
  const router = useRouter();

  //Recover cartproducts when user comeback from the cart to products again
  const [cartFromLocalStorage, setCartFromLocalStorage] = useLocalStorage<
    Product[]
  >("cartProducts", []);
  const [cartItems, setCartItems] = useState(cartFromLocalStorage as Product[]);

  //pagination
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  let currentItems: Product[] = [];
  if (data) currentItems = [...data.slice(firstItemIndex, lastItemIndex)];

  const handleAddToCart = (clickedItem: Product) => {
    if (!user) {
      // router.push('/api/auth/login')
      redirectionAlert({
        icon: "info",
        title: "<strong>Inicio de sesion requerido</strong>",
        html:
          "Para agregar productos y poder disfrutar de todas nuestras funcionalidades" +
          " te invitamos a iniciar sesion o crear una cuenta.",
        confirmButtonText: "Iniciar sesion",
        confirmButtonAriaLabel: "Thumbs up, great!",
        link: "/api/auth/login",
      });
    } else {
      const button = document.getElementById(
        `buttonCart${clickedItem.id}`
      ) as HTMLButtonElement;
      button.classList.add("clicked");

      if (!clickedItem.amount) clickedItem.amount = 0;
      setCartItems((prev) => {
        // is the item already added in the cart
        const isItemInCart = prev.find((item) => item.id === clickedItem.id);

        if (isItemInCart) {
          return prev.map((item) =>
            item.id === clickedItem.id
              ? { ...item, amount: item.amount! + 1 }
              : item
          );
        }

        // first time the item is added
        return [...prev, { ...clickedItem, amount: 1 }];
      });

      setTimeout(() => {
        button.classList.remove("clicked");
      }, 2300);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setData(products);
      if (isMobile) {
        setItemsPerPage(4);
      } else if (isTablet) {
        setItemsPerPage(4);
      } else if (isLaptop) {
        setItemsPerPage(6);
      } else if (isMediumScreen) {
        setItemsPerPage(9);
      } else if (isBigScreen) {
        setItemsPerPage(10);
      }
    }
  }, [
    isSuccess,
    products,
    isBigScreen,
    isMobile,
    isTablet,
    isLaptop,
    isMediumScreen,
  ]);

  useEffect(() => {
    setData(products);
  }, [products]);

  useEffect(() => {
    // storing input cartItems
    // localStorage.setItem("cartProducts", JSON.stringify(cartItems));
    setCartFromLocalStorage(cartItems);
  }, [cartItems]);

  return (
    <MainLayout title="Pawsitive - Productos">
      <div className="px-4 py-2 w-full flex justify-between items-center bg-transparent">
        <h1 className="text-3xl font-Rubik text-pwgreen-800 font-bold py-6 lg:py-8 lg:text-5xl">
          Productos
        </h1>
      </div>
      <div className="flex">
        <div className="flex grow flex-col justify-center items-center bg-transparent">
          {!isLoading && currentItems ? (
            <AlternativePagination
              totalItems={(data ? data : products)?.length}
              itemsPerPage={itemsPerPage}
              setCurrentPage={setCurrentPage}
            />
          ) : null}
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mb-8">
            {isLoading ? (
              <div className="flex justify-center items-center my-16">
                <Image src={Loading} alt="not found" width={100} height={100} />
              </div>
            ) : currentItems.length === 0 ? (
              <div className="flex flex-col justify-center items-center">
                <h1 className="font-bold text-3xl">No encontramos items</h1>
                <Image
                  src={NotFound}
                  alt="not found"
                  width={500}
                  height={400}
                />
              </div>
            ) : (
              currentItems.map((product: any) => {
                return (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    product={product}
                    handleAddToCart={handleAddToCart}
                  />
                );
              })
            )}
          </div>
        </div>
        <div className="w-auto fixed flex justify-center items-center left-0 inset-y-0 lg:sticky lg:right-5 bg-pwgreen-100">
          <Filtersproducts setData={setData} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Products;
