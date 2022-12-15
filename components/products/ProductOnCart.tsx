import { Product } from "app/types";
import Image from 'next/image'

type Props = {
  product: Product;
  addToCart: (clickedProduct: Product) => void;
  removeFromCart: (id: string) => void;
};

const CartProduct = ({ product, addToCart, removeFromCart }: Props) => {
   
  let screen = window.screen
  let arrName = product.name.split(' ')
  let firstName = arrName[0]
  let resName = product.name.slice(firstName.length,product.name.length)
  let idBoton = `boton${product.id}`
  let idResName = `resName${product.id}`

  
  let onClick = () =>{
    const resName = document.querySelector(`#${idResName}`);
    const boton = document.querySelector(`#${idBoton}`);
    resName?.classList.toggle("hidden");
    boton?.classList.toggle("hidden");
  }

  return (
    <div className='flex flex-row lg:flex-col py-3 font-Rubik w-full lg:w-auto justify-evenly items-center text-center border border-pwgreen-300  text-pwgreen-800'>
        <div>
          <Image
                    src={product.photo}
                    alt="No image to display"
                    width='100%'
                    height='100%'
                />
        </div>
        <div className="w-full flex flex-col">
          <div>
            <p className="font-">{screen.width < 1024 ? firstName : product.name}</p>
            <button onClick={onClick} id={idResName} className="hidden">{resName}</button>
            <button onClick={onClick} id={idBoton} className="lg:hidden">...</button>
          </div> 
          <div className="w-auto text-md flex  justify-around items-center flex-row font-bold">
            <div className="dashboardButton p-1">
              <button className="w-6 lg:w-10 h-auto bg-transparent text-pwgreen-800 hover:text-pwgreen-50 py-0"        
              onClick={() => removeFromCart(product.id)}
              >
              -
              </button>  
              <p >{product.amount}</p>          
              <button className="w-6 lg:w-10  h-auto bg-transparent text-pwgreen-800 hover:text-pwgreen-50 py-0"
              disabled={product.stock<=1 && true}    
              onClick={() => addToCart(product)}
              >
              +
              </button>
            </div>
            <p className="font-bold">${(product.amount! * product.price)}</p>
          </div>
        </div>
    </div>
  );
};

export default CartProduct;
