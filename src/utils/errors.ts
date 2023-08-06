import { FirebaseError } from "firebase/app";
import { AuthErrorCodes } from "firebase/auth";


export const handleAuthError= (error: FirebaseError) => {
    switch(error.code){
        case AuthErrorCodes.USER_DELETED:
            return 'User not found';
        case  AuthErrorCodes.WEAK_PASSWORD:
            return 'Password is too weak';
        case AuthErrorCodes.INVALID_EMAIL:
            return 'Email is not valid'
        case AuthErrorCodes.EMAIL_EXISTS: 
            return "Email have been used before";
        case AuthErrorCodes.INVALID_PASSWORD:
            return 'Password is wrong';
        default:
            return 'Error'
    }
}