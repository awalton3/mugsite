import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WelcomeService {
  onNav = new Subject<{ comp: string, action: string }>();
  newUserInfo: { photoUrl: string, name: string } = { photoUrl: null, name: null }
}
