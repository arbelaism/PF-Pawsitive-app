import React, { useState } from "react";
import { alerts } from "utils/alerts";
import { mediaUploader } from "utils/mediaUploader";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaFileImage, FaUserPlus } from "react-icons/fa";
import { Modal } from "components";
import { IoClose } from "react-icons/io5";
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
    data = { ...data, active: true };
    data = { ...data, photo: urlPhoto ? urlPhoto[0] : null };
    data.price = Number(data.price);
    data.stock = Number(data.stock);
    data.displayPrice = Number(data.displayPrice);
    if (data.price > data.displayPrice) {
      alerts({
        icon: "info",
        title: "<strong>Email</strong>",
        text: "El costo debe ser menor que el precio de venta",
        toast: true,
      });
    } else {
      setCondition(!condition);
      mutationCreate.mutate(data);
    }
  };
  return (
    <div>
      <div>
        <div className="flex gap-3">
          <button
            className="dashboardButton text-base bg-pwgreen-700 text-pwgreen-50 hover:bg-pwgreen-800 transition-colors"
            onClick={toggleCondition}
          >
            <FaUserPlus />
            Crear Producto
          </button>
        </div>
      </div>

      {condition ? (
        <Modal>
          <h1 className="text-2xl mb-3 font-semibold lg:text-3xl">
            Crear nuevo usuario
          </h1>
          <button
            onClick={toggleCondition}
            className="absolute top-5 right-5 text-3xl text-pwgreen-800 cursor-pointer hover:bg-pwgreen-800 hover:text-pwgreen-50 transition-all hover:rotate-90 hover:rounded-full"
          >
            <IoClose />
          </button>
          <div className="overflow-y-visible">
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
                {/* COLUMNA 1 */}

                <div className="input-type">
                  <label htmlFor="firstName" className="label">
                    Nombre del producto:
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="Nombre"
                    className="input"
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
                  <label htmlFor="price" className="label">
                    Costo:
                  </label>
                  <input
                    id="price"
                    type="number"
                    placeholder="El costo debe ser mayor que 0"
                    className="input"
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
                  <label htmlFor="email" className="label">
                    Precio de venta:
                  </label>
                  <input
                    id="email"
                    type="number"
                    placeholder="El precio debe ser mayor a 0"
                    className="input"
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
                
                {/* COLUMNA 2 */}

                <div className="input-type">
                  <label htmlFor="number" className="label">
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
                    className="input"
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
                  <label htmlFor="lastName" className="label">
                    Marca:
                  </label>
                  <input
                    id="brand"
                    type="text"
                    {...register("brand", {
                      required: false,
                    })}
                    placeholder="Pawsitive"
                    className="input"
                  />
                </div>
                <div className="input-type">
                  <label htmlFor="active" className="label">
                    Categoría:
                  </label>
                  <select
                    className="input"
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
                  <label htmlFor="active" className="label">
                    Tamaño:
                  </label>
                  <select
                    className="input"
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
                <div className="input-type">
                  <label className="label">Descripcion:</label>
                  <textarea
                    {...register("description")}
                    className="input h-32 mt-0"
                    id="description"
                  />
                </div>
              </div>
              {/* IMAGEN */}

              <div className="container ">
                <div className="input-type">
                  <label
                    htmlFor="photo"
                    className="w-full bg-white my-3 py-3 flex items-center justify-center gap-3 text-base text-pwgreen-800 rounded-lg cursor-pointer border border-pwgreen-400 shadow-xl hover:bg-pwgreen-700 hover:text-pwgreen-50 transition-all"
                  >
                    <FaFileImage />
                    Foto:
                  </label>
                  <input
                    onChange={(e) => handleChange(e)}
                    className="hidden"
                    id="photo"
                    type="file"
                    multiple
                    accept="image/*"
                  />
                </div>
              </div>

              <button
                className="w-full font-Rubik py-3 bg-pwgreen-700 text-pwgreen-50 hover:bg-pwgreen-800 font-semibold uppercase rounded-lg shadow-2xl"
                type="submit"
              >
                Registrar
              </button>
            </form>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default FormCreateProduct;
