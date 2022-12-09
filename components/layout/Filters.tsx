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
    <div className="w-64 h-auto p-5 rounded-lg bg-pwgreen-600 mt-16 drop-shadow-lg shadow-lg shadow-pwpurple-200">
      <div className="flex flex-col items-center w-[100%]  h-[25%] bg-pwgreen-600 ">
        <div className="text-center p-2 mt-12 bg-pwpurple-500 border-2 border-pwpurple-600 text-white text-sm rounded-lg focus:ring-pwpurple-700 focus:border-pwpurple-700 block w-full p-3.5 mt-8 mb-4 pl-4 shadow-md shadow-pwpurple-700">
          <h2 className="text-white mb-4 mr-4">Filtrar por Categoría</h2>
          <select
            name="breed"
            onChange={(e) => handleOptions(e)}
            className="bg-pwpurple-500 border-2 border-pwpurple-600 text-white text-sm rounded-lg focus:ring-pwpurple-700 focus:border-pwpurple-700 block w-full p-2.5 hover:animate-pulse hover:opacity-65"
          >
            {options.breed === "" && <option value="">Categoría...</option>}
            <option className="" value="gato">
              Gatos
            </option>
            <option value="perro">Perros</option>
            <option value="ave">Aves</option>
            <option value="tortuga">Tortugas</option>
          </select>
        </div>

        <div className="text-center p-2 mt-12 bg-pwpurple-500 border-2 border-pwpurple-600 text-white text-sm rounded-lg focus:ring-pwpurple-700 focus:border-pwpurple-700 block w-full p-3.5 mt-8 mb-4 pl-4 shadow-md shadow-pwpurple-700">
          <h2 className="text-white mb-4 mr-4">Filtrar por Tamaño</h2>
          <select
            name="size"
            onChange={(e) => handleOptions(e)}
            className="bg-pwpurple-500 border-2 border-pwpurple-600 text-white text-sm rounded-lg focus:ring-pwpurple-700 focus:border-pwpurple-700 block w-full p-2.5 hover:animate-pulse hover:opacity-65"
          >
            {options.size === "" && <option value="">Tamaño...</option>}
            <option value="BIG">Grande</option>
            <option value="MEDIUM">Mediano</option>
            <option value="SMALL">Pequeño</option>
          </select>
        </div>

        <div className="text-center p-2 mt-12 bg-pwpurple-500 border-2 border-pwpurple-600 text-white text-sm rounded-lg focus:ring-pwpurple-700 focus:border-pwpurple-700 block w-full p-3.5 mt-8 mb-4 pl-4 shadow-md shadow-pwpurple-700">
          <h2 className="text-white mb-2">Filtrar por Edad</h2>
          <select
            name="age"
            onChange={(e) => handleOptions(e)}
            className="bg-pwpurple-500 border-2 border-pwpurple-600 text-white text-sm rounded-lg focus:ring-pwpurple-700 focus:border-pwpurple-700 block w-full p-2.5 hover:animate-pulse hover:opacity-65"
          >
            {options.age === "" && <option value="">Edad...</option>}
            <option value="min">Menor a mayor</option>
            <option value="max">Mayor a menor</option>
          </select>
        </div>
        <div className="flex flex-col items-center w-[50%]  h-[25%] bg-pwgreen-600 mt-24 rounded-xl">
          <button
            className="bg-pwpurple-500 border-2 border-pwpurple-600 text-white text-sm rounded-xl focus:ring-pwpurple-700 focus:border-pwpurple-700 block w-[100%] p-2.5 mb-8 shadow-md shadow-pwpurple-700 delay-200  hover:animate-bounce   hover:opacity-65"
            onClick={handleReset}
          >
            Reiniciar
          </button>
        </div>
      </div>
    </div>
  );
};
export default Filters;
