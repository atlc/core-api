export const checkIfValid = (email: string) => {
    /* Validate either:
        - If a user is logging in with either email; if not try the username 
        - That during registration, the email at least passes some regex validation
    */
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const isEmail = emailRegex.test(email.toLocaleLowerCase());
    return isEmail;
}