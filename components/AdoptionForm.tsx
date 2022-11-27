import { NextComponentType } from 'next'
import { useForm, SubmitHandler } from "react-hook-form";
import styles from '../styles/AdoptionForm.module.css'

interface AdoptFormInput {
    name?: string;
    size?: string;
    age?: number;
    breed?: string;
    // photo?: string;
  }

const AdoptionForm: NextComponentType = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<AdoptFormInput>();

    const onSubmit: SubmitHandler<AdoptFormInput> = async (data) => {
        const dataplain = JSON.stringify({... data, active: true})
        console.log(dataplain)
        await fetch('http://localhost:3000/api/create/adoptionpost', { 
            method: 'POST', 
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({... data, active: true, userId:"1"}) })
        .then(res => console.log(res.json()))

    }
    

    return (
        <>
        <form name='adopt' className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <h2 className='block uppercase tracking-wide text-gray-700 text-s font-bold mb-'>Adoption post details</h2>
            <div className={styles.firstLine}>
                <div className=''>
                    <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-'>*Name:</label>
                    <input className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    id="name" placeholder="Name" {...register("name", { required: true, maxLength: 20 })} />
                    {
                        (errors.name?.type==='required' && (<p className='text-red-500 text-xs italic'>Name is required</p>)) ||
                        (errors.name?.type==='maxLength' && (<p className='text-red-500 text-xs italic'>Name length must be less than 20</p>))
                    }
                </div>
                <div className=''>
                    <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-'>*Size:</label>
                    <select className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                        id="size" placeholder="Size" {...register("size", { required: true})} >
                        <option>Small</option>
                        <option>MEDIUM</option>
                        <option>Big</option>
                    </select>
                    {
                        (errors.size?.type==='required' && (<p className='text-red-500 text-xs italic'>Size is required</p>))
                    }
                </div>
            </div>
            <div className={styles.firstLine}>    
                <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                    <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>*Age:</label>
                    <input className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                        id="age" placeholder="Age" type="number" {...register("age", {required: true, min: 0, max: 50 })} />
                    {
                        (errors.age?.type==='required' && (<p className='text-red-500 text-xs italic'>Age is required</p>)) ||
                        (errors.age?.type==='min' && (<p className='text-red-500 text-xs italic'>Age must be greater than 0</p>)) ||
                        (errors.age?.type==='max' && (<p className='text-red-500 text-xs italic'>Age must be less than 50</p>))
                    }
                </div>
                <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                    <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>*Breed:</label>
                    <input className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                        id="breed" placeholder="Breed" {...register("breed", { required: true, maxLength: 20 })} />
                    {
                        (errors.breed?.type==='required' && (<p className='text-red-500 text-xs italic'>Breed is required</p>)) ||
                        (errors.breed?.type==='maxLength' && (<p className='text-red-500 text-xs italic'>Breed length must be less than 20</p>))
                    }
                </div>
            </div>
            {/*<div className='mb-6'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Photo:</label>
                <input className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    id="photo" type="file" {...register("photo")} multiple accept='image/*'/>
            </div>*/}
                <p className='text-black-500 text-xs italic'>Please note that fields with * are required</p>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'type="submit">Register</button>
        </form>
        </>
    )
}

export default AdoptionForm;
