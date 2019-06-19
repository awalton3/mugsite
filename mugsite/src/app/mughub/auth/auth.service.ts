import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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

  registerEndpoint: string = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + environment.firebaseConfig.apiKey;

  constructor(private http: HttpClient) {}

  register(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.registerEndpoint, {
      email: email,
      password: password,
      returnSecureToken: true
    })
  }

  // login(email: string, password: string) {
  //
  // }

}
