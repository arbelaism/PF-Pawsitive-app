import Swal from "sweetalert2"

export const error = (message: string)=>{
    Swal.fire('Oops...', message, 'error')
}