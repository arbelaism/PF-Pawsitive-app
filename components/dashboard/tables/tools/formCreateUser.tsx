import React, { useState } from "react";
import { alerts } from "utils/alerts";
import { mediaUploader } from "utils/mediaUploader";
import { useForm, SubmitHandler } from "react-hook-form";
interface FormEstructure {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  birthday: string;
  address: string;
  phone: string;
  city: string;
  province: string;
  postCode: string;
  photo: string;
  role: string;
  active: boolean;
}

const FormCreateUser = (mutationCreate: any) => {
  const formEstructure = {
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    birthday: "",
    address: "",
    phone: "",
    city: "",
    province: "",
    postCode: "",
    photo: "",
    role: "BASIC",
    active: true,
  };

  //Manejar form

  const [form, setForm] = useState<FormEstructure>({ ...formEstructure });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormEstructure>();
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
  const onSubmit: SubmitHandler<FormEstructure> = async (data) => {
    let urlPhoto: any = [];
    if (media.length > 0) {
      urlPhoto = await mediaUploader(media);
    }
    data = { ...data, photo: urlPhoto ? urlPhoto[0] : null };
    data.phone = String(data.phone.match("[0-9]+"));
    data.active = String(data.active) === "true" ? true : false;
    if (underAgeValidate(data.birthday, 12)) {
      if (validate(data.email)) {
        setCondition(!condition);
        mutationCreate.mutate(data);
      } else {
        alerts({
          icon: "info",
          title: "<strong>Email</strong>",
          text: "Email inválido",
          toast: true,
        });
      }
    } else {
      alerts({
        icon: "info",
        title: "<strong>Email</strong>",
        text: "La Edad mínima es 12 años",
        toast: true,
      });
    }
  };
  function underAgeValidate(birthday: string, minAge: number): boolean {
    let optimizedBirthday = birthday.replace(/-/g, "/");
    var myBirthday = Number(new Date(optimizedBirthday));
    // calculate age comparing current date and birthday
    var myAge = ~~((Date.now() - myBirthday) / 31557600000);
    if (myAge < minAge) {
      return false;
    } else {
      return true;
    }
  }
  const validate = (email: string): boolean => {
    const expression =
      /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return expression.test(String(email).toLowerCase());
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
            Agregar Usuario
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
                  id="firstName"
                  type="text"
                  placeholder="Nombre"
                  className="border w-full px-5 py-3 focus:outli e-none rounded-md"
                  {...register("firstName", {
                    required: {
                      value: true,
                      message: "Es necesario poner un nombre",
                    },
                    maxLength: 20,
                  })}
                />
                {errors?.firstName?.message && (
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
                  Email:
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
                    maxLength: 40,
                  })}
                />
                {errors?.email?.message && (
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
                  htmlFor="birthday"
                  className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white"
                >
                  Fecha de Nacimiento:
                </label>
                <input
                  id="birthday"
                  type="date"
                  {...register("birthday", {
                    required: {
                      value: true,
                      message: "Es necesario poner un email",
                    },
                    maxLength: 20,
                  })}
                  placeholder="Fecha de Nacimiento"
                  className="border w-full px-5 py-3 focus:outline-none rounded-md"
                />
                {errors?.birthday?.message && (
                  <div
                    className="bg-pwgreen-800 border-l-2 border-r-2  border4 border-white text-white p-2"
                    role="alert"
                  >
                    <p>Es necesario poner una fecha de nacimiento</p>
                  </div>
                )}
              </div>
              <div className="input-type">
                <label
                  htmlFor="number"
                  className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white"
                >
                  Telefono:
                </label>
                <input
                  id="phone"
                  type="text"
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "Es necesario poner una teléfono",
                    },
                    maxLength: 20,
                  })}
                  placeholder="Telefono"
                  className="border w-full px-5 py-3 focus:outline-none rounded-md"
                />
                {errors?.phone?.message && (
                  <div
                    className="bg-pwgreen-800 border-l-2 border-r-2  border4 border-white text-white p-2"
                    role="alert"
                  >
                    <p>Es necesario poner un teléfono</p>
                  </div>
                )}
              </div>
              <div className="input-type">
                <label
                  htmlFor="province"
                  className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white"
                >
                  Provincia:
                </label>
                <input
                  id="province"
                  type="text"
                  {...register("province", {
                    required: false,
                    maxLength: 20,
                  })}
                  placeholder="Provincia/Estado"
                  className="border w-full px-5 py-3 focus:outline-none rounded-md"
                />
              </div>
              <div className="input-type">
                <label
                  htmlFor="role"
                  className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white"
                >
                  Rol:
                </label>
                <select
                  id="role"
                  className="bg-gray-50 border border-pwpurple-300 text-gray-900 text-xs rounded-lg focus:ring-pwpurple-500 focus:border-pwpurple-500 p-2.5 w-full"
                  {...register("role", {
                    required: {
                      value: true,
                      message: "Es necesario poner un rol",
                    },
                  })}
                >
                  <option value="BASIC">BASICO</option>
                  <option value="PROFESSIONAL">PROFESIONAL</option>
                  <option value="ADMIN">ADMINISTRADOR</option>
                </select>
              </div>
            </div>
            {/* COLUMNA 2 */}

            <div className="w-auto md:w-2/4">
              <div className="input-type">
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white"
                >
                  Apellido:
                </label>
                <input
                  id="lastName"
                  type="text"
                  {...register("lastName", {
                    required: {
                      value: true,
                      message: "Error",
                    },
                    maxLength: 20,
                  })}
                  placeholder="Apellido"
                  className="border w-full px-5 py-3 focus:outline-none rounded-md"
                />
                {errors?.lastName?.message && (
                  <div
                    className="bg-pwgreen-800 border-l-2 border-r-2  border4 border-white text-white p-2"
                    role="alert"
                  >
                    <p>Es necesario poner un apellido</p>
                  </div>
                )}
              </div>
              <div className="input-type">
                <label
                  htmlFor="gender"
                  className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white"
                >
                  Genero:
                </label>
                <input
                  id="gender"
                  type="text"
                  {...register("gender", {
                    required: {
                      value: true,
                      message: "Error",
                    },
                    maxLength: 20,
                  })}
                  placeholder="Genero"
                  className="border w-full px-5 py-3 focus:outline-none rounded-md"
                />
                {errors?.gender?.message && (
                  <div
                    className="bg-pwgreen-800 border-l-2 border-r-2  border4 border-white text-white p-2"
                    role="alert"
                  >
                    <p>Es necesario poner un género</p>
                  </div>
                )}
              </div>
              <div className="input-type">
                <label
                  htmlFor="address"
                  className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white"
                >
                  Direccion:
                </label>
                <input
                  id="address"
                  type="text"
                  {...register("address", {
                    required: false,
                    maxLength: 60,
                  })}
                  placeholder="Direccion"
                  className="border w-full px-5 py-3 focus:outline-none rounded-md"
                />
              </div>
              <div className="input-type">
                <label
                  htmlFor="city"
                  className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white"
                >
                  Ciudad:
                </label>
                <input
                  id="city"
                  type="text"
                  {...register("city", {
                    required: {
                      value: true,
                      message: "Error",
                    },
                    maxLength: 20,
                  })}
                  placeholder="Ciudad"
                  className="border w-full px-5 py-3 focus:outline-none rounded-md"
                />
                {errors?.city?.message && (
                  <div
                    className="bg-pwgreen-800 border-l-2 border-r-2  border4 border-white text-white p-2"
                    role="alert"
                  >
                    <p>Es necesario poner una ciudad</p>
                  </div>
                )}
              </div>
              <div className="input-type">
                <label
                  htmlFor="postCode"
                  className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white"
                >
                  Código Postal:
                </label>
                <input
                  id="postCode"
                  type="text"
                  {...register("postCode", {
                    required: {
                      value: true,
                      message: "Es necesario poner una ciudad",
                    },
                    maxLength: 20,
                  })}
                  placeholder="Codigo Postal"
                  className="border w-full px-5 py-3 focus:outline-none rounded-md"
                />
                {errors?.postCode?.message && (
                  <div
                    className="bg-pwgreen-800 border-l-2 border-r-2  border4 border-white text-white p-2"
                    role="alert"
                  >
                    <p>Es necesario poner un Codigo Postal</p>
                  </div>
                )}
              </div>
              <div className="input-type ">
                <label
                  htmlFor="active"
                  className="block mb-2 text-medium font-medium py-0 text-pwgreen-900 dark:text-white"
                >
                  Estado:
                </label>
                <select
                  className="bg-gray-50 border border-pwpurple-300 text-gray-900 text-xs rounded-lg focus:ring-pwpurple-500 focus:border-pwpurple-500 p-2.5 w-full"
                  id="firstName"
                  {...register("active", {
                    required: {
                      value: true,
                      message: "Es necesario poner una ciudad",
                    },
                  })}
                >
                  <option
                    value="true"
                    className="bg-pwgreen-500 text-pwgreen-50 font-bold"
                  >
                    ACTIVO
                  </option>
                  <option
                    value="false"
                    className="bg-pwpurple-500 text-pwpurple-50 font-bold"
                  >
                    INACTIVO
                  </option>
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
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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

export default FormCreateUser;
