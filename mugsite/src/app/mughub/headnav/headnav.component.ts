import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'mughub-headnav',
  templateUrl: './headnav.component.html',
  styleUrls: ['./headnav.component.css']
})
export class HeadnavComponent {

  @Input() title?: string;
  @Input() iconLeft?: string;
  @Input() iconRight?: string;
  @Input() enableIconRight?: boolean = true;

  @Output() leftIconToggled = new Subject();
  @Output() rightIconToggled = new Subject();

  ngOnInit() {
    console.log(this.enableIconRight);
  }

  constructor() { }

  onLeftIconToggle() {
    this.leftIconToggled.next();
  }

  onRightIconToggle() {
    if (this.enableIconRight)
      this.rightIconToggled.next();
  }

}
