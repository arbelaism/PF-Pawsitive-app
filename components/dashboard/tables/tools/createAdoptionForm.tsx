import React, { useState } from "react";
import { alerts } from "utils/alerts";
import { mediaUploader } from "utils/mediaUploader";
import { useForm, SubmitHandler } from "react-hook-form";
import { getUsers } from "utils/dbFetching";
import { useMutation, useQuery, useQueryClient } from "react-query";

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
            Agregar Adopcion Post
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
                  Nombre:
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Nombre"
                  className="border w-full px-5 py-3 focus:outline-none rounded-md"
                  {...register("name", { required: true, maxLength: 20 })}
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
                <label
                  htmlFor="email"
                  className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white"
                >
                  Email de la persona que da en adopción:
                </label>
                <input
                  id="email"
                  type="text"
                  placeholder="Email"
                  className="border w-full px-5 py-3 focus:outline-none rounded-md"
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
                <label
                  htmlFor="number"
                  className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white"
                >
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
                  className="border w-full px-5 py-3 focus:outline-none rounded-md"
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
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  htmlFor="birthday"
                  className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white mt-2"
                >
                  Metrica:
                </label>
                <select
                  className="w-full p-2 focus:outline-none border-4 bg-pwgreen-800 border-pwpurple-600 text-white hover:bg-pwpurple-600 focus:ring-4 font-medium rounded-lg"
                  id="size"
                  placeholder="Size"
                  {...register("monthOrYear")}
                >
                  <option value="SMALL">Años</option>
                  <option value="MEDIUM">Meses</option>
                </select>
              </div>
            </div>
            {/* COLUMNA 2 */}

            <div className="w-auto md:w-2/4">
              <div className="input-type">
                <label className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white">
                  Especie:
                </label>
                <select
                  className="w-full p-2 focus:outline-none border-4 bg-pwgreen-800 border-pwpurple-600 text-white hover:bg-pwpurple-600 focus:ring-4 font-medium rounded-lg"
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
                <label className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white">
                  Descripcion:
                </label>
                <textarea
                  {...register("description")}
                  className="border w-full px-5 py-3 focus:outline-none rounded-md h-32 mt-1"
                  id="description"
                />
              </div>
              <div className="input-type">
                <label
                  htmlFor="birthday"
                  className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white"
                >
                  Tamaño:
                </label>
                <select
                  className="w-full p-2 focus:outline-none border-4 bg-pwgreen-800 border-pwpurple-600 text-white hover:bg-pwpurple-600 focus:ring-4 font-medium rounded-lg"
                  id="size"
                  placeholder="Size"
                  {...register("size", { required: true })}
                >
                  <option value="SMALL">Pequeño</option>
                  <option value="MEDIUM">Mediano</option>
                  <option value="BIG">Grande</option>
                </select>
              </div>
            </div>
          </div>
          {/* IMAGEN */}

          <div className="container ">
            <div className="input-type">
              <label
                htmlFor="photo"
                className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white"
              >
                Foto:
              </label>
              <input
                onChange={(e) => handleChange(e)}
                className="w-full p-2 focus:outline-none border-4 bg-pwgreen-800 border-pwpurple-600 text-white hover:bg-pwpurple-600 focus:ring-4 font-medium rounded-lg"
                id="photo"
                type="file"
                multiple
                accept="image/*"
              />
            </div>
          </div>

          <button
            className="w-full p-2 focus:outline-none border-4 bg-pwgreen-800 border-pwpurple-600 text-white hover:bg-pwpurple-600 focus:ring-4 font-medium rounded-lg"
            type="submit"
          >
            Registrar
          </button>
        </form>
      ) : null}
    </div>
  );
};

export default CreateAdoptionForm;
