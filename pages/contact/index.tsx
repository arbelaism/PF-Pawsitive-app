import { NextComponentType } from "next";
import { MainLayout } from "components";
import styles from "styles/Contact.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import emailjs from "@emailjs/browser";

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

const Contact: NextComponentType = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>();

  const onSubmit: SubmitHandler<ContactForm> = async (data) => {
    try {
      emailjs
        .send(
          "service_crfov1j",
          "template_ykzfued",
          {
            from_name: "Pawsitive team",
            to_name: `${data.name}`,
            message: `contest this mail to start a conversation with us`,
            reply_to: `${data.email}`,
          },
          "Vu6_KG-xIf-x55P1I"
        )
        .then(
          function (response:any) {
            console.log("SUCCESS!", response.status, response.text);
          },
          function (error:any) {
            console.log("FAILED...", error);
          }
        );
    } catch (error) {
      console.log(error + "Incorrect data form");
    }
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
