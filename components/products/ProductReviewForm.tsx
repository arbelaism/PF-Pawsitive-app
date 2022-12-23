import { Review } from 'app/types'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { useForm, SubmitHandler } from 'react-hook-form'
import { ReviewFormInput } from 'app/types'
import { alerts } from 'utils/alerts'
import { useMutation, useQueryClient } from 'react-query'
import { createReview } from 'utils/dbFetching'
import { useRouter } from 'next/router'
import { useUser } from '@auth0/nextjs-auth0/client'

type Props = {
    id: string
    userBoughtProduct: string
}

const ProductReviewForm = ({ id, userBoughtProduct }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ReviewFormInput>()

    const router = useRouter()

    const queryClient = useQueryClient()
    const { mutate, error, isLoading } = useMutation(createReview, {
        onSuccess: () => {
            queryClient.invalidateQueries('product')
        }
    })
    const { user, error: errorU, isLoading: isLoadingU } = useUser()

    const onSubmit: SubmitHandler<ReviewFormInput> = async data => {
        data = { ...data, productId: id, userId: user?.sub as string }
        mutate(data)
        alerts({
            icon: 'success',
            title: '<strong>Reseña registrada con exito</strong>',
            html:
                'Para ir al productos nuevamente presione <b><a href="/products">aqui</a></b>, ' +
                'para seguir en la pagina actual, presione el boton "Continuar"',
            confirmButtonText: 'Continuar',
            confirmButtonAriaLabel: 'Thumbs up, great!'
        })

        // router.push("/products")
    }

    return (
        <div>
            <form
                className="flex flex-col gap-3 justify-between items-end bg-pwgreen-100 px-4 py-6 w-full h-max"
                onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col w-full gap-2 justify-center">
                    <label className="label text-base mx-2 lg:text-xl">
                        Deja tu reseña sobre este producto
                    </label>
                    <textarea
                        placeholder="Deja tu reseña"
                        id="review"
                        rows={10}
                        className="input"
                        disabled={userBoughtProduct ? false : true}
                        {...register('review', { required: true })}
                    />
                    {errors.review?.type === 'required' && (
                        <p className="text-red-500 text-xs italic">
                            La reseña es obligatoria para dejar un comentario
                        </p>
                    )}

                    <input
                        className="input"
                        id="rating"
                        placeholder="Puntuacion"
                        disabled={userBoughtProduct ? false : true}
                        type="number"
                        {...register('rating', {
                            required: true,
                            min: 1,
                            max: 5
                        })}
                    />
                    {(errors.rating?.type === 'required' && (
                        <p className="text-red-500 text-xs italic">
                            La puntuacion es obligatoria para dejar un
                            comentario
                        </p>
                    )) ||
                        (errors.rating?.type === 'min' && (
                            <p className="text-red-500 text-xs italic">
                                Puntuacion debe ser mayor que 0
                            </p>
                        )) ||
                        (errors.rating?.type === 'max' && (
                            <p className="text-red-500 text-xs italic">
                                Puntuacion debe ser menor o igual que 5
                            </p>
                        ))}
                </div>
                <div className="flex w-full justify-between">
                    {!userBoughtProduct ? (
                        <span className="text-slate-500 text-xs lg:text-sm">
                            Necesitas comprar el producto para dejar tu reseña.
                        </span>
                    ) : null}
                    <button
                        type="submit"
                        disabled={userBoughtProduct ? false : true}
                        className="dashboardButton text-sm uppercase py-2 px-4 text-pwgreen-50 bg-pwgreen-600 hover:bg-pwgreen-800 transition-colors lg:text-base lg:py-4 lg:px-6">
                        Comentar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ProductReviewForm
