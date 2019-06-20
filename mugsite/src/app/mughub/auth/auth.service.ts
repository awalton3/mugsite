import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({providedIn: 'root'})

export class AuthService {

  registerEndpoint = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + environment.firebaseConfig.apiKey;
  loginEndpoint = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + environment.firebaseConfig.apiKey;

  constructor(private http: HttpClient) {}

  register(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.registerEndpoint, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(errorRes => {
      return throwError(this.getErrorMessage(errorRes.error.error.message))
    }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.loginEndpoint, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(errorRes => {
      return throwError(this.getErrorMessage(errorRes.error.error.message))
    }));
  }

  getErrorMessage(errorResMessage) {
    let errorMessage = '';
    switch(errorResMessage) {
      case 'EMAIL_NOT_FOUND':
        errorMessage = "Email not found. Please create an account.";
        break;
      case 'INVALID_PASSWORD':
        errorMessage = "Incorrect password";
        break;
      case 'USER_DISABLED':
        errorMessage = "Your account is currently disabled. Please contact ---.";
        break;
      case 'EMAIL_EXISTS':
        errorMessage = "The email address is already in use by another account. Try logging in.";
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = "We have blocked all requests from this device due to unusual activity. Try again later."
        break;
      default: errorMessage = "An unknown error occurred. Please contact awalton3@nd.edu."
    }
    return errorMessage;
  }

}
