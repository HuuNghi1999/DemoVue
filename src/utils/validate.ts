import * as Regex from './contanst/regex'

export function validateEmail(email: string){
    return Regex.regexEmail.test(email)
}

export function validatePassword(password: string) {
	return Regex.regexPassword.test(password);
}
