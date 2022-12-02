import {useState} from 'react';
import axios from 'axios';
import {ChangeEvent} from 'react';
import styles from 'styles/ModalPayment.module.css'
import { Props } from 'pages/adoptions';
import { AiOutlineClose } from 'react-icons/ai'
import { NextComponentType } from 'next';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';

const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#ffc849cc",
        background:"#ffc849cc",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        iconColor: "#ff0000c",
        "::placeholder": {
          color: "#ffc849cc",
          iconColor: "#ff0000c",
        },
      },
      invalid: {
        color: "#ff0000",
        iconColor: "#ff0000c",
      },
    },
  };

const Checkout  = ({price}:Props)=>{
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [cardError, setCardError] = useState('');
  
    const handleSubmit= async(e: ChangeEvent<HTMLFormElement>)=>{
      e.preventDefault();

      const {error, paymentMethod} = await stripe!.createPaymentMethod({
        type: 'card',
        card: elements!.getElement(CardElement)!
      })
      setLoading(true);
      
      if(!error){
        const {id} = paymentMethod;
        try{
            setCardError(``);
            const {data} = await axios.post('http://localhost:3000/api/product/payment',{totalPrice: price, id});
            elements?.getElement(CardElement)?.clear()
        }catch(err:any){

            console.log(err.response.data.Error);
            elements?.getElement(CardElement)?.clear()
            setCardError(`${err.response.data.Error}`);
        }
      } 
      setLoading(false); 
    }
  
    return(
      <form onSubmit={handleSubmit}>
        <div className={styles.containerForm}>
          <div className={styles.inputContainer}>
            <CardElement options={CARD_ELEMENT_OPTIONS}/>
          </div>
          <h4 className={styles.error}>{cardError}</h4>
          <div>
            <button className={styles.button}>
              {loading ? 
              <>Processing...</>
                :
              <>Pay</>  
                }
            </button>  
          </div>  
        </div>
      </form>
    )
  
  };
  export default Checkout;
