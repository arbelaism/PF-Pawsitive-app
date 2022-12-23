import Swal from 'sweetalert2'

export const alerts = ({
    title,
    text,
    icon,
    html,
    toast = false,
    confirmButtonText = 'Ok',
    showCloseButton = true,
    confirmButtonAriaLabel = 'Thumbs up, great!'
}: any) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        toast: toast,
        showCloseButton: showCloseButton,
        html: html,
        confirmButtonText: confirmButtonText,
        confirmButtonAriaLabel: confirmButtonAriaLabel,
        color: '#0f172a',
        iconColor: '#308253',
        confirmButtonColor: '#308253',
        cancelButtonColor: '#94a3b8'
    })
}

export const redirectionAlert = ({
    title,
    text,
    icon,
    html,
    toast = false,
    confirmButtonText = 'Ok',
    showCloseButton = true,
    confirmButtonAriaLabel = 'Thumbs up, great!',
    cancelButtonText = 'Cancelar',
    link
}: any) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        toast: toast,
        showCloseButton: showCloseButton,
        showCancelButton: true,
        html: html,
        confirmButtonText: confirmButtonText,
        confirmButtonAriaLabel: confirmButtonAriaLabel,
        cancelButtonText: cancelButtonText,
        color: '#0f172a',
        iconColor: '#308253',
        confirmButtonColor: '#308253',
        cancelButtonColor: '#94a3b8'
    }).then(result => {
        if (result.isConfirmed) {
            window.location.replace(link)
        }
    })
}
