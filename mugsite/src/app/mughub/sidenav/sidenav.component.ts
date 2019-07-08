import { Component, OnInit, Output, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from '../auth/user.service';
import { User } from '../auth/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'mughub-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

export class SidenavComponent implements OnInit {

  @Output() navDest = new Subject<string>();
  @Output() closeNav = new Subject();
  user: User;

  screenWidth: any;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
  }

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.userService.getUserSession();
  }

  onNav(destination: string) {
    this.navDest.next(destination);
    this.router.navigate(['mughub/tutor', destination])
  }

  onClose() {
    this.closeNav.next();
  }

}
