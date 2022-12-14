import React, { useState } from "react";
import { alerts } from "utils/alerts";
import { mediaUploader } from "utils/mediaUploader";
import { useForm, SubmitHandler } from "react-hook-form";
import { getUsers } from "utils/dbFetching";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Modal } from "components";
import { FaFileImage, FaUserPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
export interface AdoptFormInput {
  name: string;
  size: string;
  age: string;
  active?: boolean;
  description?: string;
  monthOrYear?: string;
  breed: string;
  photo?: string;
  userId?: string;
  email: string;
}

const CreateAdoptionForm = (mutationCreateAdoption: any) => {
  const formStructure = {
    name: "",
    size: "",
    age: "",
    active: true,
    description: "",
    monthOrYear: "",
    breed: "",
    photo: "",
    userId: "",
    email: "",
  };

  //Manejar form

  const [form, setForm] = useState<AdoptFormInput>({ ...formStructure });
  const queryClient = useQueryClient();

  const { data: users, isLoading, isSuccess } = useQuery(["users"], getUsers);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdoptFormInput>();

  const [media, setMedia] = useState<File[]>([]);
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const target = e.target as HTMLInputElement;
    const files = [...Object.values(target.files!)];
    setMedia([...files]);
  }

  //Collapse/Expand Form
  function checkEmail(email: string): string {
    let user: string = "";
    users.map((u: any) => {
      if (u.email === email) return (user = u.id);
    });
    return user;
  }
  const [condition, setCondition] = useState(false);

  function toggleCondition(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (condition === false) setForm({ ...formStructure });
    setCondition(!condition);
  }
  const onSubmit: SubmitHandler<AdoptFormInput> = async (data) => {
    console.log(form);
    data.userId = checkEmail(data.email);

    if (data.userId === "") {
      alerts({
        icon: "info",
        title: "<strong>Email</strong>",
        text: "El email no coincide con ningún usuario",
        toast: true,
      });
    }
    data.active = true;
    let urlPhoto: any = [];
    if (media.length > 0) {
      urlPhoto = await mediaUploader(media);
    }
    data = { ...data, photo: urlPhoto ? urlPhoto[0] : null };
    data.age = String(data.age.match("[0-9]+"));
    console.log(data);
    setCondition(!condition);
    mutationCreateAdoption.mutate(data);
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
            Crear adopcion
          </button>
        </div>
      </div>

      {condition ? (
        <Modal>
          <h1 className="text-2xl mb-3 font-semibold lg:text-3xl">
            Crear un nuevo adopcion post
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
                <div className="input-type">
                  <label htmlFor="name" className="label">
                    Nombre:
                  </label>
                  <input
                    type="text"
                    id="name"
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
                  {(errors?.name?.message && (
                    <div
                      className="bg-pwgreen-800 border-l-2 border-r-2  border4 border-white text-white p-2"
                      role="alert"
                    >
                      <p>Es necesario poner un nombre</p>
                    </div>
                  )) ||
                    (errors.name?.type === "maxLength" && (
                      <p className="bg-pwgreen-800 border-l-2 border-r-2  border4 border-white text-white p-2">
                        Nombre no puede contener mas de 20 caracteres
                      </p>
                    ))}
                </div>
                <div className="input-type">
                  <label htmlFor="email" className="label">
                    Email del Adoptante:
                  </label>
                  <input
                    id="email"
                    type="text"
                    placeholder="Email"
                    className="input"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Es necesario poner un email",
                      },
                      maxLength: 60,
                    })}
                  />
                  {errors?.email?.message && (
                    <div
                      className="bg-pwgreen-800 border-l-2 border-r-2  border4 border-white text-white p-2"
                      role="alert"
                    >
                      <p>Es necesario poner un email</p>
                    </div>
                  )}
                </div>
                <div className="input-type">
                  <label htmlFor="number" className="label">
                    Edad:
                  </label>
                  <input
                    id="phone"
                    type="text"
                    {...register("age", {
                      required: true,
                      min: 0,
                      max: 50,
                    })}
                    placeholder="Edad"
                    className="input"
                  />
                  {(errors.age?.type === "required" && (
                    <p className="bg-pwgreen-800 border-l-2 border-r-2  border4 border-white text-white p-2">
                      La edad es obligatoria
                    </p>
                  )) ||
                    (errors.age?.type === "min" && (
                      <p className="bg-pwgreen-800 border-l-2 border-r-2  border4 border-white text-white p-2">
                        La edad debe ser mayor que 0
                      </p>
                    )) ||
                    (errors.age?.type === "max" && (
                      <p className="bg-pwgreen-800 border-l-2 border-r-2  border4 border-white text-white p-2">
                        La edad debe ser menor que 50
                      </p>
                    ))}
                </div>
                <div className="input-type">
                  <label htmlFor="birthday" className="label mt-2">
                    Metrica:
                  </label>
                  <select
                    className="input"
                    id="size"
                    placeholder="Size"
                    {...register("monthOrYear")}
                  >
                    <option value="SMALL">Años</option>
                    <option value="MEDIUM">Meses</option>
                  </select>
                </div>

                {/* COLUMNA 2 */}

                <div className="input-type">
                  <label className="label">Especie:</label>
                  <select
                    className="input"
                    id="breed"
                    placeholder="Especie"
                    {...register("breed", { required: true, maxLength: 20 })}
                  >
                    <option value="perro">Perro</option>
                    <option value="gato">Gato</option>
                    <option value="ave">Ave</option>
                    <option value="tortuga">Tortuga</option>
                    <option value="roedor">Roedor</option>
                    <option value="otros">Otros</option>
                  </select>
                  {(errors.breed?.type === "required" && (
                    <p className="text-red-500 text-xs italic">
                      Especie es obligatoria
                    </p>
                  )) ||
                    (errors.breed?.type === "maxLength" && (
                      <p className="text-red-500 text-xs italic">
                        Especie no puede contener mas de 20 caracteres
                      </p>
                    ))}
                </div>
               
                <div className="input-type">
                  <label htmlFor="birthday" className="label">
                    Tamaño:
                  </label>
                  <select
                    className="input"
                    id="size"
                    placeholder="Size"
                    {...register("size", { required: true })}
                  >
                    <option value="SMALL">Pequeño</option>
                    <option value="MEDIUM">Mediano</option>
                    <option value="BIG">Grande</option>
                  </select>
                </div>
                <div className="input-type">
                  <label className="label">Descripcion:</label>
                  <textarea
                    {...register("description")}
                    className="input h-32 mt-1"
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
                    <FaFileImage /> Seleccionar
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

export default CreateAdoptionForm;
