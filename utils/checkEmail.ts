export const checkEmail = (userId: string, nickname: string): string => {
    if (/google/gi.test(userId)) {
        return `${nickname}@gmail.com`
    } else if (/auth0/gi.test(userId)) {
        return 'auth0'
    } else {
        return ''
    }
}
