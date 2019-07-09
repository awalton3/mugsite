import { Component, OnInit, Output, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from '../auth/user.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'mughub-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

export class SidenavComponent implements OnInit {

  @Output() closeNav = new Subject();
  defaultNavLinks = ['inbox', 'uploads', 'manage', 'hour log', 'settings']
  user: User;

  screenWidth: any;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
  }

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getUserSession();
  }

  onClose() {
    this.closeNav.next();
  }

}
