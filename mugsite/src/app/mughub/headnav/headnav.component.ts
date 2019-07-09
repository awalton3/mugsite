import { Component, OnInit, Input, Output, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { HeadnavService } from './headnav.service';

@Component({
  selector: 'mughub-headnav',
  templateUrl: './headnav.component.html',
  styleUrls: ['./headnav.component.css']
})
export class HeadnavComponent implements OnInit, OnDestroy {

  @Input() title?: string;
  @Input() iconLeft?: string;
  @Input() iconRight?: string;
  @Input() enableIconRight?: boolean = true;

  @Output() leftIconToggled = new Subject();
  @Output() rightIconToggled = new Subject();

  constructor(private headnavService: HeadnavService) { }

  ngOnInit() {
    this.headnavService.title.subscribe(titleStr => {
      this.title = titleStr;
    });
  }

  onLeftIconToggle() {
    this.leftIconToggled.next();
  }

  onRightIconToggle() {
    if (this.enableIconRight)
      this.rightIconToggled.next();
  }

  ngOnDestroy() {
    this.headnavService.title.unsubscribe();
  }

}
