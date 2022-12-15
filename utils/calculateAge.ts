export const calculateAge = (date: string): number => {
    const today = new Date()
    const birthDate = new Date(date)
    let age: number = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }
    return age
}
