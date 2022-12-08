import { Review } from "app/types";
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

import styles from 'styles/ProductDetail.module.css'

type Props = {
    review: Review;       
  };
  
  const ProductReviews = ({ review }: Props) => {
    
    let stars= [];
    for(let i = 0; i<5; i++){
        if(i<review.rating) stars.push(true);
        if(i>=review.rating) stars.push(false);
    }
    

    return(
        <div key={review.id} className="flex flex-row justify-between items-center m-2 bg-pwgreen-200 rounded-xl w-3/4 h-32 shadow-2xl">     
            <h2 className="text-gray-900 font-Rubik text-l font-medium m-0.5">{review.user?.firstName+" "+review.user?.lastName}</h2>
            <div className="flex flex-col items-start mr-2.5 w-3/4">                
                <p>{review.review}</p>
                <div className="flex items-center mb-2.5">
                    {stars.map((star, idx)=>{
                        if(star===true){
                            return <AiFillStar key={idx}/>
                        } 
                        if(star===false){
                            return <AiOutlineStar key={idx}/>
                        } 
                    })}
                </div>
                <div className="justify-self-center w-full">
                    <p className="text-right">{String(review.createdAt).slice(0, 10)}</p>
                </div>
            </div>
        </div>
    )
  }

  export default ProductReviews