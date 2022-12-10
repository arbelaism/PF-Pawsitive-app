import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import styles from 'styles/AdoptionDetails.module.css'
import Image from 'next/image';
import {getPetById} from 'utils/dbFetching'
import { Props } from 'pages/adoptions';
import { useQuery, useQueryClient } from 'react-query';
import { AiOutlineClose } from 'react-icons/ai';
import Link from 'next/link'



export default function AdoptionDetails({id}:Props){
  
  const [open, setOpen] = React.useState(false);
  const handleClose = () =>setOpen(false);

  const {
    data: pet,
    error,
    isLoading,
    isSuccess,
  } = useQuery(["pet", id], () => getPetById(id));

  const queryClient = useQueryClient();
    

  const handleOpen = () => {
    console.log(id)
    console.log(queryClient.getQueryData(["pet", id]));
    setOpen(true)
  };   
  
  

  return (
    <div>
      <button onClick={handleOpen} className={styles.button}>Adopt me!</button>
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
            <div className={styles.containerDetails}>
                {isLoading ? <h1>Loading...</h1>
                : 
                  <>
                  <div className={styles.headerContainer}>
                    <div className={styles.titleContainer}>                    
                      <h1>¡Adopt me!</h1>                   
                    </div>
                    <div className={styles.buttonContainer}>
                      <button onClick={handleClose}><AiOutlineClose/></button>
                    </div>
                  </div>
                  <div className={styles.descriptionContainer}>
                    <p>
                    My name is <span>{pet.name}</span>, Im a very kind and friendly <span>{pet.breed}</span>. Im <span>{pet.age}</span>. 
                    Im looking for my dreamed home (family), somebody who can love me and take care of me.
                    </p>
                  </div>
                  <div className={styles.imgContainer}>
                    <Image src={pet.photo} alt={`Adopt me: ${pet.name}`} layout="fill"/>                
                  </div>
                  <div className='text-center pt-5'>
                    <Link href="/adoptions/apply">
                        <button className="font-Rubik text-l font-bold rounded-lg px-1 py-1 border-2 border-pwpurple-700 text-pwpurple-700 hover:bg-pwpurple-700 hover:text-pwpurple-100 duration-300">
                            ¡Adoptar!
                        </button>
                    </Link>
                  </div>
                  </>
                }
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
