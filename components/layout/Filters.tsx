import styles from "styles/Filters.module.css";
import React, { useEffect, useState } from "react";
import { IAdoption } from "app/types";
import { getAdoptions, getMinAdoptions } from "utils/dbFetching";
import { useQuery } from "react-query";
type Props = {
  data: IAdoption[] | undefined;
  setData: (data: IAdoption[]) => void;
  setCurrentPage: (n: number) => void;
};
interface Values {
  breed: string;
  size: string;
  age: string;
}

const Filters = ({ setData, data, setCurrentPage }: Props) => {
  const [orderAge, setOrderAge] = useState("min");
  let values: Values = {
    breed: "",
    size: "",
    age: "",
  };
  const [options, setOptions] = useState({ ...values });
  const {
    data: adoptions,
    error,
    isLoading,
    isSuccess,
  } = useQuery(["adoptions"], getMinAdoptions);
  function handleOptions(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    let { name, value } = e.target;
    if (!value) return; //???

    let order: boolean = false;
    if (name === "age" && value !== "") {
      order = true;
      values.age = value;
      values.size = options.size;
      values.breed = options.breed;
    } else if (name === "size") {
      values.size = value;
      values.age = options.age;
      values.breed = options.breed;
    } else if (name === "breed") {
      values.breed = value;
      values.size = options.size;
      values.age = options.age;
    }
    setOptions({ ...options, [name]: value });
    orderData(values, adoptions, order);
  }

  function orderData(values: Values, data: IAdoption[], order: boolean) {
    const { breed, size, age } = values;
    let filteredData: IAdoption[] = order ? adoptions : [];
    if (order && age === orderAge) {
      filteredData = filteredData;
    } else if (age === "min") {
      filteredData = filteredData.reverse();
      setOrderAge("min");
    } else if (age === "max") {
      filteredData = filteredData.reverse();
      setOrderAge("max");
    }
    if (breed !== "") {
      filteredData = data?.filter((d: IAdoption) => d.breed === breed);
      if (size !== "" && filteredData.length > 0) {
        filteredData = filteredData?.filter((d: IAdoption) => d.size === size);
      }
    } else if (size !== "") {
      filteredData = data?.filter((d: IAdoption) => d.size === size);
      if (breed !== "" && filteredData.length > 0) {
        filteredData = filteredData?.filter(
          (d: IAdoption) => d.breed === breed
        );
      }
    }
    setCurrentPage(1);
    setData([...filteredData]);
  }

  function handleReset() {
    setOptions({ breed: "", size: "", age: "" });
    const select = document.querySelectorAll("select");
    select.forEach((s) => (s.value = ""));
    setData([...adoptions]);
    return;
  }
  return (
    <div className={styles.filtersContainer}>
      <div className={styles.itemFilter}>
        <h2>Filtrar por Categoría</h2>
        <select
          name="breed"
          onChange={(e) => handleOptions(e)}
          className={styles.itemSelector}
        >
          {options.breed === "" &&  <option value="">Categoría...</option>}
          <option value="gato">Gatos</option>
          <option value="perro">Perros</option>
          <option value="ave">Aves</option>
          <option value="tortuga">Tortugas</option>
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
          <option value="BIG">Grande</option>
          <option value="MEDIUM">Mediano</option>
          <option value="SMALL">Pequeño</option>
        </select>
      </div>

      <div className={styles.itemFilter}>
        <h2>Filtrar por Edad</h2>
        <select
          name="age"
          onChange={(e) => handleOptions(e)}
          className={styles.itemSelector}
        >
          {options.age === "" && <option value="">Edad...</option>} 
          <option value="min">Menor a mayor</option>
          <option value="max">Mayor a menor</option>
        </select>
      </div>
      <div>
        <button className={styles.buttons} onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};
export default Filters;
