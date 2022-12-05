import Swal from "sweetalert2"

export const alerts = (title: string, message: string, icon: any , toast:boolean = false) =>{
    Swal.fire({
        icon: icon,
        title: title,
        text: message,
        toast: toast
    })
}