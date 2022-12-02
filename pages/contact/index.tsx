import { NextComponentType } from "next";
import { MainLayout } from "components";
import styles from "styles/Contact.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router"
import { sendMail } from "utils/dbFetching"
import { ContactForm } from "../../app/types";

const Contact: NextComponentType = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>();
  
  const router = useRouter()
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(sendMail, {
    onSuccess: data => {
      console.log(data);
      const message = "Mail sent"
      alert(message)
      router.push("http://localhost:3000/") 
    },
    onError: () => {
      alert("Cant send the mail")
    },
    onSettled: () => {
      queryClient.invalidateQueries('create');
    }
  });
  
  const onSubmit: SubmitHandler<ContactForm> = async (data) => {
    const mail = {
      ...data,
      action : "contact",
    };
    mutate(mail)
  };

  return (
    <MainLayout title="Contact">
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formS}>
          <h2 className={styles.h2S}>CONTACT US</h2>
          <p className={styles.pS}>
            <label className={styles.labelS}> Name </label>
            <input
              className={styles.inputS}
              placeholder="Write your name here.."
              {...register("name", { required: true, maxLength: 20 })}
            />
          </p>
          <p className={styles.pS}>
            <label className={styles.labelS}> Email </label>
            <input
              className={styles.inputS}
              placeholder="Let us know how to contact you back.."
              {...register("email", { required: true, maxLength: 40 })}
            />
          </p>
          <p className={styles.pS}>
            <label className={styles.labelS}> Message </label>
            <input
              className={styles.inputS}
              placeholder="What would you like to tell us.."
              {...register("message", { required: true, maxLength: 20 })}
            />
          </p>
          <button className={styles.buttonS}>Send Message</button>
          <div className={styles.divS}>
            <span className={styles.spanS}></span> 001 1023 567
            <span className={styles.spanS}></span> pawsitiveContact@gmail.com
          </div>
        </form>
      </div>
    </MainLayout>
  );
};
export default Contact;
