import { NextComponentType } from "next";
import { MainLayout } from "components";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import { sendMail } from "utils/dbFetching";
import { ContactForm } from "../../app/types";
import { alerts } from "utils/alerts";

const Contact: NextComponentType = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>();

  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(sendMail, {
    onSuccess: (data) => {
      // console.log(data);
      alerts({
        icon: "info",
        title: "<strong>Email</strong>",
        text: "Email Sent",
        toast: true,
      });
      router.push("/");
    },
    onError: () => {
      alerts({
        icon: "error",
        title: "<strong>Email</strong>",
        text: "Cant send the mail",
        toast: true,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });
  const onSubmit: SubmitHandler<ContactForm> = async (data) => {
    const mail = {
      ...data,
      action: "contact",
    };
    const email = {
      ...data,
      action: "contactUs",
    };
    mutate(email);
    mutate(mail);
  };
  return (
    <MainLayout title="Contact">
      <div className="h-screen">
        <div className="relative z-0 w-full group mt-[15%] mb-[30%] drop-shadow-md shadow-md shadow-pwgreen-700 p-12">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="my-2.5 pb-2.5 text-pwgreen-600 text-center border-b-2 border-pwgreen-700 ">
              CONTACTANOS
            </h2>
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="text"
                id=""
                className="block py-2.5 px-0 w-full text-sm text-gray-700 bg-transparent border-0 border-b-2 border-white appearance-none  focus:outline-none focus:ring-0 focus:border-pwgreen-600 peer"
                placeholder=" "
                {...register("name", { required: true, maxLength: 20 })}
              />
              <label
                htmlFor="floating_password"
                className="peer-focus:font-medium absolute text-sm text-pwgreen-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-pwgreen-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Nombre
              </label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-gray-700 bg-transparent border-0 border-b-2 border-white appearance-none focus:outline-none focus:ring-0 focus:border-pwgreen-600 peer"
                placeholder=" "
                {...register("email", { required: true, maxLength: 40 })}
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-pwgreen-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-pwgreen-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Su email
              </label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="text"
                id=""
                className="block py-2.5 px-0 w-full text-sm text-gray-700 bg-transparent border-0 border-b-2 border-white appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-pwgreen-600 peer"
                placeholder=" "
                {...register("message", { required: true, maxLength: 20 })}
              />
              <label
                htmlFor="floating_repeat_password"
                className="peer-focus:font-medium absolute text-sm text-pwgreen-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-pwgreen-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Mensaje{" "}
              </label>
            </div>
            {isLoading ?   (
              <button type="button" className="text-white bg-pwgreen-500 hover:bg-pwgreen-800 focus:ring-4 focus:outline-none focus:ring-pwgreen-300 font-medium rounded-lg text-sm w-[15%] sm:w-[15%] px-5 py-2.5 text-center" disabled>
                Enviando...
              </button>
            ): (
              <button
                type="submit"
                className="text-white bg-pwgreen-500 hover:bg-pwgreen-800 focus:ring-4 focus:outline-none focus:ring-pwgreen-300 font-medium rounded-lg text-sm w-full lg:w-[15%] sm:w-[15%] px-5 py-2.5 text-center"
              >
                Enviar
              </button>
            )}

            <div className="md:absolute -bottom-3.5 right-2 bg-pwgreen-600 text-white w-80 px-8 rounded-md text-sm shadow-md shadow-pwgreen-700 sm:mt-24 ">
              <span className="mx-8"></span> Email de contacto
              <span className="mx-8"></span> pawsitiveteam0@gmail.com
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};
export default Contact;
