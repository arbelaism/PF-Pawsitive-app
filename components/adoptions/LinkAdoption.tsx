import { NextComponentType } from "next";
import styles from 'styles/LinkAdoption.module.css';
import AdoptionDetails from "./AdoptionDetails";
import { Props } from "pages/adoptions";

const LinkAdoption = ({id}:Props) => {
  return (
    <div className={styles.containerMain}>
      <div className={styles.container}>
        <div className={styles.buttonContainer}>
          <div className={styles.dog}>
            <div className={styles.tail}></div>
            <div className={styles.body}></div>
            <div className={styles.head}>
              <div className={styles.eyes}>
                <div className={styles.left}></div>
                <div className={styles.right}></div>
              </div>
              <div className={styles.nuzzle}>
                <div className={styles.mouth}>
                  <div className={styles.tongue}></div>
                </div>
                <div className={styles.nose}>
                  <div className={styles.nostrils}></div>
                  <div className={styles.highlight}></div>
                </div>
              </div>
            </div>
            <div className={styles.ears}>
              <div className={styles.left}></div>
              <div className={styles.right}></div>
            </div>
          </div>
          <AdoptionDetails id={id}/>         
          <div className={styles.paw}></div>
          <div className={styles.top}></div>
        </div>
      </div>
    </div>
  );
};
export default LinkAdoption;
