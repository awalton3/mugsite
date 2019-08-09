import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mail-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.css']
})
export class EmptyStateComponent implements OnInit {

  @Input() icon: string;
  @Input() title: { tutor: string, student: string };
  @Input() subtitle: { tutor: string, student: string };
  @Input() userType: string;

  constructor() { }

  ngOnInit() {
  }

}
