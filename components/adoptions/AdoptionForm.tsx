import { NextComponentType } from 'next'
import { useForm, SubmitHandler } from 'react-hook-form'
import React, { useState } from 'react'
import { mediaUploader } from 'utils/mediaUploader'
import { useMutation } from 'react-query'
import { createPost } from 'utils/dbFetching'
import { AdoptFormInput } from 'app/types'
import { useUser } from '@auth0/nextjs-auth0/client'
import Image from 'next/image'
import IsoGreen from 'public/iso-green.svg'
import { alerts } from 'utils/alerts'
import router from 'next/router'

const AdoptionForm: NextComponentType = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<AdoptFormInput>({
        defaultValues: {
            name: '',
            size: '',
            age: '',
            active: true,
            monthOrYear: '',
            breed: '',
            photo: '',
            userId: ''
        }
    })

    const [media, setMedia] = useState<File[]>([])

    const { mutate } = useMutation(createPost, {
        onSuccess: () => {
            alerts({
                icon: 'success',
                title: 'Felicidades.',
                text: 'Tu mascota se creó correctamente. Podés ver más detalles del progreso en tu perfil de usuario.',
                toast: true
            })

            router.push('/adoptions')
        }
    })

    const { user, error: errorU, isLoading: isLoadingU } = useUser()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const target = e.target as HTMLInputElement
        const files = [...Object.values(target.files!)]
        setMedia([...files])
    }

    const onSubmit: SubmitHandler<AdoptFormInput> = async data => {
        let urlPhoto: any = []
        if (media.length > 0) {
            urlPhoto = await mediaUploader(media)
        }
        data = {
            ...data,
            age: `${data.age} ${data.monthOrYear}`,
            photo: urlPhoto ? urlPhoto[0] : null,
            active: true,
            userId: '1'
        }
        mutate(data)
        reset({
            name: '',
            size: '',
            age: '',
            active: true,
            monthOrYear: '',
            breed: '',
            photo: '',
            userId: '',
            description: ''
        })
    }

    return (
        <>
            <div className="p-8 flex flex-col justify-evenly items-center bg-pwgreen-100 rounded-lg md:flex-row">
                <div className="w-full flex flex-col gap-4 justify-center items-center md:w-3/6">
                    <Image
                        src={IsoGreen}
                        alt="not found"
                        width={150}
                        height={150}
                    />
                    <p className="text-md mb-2 md:text-xl md:text-center">
                        Completa todos los datos de éste formulario con toda la
                        información solicitada para poder publicar una mascota
                        en adopción.
                    </p>
                </div>
                <form
                    className="w-full grid grid-cols-1 gap-2 items-center justify-center md:w-2/6 lg:gap-3"
                    onSubmit={handleSubmit(onSubmit)}>
                    {/* NOMBRE */}
                    <div className="flex flex-col gap-1 items-start justify-center">
                        <label htmlFor="name" className="label">
                            Nombre:
                        </label>
                        <input
                            placeholder="Nombre..."
                            {...register('name', {
                                required: true,
                                maxLength: 20
                            })}
                            className="input"
                        />
                        {errors.name?.type === 'required' ? (
                            <p className="text-red-500 text-xs italic">
                                Nombre es obligatorio
                            </p>
                        ) : null}
                        {errors.name?.type === 'maxLength' ? (
                            <p className="text-red-500 text-xs italic">
                                El nombre no puede contener mas de 20 caracteres
                            </p>
                        ) : null}
                    </div>

                    {/* TAMAÑO */}
                    <div className="flex gap-1 flex-col items-start justify-center">
                        <label htmlFor="size" className="label">
                            Tamaño:
                        </label>
                        <select
                            // className="input"
                            placeholder="Tamaño..."
                            className="input"
                            {...register('size', {
                                required: true
                            })}>
                            <option value="SMALL">Pequeño</option>
                            <option value="MEDIUM">Mediano</option>
                            <option value="BIG">Grande</option>
                        </select>
                        {errors.size?.type === 'required' ? (
                            <p className="text-red-500 text-xs italic">
                                Tamaño es obligatorio
                            </p>
                        ) : null}
                    </div>

                    {/* EDAD */}
                    <div className="flex gap-1 flex-col items-start justify-center">
                        <div>
                            <label htmlFor="age" className="label">
                                ¿Qué edad tiene la mascota?
                            </label>
                        </div>
                        <div className="flex justify-between items-center gap-4">
                            <input
                                className="input"
                                placeholder="Edad..."
                                type="number"
                                {...register('age', {
                                    required: true,
                                    min: 0,
                                    max: 50
                                })}
                            />
                            <div className="flex flex-row gap-2 items-center justify-evenly">
                                <input
                                    type="radio"
                                    value="meses"
                                    defaultChecked
                                    {...register('monthOrYear')}
                                />{' '}
                                Meses
                                <input
                                    type="radio"
                                    value="años"
                                    {...register('monthOrYear')}
                                />{' '}
                                Años
                            </div>
                            {errors.age?.type === 'required' ? (
                                <p className="text-red-500 text-xs italic">
                                    Edad es obligatoria
                                </p>
                            ) : null}
                            {errors.age?.type === 'min' ? (
                                <p className="text-red-500 text-xs italic">
                                    La edad debe ser mayor a cero.
                                </p>
                            ) : null}
                            {errors.age?.type === 'max' ? (
                                <p className="text-red-500 text-xs italic">
                                    La edad debe ser menor a cincuenta.
                                </p>
                            ) : null}
                        </div>
                    </div>

                    {/* ESPECIE */}
                    <div className="flex gap-1 flex-col items-start justify-center">
                        <label htmlFor="breed" className="label">
                            Especie:
                        </label>
                        <select
                            className="input"
                            placeholder="Especie..."
                            {...register('breed', {
                                required: true
                            })}>
                            <option value="gato">Gato</option>
                            <option value="perro">Perro</option>
                            <option value="tortuga">Tortuga</option>
                            <option value="ave">Ave</option>
                            <option value="otro">Otro...</option>
                        </select>
                        {errors.breed?.type === 'required' ? (
                            <p className="text-red-500 text-xs italic">
                                Es obligatorio indicar una especie.
                            </p>
                        ) : null}
                    </div>

                    {/* DESCRIPCION */}
                    <div className="flex flex-col gap-1 items-start justify-center">
                        <label htmlFor="description" className="label">
                            ¿Cómo es la mascota que deseas publicar?
                        </label>
                        <textarea
                            placeholder="Escribe aquí una pequeña descripción de tu Paw-Mascota."
                            className="input"
                            {...register('description', {
                                required: true,
                                minLength: 20,
                                pattern: /[a-zA-Z\s:]/
                            })}
                        />
                        {errors.description?.type === 'required' ? (
                            <span className="text-red-500 text-xs">
                                Debes completar éste campo.
                            </span>
                        ) : null}
                        {errors.description?.type === 'minLength' ? (
                            <span className="text-red-500 text-xs">
                                Debes agregar una descripción de al menos 20
                                caracteres.
                            </span>
                        ) : null}
                    </div>

                    {/* FOTO */}
                    <div className="flex flex-col gap-1 items-start justify-center">
                        <label className="label">Foto:</label>
                        <input
                            onChange={e => handleChange(e)}
                            className="input"
                            id="photo"
                            type="file"
                            multiple
                            accept="image/*"
                        />
                    </div>

                    <button
                        type="submit"
                        className="text-center bg-pwgreen-500 py-3 my-2 rounded-md shadow-xl text-pwgreen-50 font-bold uppercase font-Rubik hover:bg-pwgreen-800 transition-all">
                        CREAR ADOPCIÓN
                    </button>
                </form>
            </div>
        </>
    )
}

export default AdoptionForm
