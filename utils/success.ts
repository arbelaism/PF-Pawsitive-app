import Swal from "sweetalert2"

export const success = (title: string, message: string) =>{
    Swal.fire(title, message,'success')
}