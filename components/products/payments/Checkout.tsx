import {useState} from 'react';
import axios from 'axios';
import {ChangeEvent} from 'react';
import styles from 'styles/ModalPayment.module.css'
import { Props } from 'pages/adoptions';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { alerts } from 'utils/alerts';
import { sendPaymentMail } from 'utils/dbFetching';
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import { CheckIn, Product } from 'app/types';
import useLocalStorage from 'use-local-storage';
import { useUser } from '@auth0/nextjs-auth0/client';

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

const Checkout  = ({price, setOpen}:Props)=>{
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [cardError, setCardError] = useState('');
    const [message, setMessage] = useState('')
    const [products, setProducts] = useLocalStorage<Product[]>("cartProducts", [])
    const myStorage =  window.localStorage
    const router = useRouter()
    const queryClient = useQueryClient();
    const { user, error } = useUser()
    const { mutate, isLoading } = useMutation(sendPaymentMail, {
      onSuccess: data => {
        alerts({icon: 'info', title: '<strong>Email</strong>', text: 'Email Sent', toast: true})
        myStorage.clear()
        router.push("/") 
      },
      onError: () => {
        alerts({icon: 'error', title: '<strong>Email</strong>', text: 'Cant send the mail', toast: true})
      },
      onSettled: () => {
        queryClient.invalidateQueries('create');
      }
    });
    
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
            const {data} = await axios.post('/api/product/payment',{totalPrice: price, id});
            const { message } = data
            setMessage(message)
            
            if (user?.name && user.nickname && user.sub){
              let email: string = ""
              if(/google/gi.test(user?.sub)){
                email=`${user?.nickname}@gmail.com`
              }
              let paymentData: CheckIn = {
              name: user!.name,
              email: email,
              products: products,
              total: price,
              action: 'sell',
            } 
            elements?.getElement(CardElement)?.clear()
            mutate(paymentData)
            const productsT = products.map((product)=>{
              return {quantity: product.amount , productId: product.id}
            })
            
            const dataT = {amount: price, userId: '1', array: productsT}
            
            await axios.post('/api/transaction',dataT)
            products.map(async (product)=>{
              if(product.amount){
                await axios.put(`/api/product/${product.id}`,{stock:product.stock-product?.amount})
              }
            })
            }
        }catch(err:any){
            elements?.getElement(CardElement)?.clear()
            setCardError(`${err.response.data.Error}`);
        }
      } 
      setOpen(false)
      setLoading(false); 
    }
  
    return(
      <form onSubmit={handleSubmit}>
        <div className={styles.containerForm}>
          <div className={styles.inputContainer}>
            <CardElement options={CARD_ELEMENT_OPTIONS}/>
          </div>
          <div>
            {cardError && <>{alerts({icon: 'error', title: '<strong>Oops...</strong>', text: cardError })}</>}    
            {message && <>{alerts({icon: 'success', title: '<strong>Payment</strong>', text: 'The payment was successful' })}</>}
            
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
