import React, { useState } from "react";
import { alerts } from "utils/alerts";
import { mediaUploader } from "utils/mediaUploader";
import { useForm, SubmitHandler } from "react-hook-form";
interface FormStructure {
  name: string;
  price: number;
  displayPrice: number;
  description: string;
  stock: number;
  photo: string;
  category: string;
  brand: string;
  size: string;
  active: boolean;
}

const FormCreateProduct = (mutationCreate: any) => {
  const formEstructure = {
    name: "",
    price: 0,
    displayPrice: 0,
    description: "",
    stock: 0,
    photo: "",
    category: "",
    brand: "",
    size: "",
    active: true,
  };

  //Manejar form

  const [form, setForm] = useState<FormStructure>({ ...formEstructure });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormStructure>();
  const [media, setMedia] = useState<File[]>([]);
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const target = e.target as HTMLInputElement;
    const files = [...Object.values(target.files!)];
    setMedia([...files]);
  }

  //Collapse/Expand Form

  const [condition, setCondition] = useState(false);

  function toggleCondition(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (condition === false) setForm({ ...formEstructure });
    setCondition(!condition);
  }
  const onSubmit: SubmitHandler<FormStructure> = async (data) => {
    let urlPhoto: any = [];
    if (media.length > 0) {
      urlPhoto = await mediaUploader(media);
    }
    data = {...data, active: true}
    data = { ...data, photo: urlPhoto ? urlPhoto[0] : null };    
    data.price = Number(data.price)
    data.stock = Number(data.stock)
    data.displayPrice = Number(data.displayPrice)
    if(data.price > data.displayPrice){
            alerts({
          icon: "info",
          title: "<strong>Email</strong>",
          text: "El costo debe ser menor que el precio de venta",
          toast: true,
        });  
    }else{
      setCondition(!condition);
      mutationCreate.mutate(data);
    }
  };
  return (
    <div className=" w-3/4">
      <div className="container mx-auto flex justify-between py-5 border-b">
        <div className="left flex gap-3">
          <button
            className="text-center inline-flex items-center mr-2 w-full p-2 focus:outline-none border-4 bg-pwgreen-800 border-pwpurple-600 text-white hover:bg-pwpurple-600 focus:ring-4 font-medium rounded-lg"
            onClick={toggleCondition}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              ></path>
            </svg>
            Agregar Producto
          </button>
        </div>
      </div>

      {condition ? (
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="container w-full  flex flex-col gap-x-0.5 md:flex-row">
            {/* COLUMNA 1 */}

            <div className="w-auto md:w-2/4">
              <div className="input-type">
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white"
                >
                  Nombre del producto:
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Nombre"
                  className="border w-full px-5 py-3 focus:outli e-none rounded-md"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Es necesario poner un nombre",
                    },
                    maxLength: 20,
                  })}
                />
                {errors?.name?.message && (
                  <div
                    className="bg-pwgreen-800 border-l-2 border-r-2  border4 border-white text-white p-2"
                    role="alert"
                  >
                    <p>Es necesario poner un nombre</p>
                  </div>
                )}
              </div>
              <div className="input-type">
                <label
                  htmlFor="email"
                  className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white"
                >
                  Costo:
                </label>
                <input
                  id="email"
                  type="number"
                  placeholder="El precio debe ser mayor que 0"
                  className="border w-full px-5 py-3 focus:outline-none rounded-md"
                  {...register("price", {
                    required: true,
                    min: 0,
                  })}
                />
                {(errors.price?.type === "required" && (
                  <p className="bg-pwgreen-800 border-l-2 border-r-2  border4 border-white text-white p-2">
                    Es necesario poner un Costo
                  </p>
                )) ||
                  (errors.price?.type === "min" && (
                    <p className="bg-pwgreen-800 border-l-2 border-r-2  border4 border-white text-white p-2">
                      El Costo debe ser mayor que 0
                    </p>
                  ))}
              </div>
              <div className="input-type">
                <label
                  htmlFor="email"
                  className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white"
                >
                  Precio de venta:
                </label>
                <input
                  id="email"
                  type="number"
                  placeholder="El precio debe ser mayor que 0"
                  className="border w-full px-5 py-3 focus:outline-none rounded-md"
                  {...register("displayPrice", {
                    required: true,
                    min: 0,
                  })}
                />
                {(errors.price?.type === "required" && (
                  <p className="bg-pwgreen-800 border-l-2 border-r-2  border4 border-white text-white p-2">
                    Es necesario poner un precio
                  </p>
                )) ||
                  (errors.price?.type === "min" && (
                    <p className="bg-pwgreen-800 border-l-2 border-r-2  border4 border-white text-white p-2">
                      El precio debe ser mayor que 0
                    </p>
                  ))}
              </div>
              <div className="input-type">
                <label className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white">
                  Descripcion:
                </label>
                <textarea
                  {...register("description")}
                  className="border w-full px-5 py-3 focus:outline-none rounded-md h-32 mt-0"
                  id="description"
                />
              </div>
            </div>
            {/* COLUMNA 2 */}

            <div className="w-auto md:w-2/4">
              <div className="input-type">
                <label
                  htmlFor="number"
                  className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white"
                >
                  Stock:
                </label>
                <input
                  id="stock"
                  type="number"
                  {...register("stock", {
                    required: true,
                    min: -1,
                  })}
                  placeholder="Stock"
                  className="border w-full px-5 py-3 focus:outline-none rounded-md"
                />
                {(errors.stock?.type === "required" && (
                  <p className="bg-pwgreen-800 border-l-2 border-r-2  border4 border-white text-white p-2">
                    Es necesario poner un precio
                  </p>
                )) ||
                  (errors.stock?.type === "min" && (
                    <p className="bg-pwgreen-800 border-l-2 border-r-2  border4 border-white text-white p-2">
                      El stock no puede ser negativo
                    </p>
                  ))}
              </div>
              <div className="input-type">
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white"
                >
                  Marca:
                </label>
                <input
                  id="brand"
                  type="text"
                  {...register("brand", {
                    required: false,
                  })}
                  placeholder="Pawsitive"
                  className="border w-full px-5 py-3 focus:outline-none rounded-md"
                />
              </div>
              <div className="input-type">
                <label
                  htmlFor="active"
                  className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white"
                >
                  Categoría:
                </label>
                <select
                  className="w-full p-2 focus:outline-none border-4 bg-pwgreen-800 border-pwpurple-600 text-white hover:bg-pwpurple-600 focus:ring-4 font-medium rounded-lg"
                  id="firstName"
                  {...register("category", {
                    required: {
                      value: true,
                      message: "Es necesario pone",
                    },
                  })}
                >
                  <option value="TOY">Juguete</option>
                  <option value="FOOD">Comida</option>
                  <option value="SNACK">Snack</option>
                  <option value="ACCESORIES">Accesorios</option>
                  <option value="HYGIENE">Higiene</option>
                  <option value="HEALTH">Health</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div className="input-type">
                <label
                  htmlFor="active"
                  className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white"
                >
                  Tamaño:
                </label>
                <select
                  className="w-full p-2 focus:outline-none border-4 bg-pwgreen-800 border-pwpurple-600 text-white hover:bg-pwpurple-600 focus:ring-4 font-medium rounded-lg"
                  id="firstName"
                  {...register("size", {
                    required: {
                      value: true,
                      message: "Es necesario poner una ciudad",
                    },
                  })}
                >
                  <option value="SMALL">Pequeño</option>
                  <option value="MEDIUM">Mediano</option>
                  <option value="BIG">Grande</option>
                  <option value="UNIQUE">Unico</option>
                </select>
              </div>
            </div>
          </div>
          {/* IMAGEN */}

          <div className="container ">
            <div className="input-type">
              <label
                htmlFor="photo"
                className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white ml-64"
              >
                Foto:
              </label>
              <input
                onChange={(e) => handleChange(e)}
                className="w-2/4 p-2 focus:outline-none border-4 bg-pwgreen-800 border-pwpurple-600 text-white hover:bg-pwpurple-600 focus:ring-4 font-medium rounded-lg ml-64 mb-4"
                id="photo"
                type="file"
                multiple
                accept="image/*"
              />
            </div>
          </div>

          <button
            className="w-1/4 p-2 focus:outline-none border-4 bg-pwgreen-800 border-pwpurple-600 text-white hover:bg-pwpurple-600 focus:ring-4 font-medium rounded-lg mt-2 ml-[40%]"
            type="submit"
          >
            Registrar
          </button>
        </form>
      ) : null}
    </div>
  );
};

export default FormCreateProduct;
