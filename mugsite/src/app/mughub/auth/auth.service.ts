import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  registerEndpoint: string = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAMtxK1CsD3dJbKPh-09PcF3fXmxsxz2Bo'

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
