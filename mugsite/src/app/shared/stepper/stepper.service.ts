import { Subject } from 'rxjs';

export class StepperService {
  onChangeStep = new Subject<{ name: string, num: number }>();
}
