import { NextComponentType } from "next";
import { Footer, Navbar } from "../components";
import styles from "../styles/Contact.module.css";

const contact: NextComponentType = () => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <form className={styles.formS}>
          <h2 className={styles.h2S}>CONTACT US</h2>
          <p className={styles.pS}>
            <label className={styles.labelS}> Name </label>
            <input
              className={styles.inputS}
              placeholder="Write your name here.."
            ></input>
          </p>
          <p className={styles.pS}>
            <label className={styles.labelS}> Email </label>
            <input
              className={styles.inputS}
              placeholder="Let us know how to contact you back.."
            ></input>
          </p>
          <p className={styles.pS}>
            <label className={styles.labelS}> Message </label>
            <input
              className={styles.inputS}
              placeholder="What would you like to tell us.."
            ></input>
          </p>
          <button className={styles.buttonS}>Send Message</button>
          <div className={styles.divS}>
            <span className={styles.spanS}></span> 001 1023 567
            <span className={styles.spanS}></span> pawsitiveContact@gmail.com
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};
export default contact;
