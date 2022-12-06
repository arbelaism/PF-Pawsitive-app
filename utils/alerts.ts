import Swal from "sweetalert2"

export const alerts = ({title,text, icon, html,toast = false, confirmButtonText = 'Ok' ,showCloseButton = true, confirmButtonAriaLabel = 'Thumbs up, great!'}: any) =>{
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        toast: toast,
        showCloseButton: showCloseButton,
        html: html,
        confirmButtonText: confirmButtonText,
        confirmButtonAriaLabel:  confirmButtonAriaLabel,
    })
}