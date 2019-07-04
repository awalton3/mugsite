import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class WelcomeService {
  newUserInfo: { photoUrl: string, name: string } = { photoUrl: null, name: null }
}
