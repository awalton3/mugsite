import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({ providedIn: 'root' })

export class HeadnavService {
  title = new Subject<string>();
}
