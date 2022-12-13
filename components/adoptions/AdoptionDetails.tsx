import * as React from 'react';
import {useState} from 'react';
import {NextComponentType} from 'next';
import useLocalStorage from 'use-local-storage';
import { useUser } from "@auth0/nextjs-auth0/client";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import styles from 'styles/AdoptionDetails.module.css'
import Image from 'next/image';
import {getPetById} from 'utils/dbFetching'
import { Props } from 'pages/adoptions';
import { Apply } from 'app/types';
import { useQuery } from 'react-query';
import { AiOutlineClose, AiOutlineArrowRight } from 'react-icons/ai';
import Link from 'next/link'

type Prop = {
  id: string
}

const AdoptionDetails = ({id}:Prop)=>{
  
  const [ids, setIds] = useLocalStorage<Apply>("ids", {petId: "", userId:""});
  const [open, setOpen] = useState(false);
  const handleClose = () =>setOpen(false);

  const { user, error: err, isLoading: loading } = useUser();
  
  const {
    data: pet,
    error,
    isLoading,
    isSuccess,
  } = useQuery(["pet", id], () => getPetById(id));


//De momento se usa un USERID hardcodeado, hasta que se modifique el model correspondiente a los usuarios. Arriba, se ve como se accede
//user que se necesita.
  const handleOpen = () => {
    
      const idToString: string = id.toString();
      const data = {
        petId: idToString,
        userId: "2"
      };
      setIds(data);
      setOpen(true);
      
  }; 
  

  return (
    <>
    <button onClick={handleOpen}>Adopt me!</button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box className={styles.container}>
            <div className='w-full h-full'>
                {isLoading ? <h1>Loading...</h1>
                : 
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md">

                  <div className='flex flex-row justify-end px-5 pt-2 text-lg'>
                    <button onClick={handleClose}>
                      <AiOutlineClose/>
                    </button>
                  </div>

                  <div className="px-5 mt-2 w-full flex flex-row justify-center items-center">
                    <div>
                      <Image 
                        src={pet.photo} 
                        alt={`Adopt me: ${pet.name}`} 
                        width={150}
                        height={150}
                        className="rounded-full"
                      />
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h5 className="capitalize mb-2 text-2xl font-Rubik font-bold tracking-tight text-gray-900">
                      {pet.name}
                    </h5>
                    <p className="mb-3 font-Rubik text-gray-700">
                      Mi nombre es <span className='capitalize font-bold'>{pet.name}</span>.
                      Soy un cariñoso y amoroso {pet.breed}, tengo {pet.age} y me encuentro buscando
                      mi hogar soñado, una familia que me dé todo el amor del mundo y cuide de mi...
                      Si deseas adoptarme, por favor presiona el botón "¡Adóptame!" y el <span className='font-bold'>Pawsitive Team </span>
                      se contactará contigo.

                    </p>
                      <div className='flex flex-row justify-center items-center'>
                        <Link href="/adoptions/apply">
                          <div className="cursor-pointer w-1/2 font-Rubik text-lg rounded-lg px-1 py-1 border-2 border-pwpurple-600 bg-pwpurple-600 text-white hover:bg-white hover:text-pwgreen-600 hover:border-pwgreen-600 duration-300 flex flex-row justify-center items-center">
                            <div>
                              ¡Adóptame!
                            </div>
                            <div>
                              <AiOutlineArrowRight className="text-lg pl-1"/>
                            </div>
                          </div>
                        </Link>
                      </div>
                  </div>
          </div>
                  
                }
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};
export default AdoptionDetails;
