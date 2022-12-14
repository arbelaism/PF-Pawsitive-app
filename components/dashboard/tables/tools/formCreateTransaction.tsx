import React, { useState, useEffect } from 'react'
import { alerts } from 'utils/alerts'
import { Product } from 'app/types';
import { getProducts, getUsers } from 'utils/dbFetching'
import { mediaUploader } from 'utils/mediaUploader'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useQuery } from 'react-query'
import { FaUserPlus, FaFileImage } from 'react-icons/fa'
import { IoClose, IoCloseCircle } from 'react-icons/io5'
import { Modal } from 'components'

interface FormEstructure {
    id? : string,
    amount : number,
    createdAt? : Date,
    updatedAt? : Date,  
    userId : string,
    quantity : Quantity[],
    status : string
  }
  interface Quantity {
    id? : string,
    quantity : number,
    // transaction : FormEstructure[],  
    productId :string
  }
  enum STATUS {
    REFUND,
    INCOMPLETE_PAYMENT,
    PROCESSING_PAYMENT,
    PROCESSING_SHIPPING,
    SHIPPING,
    PAYMENT_COMPLETE
  }

const FormTransaction = (mutationCreate: any) => {
    const formEstructure = {
        id : "",
        amount : 0,        
        userId : "",
        quantity : [],
        status : "PROCESSING_PAYMENT"
    }

    //Estado para agregar o quitar productos
    const [inputList, setInputList] = useState([
        {
          productId: '',
          quantity: 1,
          price: 0
        }
    ])    
    const [isDisabled, setIsDisabled] = useState(false)    

    //Traer productos
    const {
        data: products,
        error,
        isLoading,
        isSuccess
    } = useQuery(['products'], getProducts)
    
    //Traer usuarios
    const {
        data: users,
        error: errorU,
        isLoading: isLoadingU,
        isSuccess: isSuccessU
    } = useQuery(['users'], getUsers)
    //Manejar form

    const [form, setForm] = useState<FormEstructure>({ ...formEstructure })

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormEstructure>()    

    //Collapse/Expand Form

    const [condition, setCondition] = useState(false)

    function toggleCondition(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        if (condition === false) setForm({ ...formEstructure })
        setCondition(!condition)
    }
    //calcular precio
    const getTotalPrice = () => {
        return inputList.reduce(
            (acc, input) => acc + input.price*input.quantity,
            0
        )
    }
    //funcion para agregar inputProduct
    const handleListAdd = (e :React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setInputList([
          ...inputList,
          {
            productId: '',
            quantity: 1,
            price : 0
          }
        ])
    }
    const handleRemoveItem = (i: number) => {
        const newList = [...inputList]        
        newList.splice(i, 1)
        setInputList(newList)
    }

    //funcion para guardar valores en el estado de inputList
    const handleInputChange = (e :React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, i: number) => {
        const newInputList = [... inputList]
        if(e.target.name==="product"){
            const valueProduct = products.find((prod : any) => prod.id===e.target.value )
            newInputList[i].productId = e.target.value
            newInputList[i].price = valueProduct.displayPrice
            
        }
        else if (e.target.name==="quantity"){
            newInputList[i].quantity = parseInt(e.target.value)
        }
        setInputList(newInputList)        
    }
    const onSubmit: SubmitHandler<FormEstructure> = async data => {
        const totalPrice = getTotalPrice()
        data.amount = totalPrice
        data.quantity = inputList.map(input => {
            const {price, ...quantity} = input
            return quantity
        })
        data.status = "PROCESSING_PAYMENT"
        mutationCreate.mutate(data)       
        setCondition(!condition)        
        setInputList([
            {
              productId: '',
              quantity: 1,
              price: 0
            }
        ])
    }
    useEffect(() => {
        if (inputList.length > 0) {
          inputList[inputList.length - 1].productId === ""
            ? setIsDisabled(true)
            : setIsDisabled(false)
        }
      })
    const totalPrice = getTotalPrice()
    return (
        <div>
            <div>
                <div className="flex gap-3">
                    <button
                        className="dashboardButton text-base bg-pwgreen-700 text-pwgreen-50 hover:bg-pwgreen-800 transition-colors"
                        onClick={toggleCondition}>
                        <FaUserPlus />
                        Agregar Transaccion
                    </button>
                </div>
            </div>
            {condition ? (
                <Modal>
                    <h1 className="text-2xl mb-3 font-semibold lg:text-3xl">
                        Crear nueva transaccion
                    </h1>
                    <button
                        onClick={toggleCondition}
                        className="absolute top-5 right-5 text-3xl text-pwgreen-800 cursor-pointer hover:bg-pwgreen-800 hover:text-pwgreen-50 transition-all hover:rotate-90 hover:rounded-full">
                        <IoClose />
                    </button>
                    <div className="overflow-y-visible">
                        <form action="" onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-1 gap-1 md:grid-cols-1">
                                <div className="input-type">
                                    <label
                                        htmlFor="user"
                                        className="label">
                                        Usuario:
                                    </label>
                                    {isLoadingU ? (<p>Cargando usuarios</p>)
                                    :(
                                        
                                        <select
                                            id="user"                                        
                                            placeholder="Usuario"
                                            className="input"
                                            {...register('userId', {
                                                required: {
                                                    value: true,
                                                    message:
                                                        'Es necesario seleccionar un usuario'
                                                }
                                            })}
                                        >
                                            <option value=''>Seleccione un usuario</option>
                                            {users.map((user : any, i: number) => <option
                                            key={i}
                                            value={user.id}
                                            >{user.firstName+" "+user.lastName}</option>)}
                                        </select>
                                    )
                                    }
                                    {errors?.userId?.message && (
                                        <div
                                            className="bg-pwgreen-800 border-l-2 border-r-2  border4 border-white text-white p-2"
                                            role="alert">
                                            <p>{errors.userId.message}</p>
                                        </div>
                                    )}
                                </div>
                                <div className='grid grid-cols-1 gap-1 md:grid-cols-1'>
                                    <div className="input-type">
                                        <label
                                            htmlFor="user"
                                            className="label">
                                            Producto(s):
                                        </label>
                                        {isLoading ? (<p>Cargando productos</p>)
                                        : inputList.map((row : any, i) => 
                                        <div key={"producto"+i} className='grid grid-cols-1 gap-1 md:grid-cols-2'>
                                            <select
                                            name='product'                                                                               
                                            placeholder="Producto"
                                            className="input"
                                            onChange={(e)=>handleInputChange(e, i)}
                                            >
                                                {products.map((product : any) => <option
                                                value={product.id}
                                                >{product.name}</option>)}  
                                            </select>
                                            <div className='grid grid-cols-1 gap-1 md:grid-cols-6'>
                                                <input
                                                name='quantity'
                                                className="input col-span-5"
                                                onChange={(e)=>handleInputChange(e, i)}
                                                type='number'
                                                defaultValue='1'
                                                ></input>
                                                <button 
                                                    className='top-5 left-5 text-3xl text-pwgreen-800 cursor-pointer hover:text-pwgreen-600 transition-all hover:rounded-full justify-self-center'
                                                    onClick={() => handleRemoveItem(i)}
                                                    >
                                                    <span role="img" aria-label="x emoji">
                                                    <IoCloseCircle />
                                                    </span>
                                                </button>
                                            </div>
                                        </div>)
                                        }
                                    </div>
                                </div>
                                <button 
                                    className="w-1/2 ml-32 font-Rubik py-3 bg-pwgreen-700 text-pwgreen-50 hover:bg-pwgreen-800 font-semibold uppercase rounded-lg shadow-2xl"
                                    onClick={(e)=>handleListAdd(e)} 
                                    disabled={isDisabled}
                                    >
                                    Agregar otro producto
                                </button>
                                <div className='font-bold font-Rubik py-3 text-pwgreen-700 justify-self-center'>
                                    <h2>Valor total transaccion: ${getTotalPrice()}</h2>
                                </div>
                                <button
                                    className="w-full font-Rubik py-3 bg-pwgreen-700 text-pwgreen-50 hover:bg-pwgreen-800 font-semibold uppercase rounded-lg shadow-2xl"
                                    type="submit">
                                    Registrar
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>
            ) : null}
        </div>
    )
}

export default FormTransaction
