import { Review } from "app/types";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useForm, SubmitHandler } from "react-hook-form";
import { ReviewFormInput } from "app/types";
import { alerts } from 'utils/alerts';
import { useMutation, useQueryClient } from "react-query";
import { createReview } from "utils/dbFetching"
import { useRouter } from "next/router";

type Props = {
    id : string   
  };

const ProductReviewForm = ({id} : Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<ReviewFormInput>();

      const router = useRouter()

      const queryClient = useQueryClient()
      const {mutate, error, isLoading} = useMutation(createReview, {
        onSuccess: () => {
            queryClient.invalidateQueries("product")
        }
      })
      const onSubmit: SubmitHandler<ReviewFormInput> = async (data) => {
        data = {... data, 
            productId: id,
            userId: "1"
        }        
        mutate(data)
        alerts({
            icon: 'success',
            title: '<strong>Reseña registrada con exito</strong>',
            html: 'Para ir al productos nuevamente presione <b><a href="/products">aqui</a></b>, ' +
            'para seguir en la pagina actual, presione el boton "Continuar"',
            confirmButtonText: 'Continuar',
            confirmButtonAriaLabel:  'Thumbs up, great!',
        })

        // router.push("/products") 
      }

    return (
        <div>
            <form 
            className="flex flex-wrap flex-col justify-between items-start m-5 bg-pwgreen-100 w-full h-64"
            onSubmit={handleSubmit(onSubmit)}
            >
                <div>
                    <label className="text-gray-900 font-Rubik text-l font-medium m-0.5">Deja tu reseña sobre este producto</label>
                    <textarea
                    placeholder="Deja tu reseña"
                    id="review"
                    className="font-Rubik text-m w-3/4 h-32 rounded-xl"
                    {...register("review", { required: true})}
                    />
                    {errors.review?.type === "required" && (
                    <p className="text-red-500 text-xs italic">
                        La reseña es obligatoria para dejar un comentario
                    </p>
                    )}
                    
                    <input
                    className="font-Rubik text-m w-2/4 h-8 rounded-xl"
                    id="rating"
                    placeholder="Puntuacion"
                    type="number"
                    {...register("rating", { required: true, min: 1, max: 5 })}
                    />
                    {(errors.rating?.type === "required" && (
                    <p className="text-red-500 text-xs italic">La puntuacion es obligatoria para dejar un comentario</p>
                    )) ||
                    (errors.rating?.type === "min" && (
                        <p className="text-red-500 text-xs italic">
                        Puntuacion debe ser mayor que 0
                        </p>
                    )) ||
                    (errors.rating?.type === "max" && (
                        <p className="text-red-500 text-xs italic">
                        Puntuacion debe ser menor o igual que 5
                        </p>
                    ))}
                </div>
                
                <button 
                type="submit"
                className="text-l font-bold rounded-lg px-1 py-1 border-2 border-pwpurple-700 text-pwpurple-700 hover:bg-pwpurple-700 hover:text-pwpurple-100 duration-300"
                >Comentar</button>
            </form>
        </div>
    )
};

export default ProductReviewForm;
