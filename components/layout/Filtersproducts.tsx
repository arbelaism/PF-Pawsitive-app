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
    <div className={styles.filtersContainer}>
      <form className={styles.itemFilter}>
        <h2>Filtrar por Nombre</h2>
        <input
          type="text"
          id="search"
          placeholder="Buscar por Nombre"
          className={styles.itemSelector}
          value={name}
          onChange={handleInputChange}
        />
      </form>
      <div className={styles.itemFilter}>
        <h2>Ordenar por Precio</h2>
        <button className={styles.buttons} onClick={handleSortMax}>
          ▲
        </button>
        <button className={styles.buttons} onClick={handleSortMin}>
          ▼
        </button>
      </div>

      <div className={styles.itemFilter}>
        <h2>Filtrar por Categoria</h2>
        <select
          name="category"
          onChange={(e) => handleOptions(e)}
          className={styles.itemSelector}
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
      <div className={styles.itemFilter}>
        <h2>Filtrar por Tamaño</h2>
        <select
          name="size"
          onChange={(e) => handleOptions(e)}
          className={styles.itemSelector}
        >
          {options.size === "" && <option value="">Tamaño...</option>}
          <option value="UNIQUE">Unico</option>
          <option value="BIG">Grande</option>
          <option value="MEDIUM">Mediano</option>
          <option value="SMALL">Pequeño</option>
        </select>
      </div>

      <form className={styles.itemFilter}>
        <h2>Filtrar por Precio</h2>
        <input
          name="price"
          type="text"
          id="price"
          placeholder="Precio Maximo"
          className={styles.itemSelector}
          value={options.price ? options.price : ""}
          onChange={(e) => handleOptions(e)}
        />
      </form>

      <div>
        <button className={styles.buttons} onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};
export default Filters;
