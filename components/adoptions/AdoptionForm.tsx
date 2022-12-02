import { NextComponentType } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "styles/AdoptionForm.module.css";
import React, { useState } from "react";
import { mediaUploader } from "utils/mediaUploader";
import { useMutation, useQueryClient } from "react-query";
import { createPost } from "utils/dbFetching"
import { AdoptFormInput } from "app/types";
import { useRouter } from "next/router"

const AdoptionForm: NextComponentType = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdoptFormInput>();
  const [media, setMedia] = useState<File[]>([]);
  const router = useRouter()
  const queryClient = useQueryClient();
  const {mutate, error, isLoading} = useMutation(createPost, {
    onSuccess: () => {
        queryClient.invalidateQueries("adoptions")
    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const files = [...Object.values(target.files!)];
    setMedia([...files]);
  };

  const onSubmit: SubmitHandler<AdoptFormInput> = async (data) => {
    let urlPhoto: any = await mediaUploader(media);
    // console.log(data)
    // data.age = data.age+" "+data.monthoryear;
    // console.log(data)
    data = {... data, 
        photo : urlPhoto[0],
        active: true,
        age: data.age + " " + data.monthOrYear,
        userId: "1",
    }
    mutate(data)
    router.push("http://localhost:3000/")   

  };

  return (
    <>
      <form
        name="adopt"
        className={styles.formContainer}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="block uppercase tracking-wide text-gray-700 text-s font-bold mb-">
          Detalles de la publicacion de adopcion
        </h2>
        <div className={styles.firstLine}>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-">
              *Nombre:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="name"
              placeholder="Name"
              {...register("name", { required: true, maxLength: 20 })}
            />
            {(errors.name?.type === "required" && (
              <p className="text-red-500 text-xs italic">
                Nombre es obligatorio
              </p>
            )) ||
              (errors.name?.type === "maxLength" && (
                <p className="text-red-500 text-xs italic">
                  Nombre no puede contener mas de 20 caracteres
                </p>
              ))}
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-">
              *Tamaño:
            </label>
            <select
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="size"
              placeholder="Size"
              {...register("size", { required: true })}
            >
              <option value="SMALL">Pequeño</option>
              <option value="MEDIUM">Mediano</option>
              <option value="BIG">Grande</option>
            </select>
            {errors.size?.type === "required" && (
              <p className="text-red-500 text-xs italic">
                Tamaño es obligatorio
              </p>
            )}
          </div>
        </div>
        <div className={styles.firstLine}>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              *Edad:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="age"
              placeholder="Age"
              type="number"
              {...register("age", { required: true, min: 0, max: 50 })}
            />
            {(errors.age?.type === "required" && (
              <p className="text-red-500 text-xs italic">Edad es obligatoria</p>
            )) ||
              (errors.age?.type === "min" && (
                <p className="text-red-500 text-xs italic">
                  Edad debe ser mayor que 0
                </p>
              )) ||
              (errors.age?.type === "max" && (
                <p className="text-red-500 text-xs italic">
                  Edad debe ser menor que 50
                </p>
              ))}
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <br />
            <input
              type="radio"
              id="months"
              value="meses"
              defaultChecked
              {...register("monthOrYear")}
            />{" "}
            Meses <br />
            <input
              type="radio"
              id="years"
              value="años"
              {...register("monthOrYear")}
            />{" "}
            Años <br />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              *Especie:
            </label>
            <select
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="breed"
              placeholder="Breed"
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
        </div>
        <div className="mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Descripcion:
          </label>
          <input
            {...register("description")}
            className="appearance-none block w-200 bg-gray-200 text-gray-700 border border-gray-200 rounded py-20 px-20 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="description"
            type="textarea"            
          />
        </div>
        <div className="mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Foto:
          </label>
          <input
            onChange={(e) => handleChange(e)}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="photo"
            type="file"
            multiple
            accept="image/*"
          />
        </div>
        <p className="text-black-500 text-xs italic">
          Los campos con * son obligatorios
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Register
        </button>
      </form>
    </>
  );
};

export default AdoptionForm;
