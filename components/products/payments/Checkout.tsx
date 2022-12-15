import { useEffect, useState } from "react";
import axios from "axios";
import { ChangeEvent } from "react";
import { Props } from "pages/adoptions";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { alerts } from "utils/alerts";
import { sendPaymentMail } from "utils/dbFetching";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import { CheckIn, Product } from "app/types";
import useLocalStorage from "use-local-storage";
import { useUser } from "@auth0/nextjs-auth0/client";
import { checkEmail } from "utils/checkEmail";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#000000",
      background: "#ffc849cc",
      fontFamily: '"Rubik", Rubik, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "20px",
      iconColor: "#308253",
      "::placeholder": {
        color: "#000000",
        iconColor: "#000000",
      },
    },
    invalid: {
      color: "#ff0000",
      iconColor: "#ff0000c",
    },
  },
};

const Checkout = ({ price, setOpen }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [cardError, setCardError] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [message, setMessage] = useState("");
  const [products, setProducts] = useLocalStorage<Product[]>(
    "cartProducts",
    []
  );
  const myStorage = window.localStorage;
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, error: err, isLoading: load } = useUser();
  const id = user?.sub as string;
  const { mutate, isLoading } = useMutation(sendPaymentMail, {
    onSuccess: (data) => {
      alerts({
        icon: "info",
        title: "<strong>Email</strong>",
        text: "Email Sent",
        toast: true,
      });
      myStorage.clear();
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

  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  let hour = today.getHours();
  let minutes = today.getMinutes();

  const productsT = products.map((product) => {
    return { quantity: product.amount, productId: product.id };
  });

  const dataT = { amount: price, userId: id, array: productsT };

  let postTransaction = async () => {
    const { data } = await axios.post("/api/transaction", dataT);
    const { id } = data;
    setTransactionId(id);
  };

  useEffect(() => {
    postTransaction();
  }, []);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe!.createPaymentMethod({
      type: "card",
      card: elements!.getElement(CardElement)!,
    });
    setLoading(true);

    if (!error) {
      const { id } = paymentMethod;
      try {
        setCardError(``);
        const { data } = await axios.post("/api/product/payment", {
          totalPrice: price,
          id,
        });
        const { message } = data;
        setMessage(message);

        if (user?.name && user.nickname && user.sub) {
          let email: string = checkEmail(user.sub, user.nickname);
          if (email && email === "auth0") {
            email = user.name;
          }
          let paymentData: CheckIn = {
            name: user!.name,
            idT: transactionId,
            email: email,
            products: products,
            total: price,
            action: "sell",
          };
          elements?.getElement(CardElement)?.clear();
          mutate(paymentData);

          products.map(async (product) => {
            if (product.amount) {
              await axios.put(`/api/product/${product.id}`, {
                stock: product.stock - product?.amount,
              });
            }
          });
        }
      } catch (err: any) {
        elements?.getElement(CardElement)?.clear();
        setCardError(`${err.response.data.Error}`);
      }
    }
    setOpen(false);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="h-full font-medium">
      <div className="w-full h-5/6 lg:h-auto flex flex-col justify-center items-center lg:flex-col rounded-lg bg-pwgreen-400 py-4 px-2">
        <div className="w-full lg:w-3/5">
          <h1 className="text-2xl mb-2">Datos de la compra</h1>
          <div className="flex flex-row font-Rubik bg-pwgreen-200 justify-between py-4 px-2">
            <ul className="gap-2">
              <li>Importe:</li>
              <li>N# de Pedido:</li>
              <li>Fecha:</li>
              <li>Hora:</li>
            </ul>
            <ul className="gap-2">
              <li className="text-lg lg:text-xl">${price}</li>
              <li>{transactionId && transactionId}</li>
              <li>
                {day}/{month}/{year}
              </li>
              <li>
                {hour}:{minutes}
              </li>
            </ul>
          </div>
        </div>
        <div className=" py-4 px-1 w-full lg:w-3/5">
          <h1 className="text-2xl mb-2">Pago con Tarjeta</h1>
          <div className="bg-pwgreen-200 py-4 px-1 rounded-lg font-black">
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </div>
        </div>
      </div>
      <div>
        {cardError && (
          <>
            {alerts({
              icon: "error",
              title: "<strong>Oops...</strong>",
              text: cardError,
            })}
          </>
        )}
        {message && (
          <>
            {alerts({
              icon: "success",
              title: "<strong>Payment</strong>",
              text: "The payment was successful",
            })}
          </>
        )}

        <button className="dashboardButton mx-auto lg:mt-32">
          {loading ? <>Procesando...</> : <>Pagar</>}
        </button>
      </div>
    </form>
  );
};
export default Checkout;
