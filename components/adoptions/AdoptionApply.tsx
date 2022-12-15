import { NextComponentType } from 'next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query'
import {apply} from 'utils/dbFetching';
import { ApplyAdAp, Form } from 'app/types';
import Image from 'next/image'
import IsoGreen from 'public/iso-green.svg'
import useLocalStorage from 'use-local-storage';

const AdoptionApply: NextComponentType = () => {

    //TODO: 
    //==>> RESET LUEGO DE SUBMIT.
    //==>> ENVIAR MAIL INTERNO Y AL CLIENTE UNA VEZ HECHO EL SUBMIT.
    //==>> EVUALUAR QUE NO SE PUEDA HACER MAS DE UNA APLICACION A ADOPCION
    //==>> MOSTRAR NOTIFICACION DE SUCCESS O FAILURE

    const { mutate } = useMutation(apply);
    const [ids, _setIds] = useLocalStorage<ApplyAdAp>('ids', {
        petId: '',
        userId: ''
    })
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Form>({
            defaultValues:{
                reason:'',
                past: '',
                residence:'',
                employee:'',
                garden:'',
                adoptionPostId: ids.petId,
                userId: ids.userId
            }
    });

    const onSubmit: SubmitHandler<Form> = async(data)=> {
        data = { ...data}
        mutate(data)
        console.log(data)
        alert('TODO')
    }

    return (
        <div className="h-screen p-8 flex flex-col justify-evenly items-center bg-pwgreen-100 rounded-lg md:flex-row">
            <div className="w-full flex flex-col gap-3 justify-center items-center md:w-3/6">
                <Image
                    src={IsoGreen}
                    alt="not found"
                    width={150}
                    height={150}
                />
                <h2 className="font-Rubik font-bold text-4xl lg:text-6xl">
                    ¡Adoptar!
                </h2>
                <p className="text-md mb-2 md:text-xl md:text-center">
                    Completa todos los datos de éste formulario para poder 
                    aplicar a adoptar ésta mascota.
                </p>
            </div>
            <form className="w-full grid grid-cols-1 gap-2 items-center justify-center md:w-2/6 lg:gap-3"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex flex-col gap-1 items-start justify-center">
                    <label htmlFor="reason" className="label">
                        ¿Por qué quieres adoptar ésta mascota?
                    </label>
                    <textarea
                        placeholder="Escribe aquí la razón por la cual quieres adoptar a esta Paw-Mascota."
                        className="input"
                        {...register('reason', {
                            required: true,
                            minLength: 50,
                            pattern: /[a-zA-Z\s:]/
                        })}
                    />
                        {(errors.reason?.type === 'required' && (
                            <span className="text-red-500 text-xs">
                                Debes completar éste campo.
                            </span>
                            )) ||
                        (errors.reason?.type === 'minLength' && (
                            <span className="text-red-500 text-xs">
                                Detalla con al menos 50 caracteres porqué quieres adoptar esta mascota.
                            </span>
                            ))
                        }
                </div>
                <div className="flex gap-1 flex-col items-start justify-center">
                    <label htmlFor="residence" className="label">
                        ¿Qué tipo de vivienda tienes?
                    </label>
                    <select
                        className="input"
                        {...register('residence', {
                            required: true,
                            minLength: 2,
                            pattern: /[a-zA-Z\s:]/
                        })}
                    >
                        <option value="" >Vivienda...</option>
                        <option value="DEPARTAMENTO">Departamento</option>
                        <option value="CASA">Casa</option>
                        <option value="PISO">Piso</option>

                    </select>
                    {
                        errors.residence?.type === 'required' ?
                            <span className="text-red-500 text-xs">
                                Por favor, indica tu tipo de vivienda.
                            </span>
                            :
                            null
                    }
                    
                </div>
                <div className="flex gap-1 flex-col items-start justify-center">
                    <label htmlFor="employee" className="label">
                        ¿Tienes empleo?
                    </label>
                    <select
                        className="input"
                        {...register('employee', {
                            required: true,
                            minLength: 2,
                            setValueAs: (v) => Boolean(v)
                        })}
                    >
                        <option value="" >Empleo...</option>
                        <option value='true'>Si tengo empleo</option>
                        <option value='false'>No tengo empleo</option>
                    </select>
                    {
                        errors.employee?.type === 'required' ?
                            <span className="text-red-500 text-xs">
                                Por favor, indica si cuentas con empleo.
                            </span>
                            :
                            null
                    }
                </div>
                <div className="w-full flex gap-1 flex-col items-start justify-center">
                    <label htmlFor="garden" className="label">
                        ¿Tienes jardín o patio?
                    </label>
                    <select
                        className="input"
                        {...register('garden', {
                            required: true,
                            minLength: 2,
                            pattern: /[a-zA-Z\s:]/
                        })}
                    >
                        <option value="" >Jardín o patio...</option>
                        <option value='true'>Si, tengo jardín y/o patio.</option>
                        <option value='false'>No, no tengo jardín y/o patio.</option>
                    </select>
                    {
                        errors.garden?.type === 'required' ?
                            <span className="text-red-500 text-xs">
                                Por favor, indica si tienes jardín o patio.
                            </span>
                            :
                            null
                    }
                </div>
                <div className="w-full flex gap-1 flex-col items-start justify-center">
                    <label htmlFor="past" className="label">
                        ¿Anteriormente has tenido alguna mascota?
                    </label>
                    <select
                        className="input"
                        {...register('past', {
                            required: true,
                            minLength: 2,
                            pattern: /[a-zA-Z\s:]/
                        })}
                    >
                        <option value="" >Mascota...</option>
                        <option value='true'>Si, he tenido una o más mascotas.</option>
                        <option value='false'>No, no he tenido mascotas.</option>
                    </select>
                    {
                        errors.past?.type === 'required' ?
                            <span className="text-red-500 text-xs">
                                Por favor, si ya has tenido mascotas.
                            </span>
                            :
                            null
                    }
                </div>
                <button type='submit' className="text-center bg-pwgreen-500 py-3 my-2 rounded-md shadow-xl text-pwgreen-900 font-bold uppercase font-Rubik">
                    SOLICITAR ADOPCIÓN
                </button>
            </form>
        </div>
    )
}
export default AdoptionApply;
