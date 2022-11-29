import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from '../styles/AdoptionDetails.module.css';
import Image from 'next/image';


export default function AdoptionDetails(){
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const nombre= 'Patricio';
  const edad= '6 años';
  const categoria= 'Pony salvaje';

  return (
    <div>
      <Button onClick={handleOpen}>Adopt me!</Button>
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
                <div>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        ¡Adóptame!
                    </Typography>
                </div>
                <div>
                    <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                        {`Mi nombre es ${nombre}, soy un amable y cariñoso ${categoria} de ${edad} de edad. Busco ...
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.`}
                    </Typography>
                </div>
                <div className={styles.imgContainer}>
                    <Image src="" alt=""/>                
                </div>
                <div>
                    <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            AQUI VA FORMULARIO DE ADOPCION: Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </div>

            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}