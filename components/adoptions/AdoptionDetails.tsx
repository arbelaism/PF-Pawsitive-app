import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import styles from 'styles/AdoptionDetails.module.css'
import Image from 'next/image';
import {getPetById} from 'utils/dbFetching'
import { Props } from 'pages/adoptions';
import { useQuery } from 'react-query';
import { AiOutlineClose } from 'react-icons/ai'



export default function AdoptionDetails({id}:Props){
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const {
    data: pet,
    error,
    isLoading,
    isSuccess,
  } = useQuery(["pet", id], () => getPetById(id));

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
                  <div className={styles.contatcFormContainer}>                   
                    AQUI VA FORMULARIO DE ADOPCION: Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
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
