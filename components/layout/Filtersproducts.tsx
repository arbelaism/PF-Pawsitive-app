import styles from "styles/Filters.module.css";
import React, { useEffect, useState } from "react";
import { Product } from "app/types";
import { getProducts } from "utils/dbFetching";
import { useQuery } from "react-query";

export type Props = {
  setData: (data: Product[]) => void;
  setCurrentPage: (n: number) => void;
};

interface Values {
  category: string;
  size: string;
  price: number;
}

const Filters = ({ setData, setCurrentPage }: Props) => {
  const {
    data: products,
    error,
    isLoading,
    isSuccess,
  } = useQuery(["products"], getProducts);
  const [dataLocal, setDataLocal] = useState<Product[]>(products); // copy products
  let values: Values = {
    category: "",
    size: "",
    price: 0,
  };
  const [options, setOptions] = useState<Values>({
    category: "",
    size: "",
    price: 0,
  });
  const [name, setName] = useState("");

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setName(e.target.value);
    filterName();
  }
  function filterName() {
    let filteredData: Product[] = [];
    filteredData =
      name.length > 0
        ? products?.filter((d: Product) =>
            d.name.toLowerCase().includes(name.toLowerCase())
          )
        : products;
    console.log(filteredData);
    orderData(options, filteredData);
  }
  function orderData(options: Values, localData: Product[]) {
    const { category, size, price } = options;
    let filteredData: Product[] = [];
    if (category !== "") {
      console.log("category");
      filteredData = localData?.filter((d: Product) => d.category === category);
      if (size !== "") {
        filteredData = filteredData?.filter((d: Product) => d.size === size);
      }
    } else if (size !== "") {
      filteredData = localData?.filter((d: Product) => d.size === size);
    } else {
      filteredData = localData;
    }
    if (price > 0) {
      filteredData = filteredData?.filter((d: Product) => d.price < price);
    }
    setDataLocal([...filteredData]);
    setCurrentPage(1);
    setData([...filteredData]);
  }

  // FILTERS

  function handleOptions(
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) {
    e.preventDefault();
    let { name, value } = e.target;
    if (!value) return;
    if (name === "price" && value !== "") {
      const numValue = handleValue(value);
      console.log(numValue);
      setOptions({ ...options, [name]: numValue });
    } else {
      setOptions({ ...options, [name]: value });
    }
    return;
  }

  async function handleSortMax() {
    const sorted = (dataLocal ? dataLocal : products).sort(
      (a: Product, b: Product) => {
        if (a.displayPrice < b.displayPrice) return -1;
        if (a.displayPrice > b.displayPrice) return 1;
        return 0;
      }
    );
    setData([...sorted]);
    return;
  }
  async function handleSortMin() {
    const sorted = (dataLocal ? dataLocal : products).sort(
      (a: Product, b: Product) => {
        if (a.displayPrice < b.displayPrice) return 1;
        if (a.displayPrice > b.displayPrice) return -1;
        return 0;
      }
    );
    setData([...sorted]);
    return;
  }
  async function handleReset() {
    const select = document.querySelectorAll("select");
    select.forEach((s) => (s.value = ""));
    setOptions(values);
    setCurrentPage(1);
    setDataLocal([...products]);
    setData([...products]);
    return;
  }

  function handleValue(value: string): number {
    let result = "";
    for (let i = 0; i < value.length; i++) {
      if (!isNaN(value.charAt(i) as any)) {
        result += value.charAt(i);
      }
    }
    parseInt(result);
    return Number(result);
  }
  useEffect(() => {
    if (options.category !== "" || options.size !== "" || options.price !== 0) {
      filterName();
    }
  }, [options]);
  //Execute the filters with the option and the localData

  useEffect(() => {
    setDataLocal(products);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);
  return (
    <div className="w-64 h-auto p-5 rounded-lg bg-pwgreen-600 mt-2 mb-16 drop-shadow-lg shadow-lg shadow-pwpurple-200">
      <form className="bg-pwpurple-500 border-2 border-pwpurple-600 text-white text-sm rounded-xl focus:ring-pwpurple-700 focus:border-pwpurple-700 block w-full p-2.5 mt-4 pl-8 shadow-md shadow-pwpurple-700 ">
        <h2 className="mb-4 pl-2">Filtrar por Nombre</h2>
        <input
          type="text"
          id="search"
          placeholder="Buscar por Nombre"
          className=" border-pwpurple-600 bg-pwpurple-600 p-1 text-sm w-[85%] placeholder:text-white
          hover:border-pwpurple-100 hover:shadow-sm hover:shadow-black rounded-xl block w-full p-2.5 pr-4 focus:border-solid focus:border-pwpurple-700 "
          value={name}
          onChange={handleInputChange}
        />
      </form>
      <div className="bg-pwpurple-500 border-2 border-pwpurple-600 text-white text-sm rounded-lg focus:ring-pwpurple-700 focus:border-pwpurple-700 block w-full p-3.5 mt-4 mb-4 pl-8 shadow-md shadow-pwpurple-700">
        <h2 className="mx-4">Ordenar por Precio</h2>
        <button className="border-2 border-pwpurple-700 px-4 w-[30%] rounded-xl delay-100 hover:border-pwpurple-100 hover:shadow-sm hover:shadow-black mt-4 mx-2 delay-200  hover:animate-pulse  hover:opacity-65" onClick={handleSortMax}>
          ▲
        </button>
        <button className="border-2 border-pwpurple-700 px-4 w-[30%] rounded-xl delay-75 hover:border-pwpurple-100 hover:shadow-sm hover:shadow-black mt-4 mx-4 delay-200  hover:animate-pulse   hover:opacity-65" onClick={handleSortMin}>
          ▼
        </button>
      </div>

      <div className="bg-pwpurple-500 border-2 border-pwpurple-600 text-white text-sm rounded-xl focus:ring-pwpurple-700 focus:border-pwpurple-700 block w-full p-2.5 mt-4 pl-8 shadow-md shadow-pwpurple-700">
        <h2 className="text-white mb-4 pl-2">Filtrar por Categoria</h2>
        <select
          name="category"
          onChange={(e) => handleOptions(e)}
          className="bg-pwpurple-500 p-2.5 w-[75%] text-sm text-white border-2 border-pwpurple-700 rounded-2xl hover:border-pwpurple-100 hover:shadow-sm hover:shadow-black "
        >
          {options.category === "" && <option value="">Categoria...</option>}
          <option value="TOY">Juguete</option>
          <option value="FOOD">Comida</option>
          <option value="SNACK">Snack</option>
          <option value="ACCESORIES">Accesorios</option>
          <option value="HYGIENE">Higiene</option>
          <option value="HEALTH">Salud</option>
          <option value="OTHER">Otros</option>
        </select>
      </div>
      <div className="bg-pwpurple-500 border-2 border-pwpurple-600 text-white text-sm rounded-xl focus:ring-pwpurple-700 focus:border-pwpurple-700 block w-full p-2.5 mt-4 pl-8 shadow-md shadow-pwpurple-700">
        <h2 className="text-white mb-4 pl-2">Filtrar por Tamaño</h2>
        <select
          name="size"
          onChange={(e) => handleOptions(e)}
          className="bg-pwpurple-500 p-2.5 w-[75%] text-sm text-white border-2 border-pwpurple-700 rounded-2xl hover:border-pwpurple-100 hover:shadow-sm hover:shadow-black"
        >
          {options.size === "" && <option value="">Tamaño...</option>}
          <option value="UNIQUE">Unico</option>
          <option value="BIG">Grande</option>
          <option value="MEDIUM">Mediano</option>
          <option value="SMALL">Pequeño</option>
        </select>
      </div>

      <form className="bg-pwpurple-500 border-2 border-pwpurple-600 text-white text-sm rounded-xl focus:ring-pwpurple-700 focus:border-pwpurple-700 block w-full p-2.5 mt-4 pl-8 shadow-md shadow-pwpurple-700">
        <h2 className="text-white mb-4 pl-2">Filtrar por Precio</h2>
        <input
          name="price"
          type="text"
          id="price"
          placeholder="Precio Maximo"
          className="border-pwpurple-600 bg-pwpurple-600 p-1 text-sm w-[85%] placeholder:text-white
          hover:border-pwpurple-100 hover:shadow-sm hover:shadow-black rounded-xl block w-full p-2.5 pr-4 focus:border-solid focus:border-pwpurple-700 "
          value={options.price ? options.price : ""}
          onChange={(e) => handleOptions(e)}
        />
      </form>

      <div>
        <button className="bg-pwpurple-500 border-2 border-pwpurple-600 text-white text-sm rounded-xl focus:ring-pwpurple-700 focus:border-pwpurple-700 block w-[50%] p-2.5 ml-12 mt-8 shadow-md shadow-pwpurple-700 delay-200  hover:animate-bounce   hover:opacity-65" onClick={handleReset}>
          Reiniciar
        </button>
      </div>
    </div>
  );
};
export default Filters;
