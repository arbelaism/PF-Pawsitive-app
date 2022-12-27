import Swal from 'sweetalert2'

export const alerts = ({
    title,
    text,
    icon,
    html,
    toast = false,
    showConfirmButton = true,
    confirmButtonText = 'Ok',
    showCloseButton = true,
    confirmButtonAriaLabel = 'Thumbs up, great!',
    timer
}: any) => {
    let color: string = '#308253'
    switch (icon) {
        case 'info':
            color = '#3ea76a'
            break
        case 'warning':
            color = '#5d2344'
            break
        case 'error':
            color = '#381529'
            break
        default:
            color = '#308253'
            break
    }

    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        toast: toast,
        showConfirmButton: showConfirmButton,
        showCloseButton: showCloseButton,
        html: html,
        confirmButtonText: confirmButtonText,
        confirmButtonAriaLabel: confirmButtonAriaLabel,
        color: '#0f172a',
        iconColor: color,
        confirmButtonColor: '#308253',
        cancelButtonColor: '#94a3b8',
        timer: timer
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
    showCancelButton = false,
    allowOutsideClick = false,
    allowEscapeKey = false,
    link
}: any) => {
    let color: string = '#308253'
    switch (icon) {
        case 'info':
            color = '#3ea76a'
            break
        case 'warning':
            color = '#5d2344'
            break
        case 'error':
            color = '#381529'
            break
        default:
            color = '#308253'
            break
    }
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        toast: toast,
        showCloseButton: showCloseButton,
        showCancelButton: showCancelButton,
        html: html,
        confirmButtonText: confirmButtonText,
        confirmButtonAriaLabel: confirmButtonAriaLabel,
        cancelButtonText: cancelButtonText,
        color: '#0f172a',
        iconColor: color,
        confirmButtonColor: '#308253',
        cancelButtonColor: '#94a3b8',
        allowOutsideClick: allowOutsideClick,
        allowEscapeKey: allowEscapeKey
    }).then(result => {
        if (result.isConfirmed) {
            window.location.replace(link)
        }
    })
}
