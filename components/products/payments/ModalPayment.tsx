import * as React from 'react';
import axios from 'axios';
import {ChangeEvent} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import styles from 'styles/ModalPayment.module.css'
import { Props } from 'pages/adoptions';
import { AiOutlineClose } from 'react-icons/ai'
import { NextComponentType } from 'next';
import {loadStripe} from '@stripe/stripe-js';
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import Checkout from './Checkout';


const stripePromise = loadStripe("pk_test_51M9y5pEAdwcBn8LBT7JVGygAveqQs9qERPGoCFo0gkYtsuiFqy1D9XSxUbPRcqrGHsOfyeGyoRYpLgnaAYUA5jJa00zhIbP99y");

const ModalPayment = ({price}:Props)=>{

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);  
  const handleClose = () => setOpen(false);   

    return (
      <Elements stripe={stripePromise}>
        <div>
          <button onClick={handleOpen} className={styles.button}>Buy</button>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Box className={styles.container}>
                <div className={styles.containerDetails}>             
                      
                      <div className={styles.headerContainer}>
                        <div className={styles.titleContainer}>                    
                          <h2>Complete data and press Buy button to confirm</h2>                   
                        </div>
                        <div className={styles.buttonContainer}>
                          <button onClick={handleClose}><AiOutlineClose/></button>
                        </div>
                      </div>
                      <div className={styles.amount}>
                        <h1>Amount: ${`${price}`}</h1>
                      </div>
                      <div className={styles.FormContainer}>
                        <div className={styles.descriptionContainer}>
                          <p className={styles.description}>Please, if you are sure to buy these products, add your card details. All your personal information is safe, dont worry. After processing your payment, youll recieved a mail details about your purchased.</p>
                        </div>
                        <Checkout price={price}/>
                      </div>                
                    
                </div>
              </Box>
            </Fade>
          </Modal>
        </div>
      </Elements>    
  );
};
export default ModalPayment;
