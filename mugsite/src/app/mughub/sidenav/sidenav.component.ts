import { Component, OnInit, Output, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from '../auth/user.service';
import { User } from '../auth/user.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mughub-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

export class SidenavComponent implements OnInit {

  @Output() closeNav = new Subject();
  // defaultNavLinks = ['inbox', 'uploads', 'manage', 'hour-log', 'settings'];
  defaultNavLinks = {};
  defaultNavLinksArr = [];
  selectedSublink: string = '';
  showSubLinks: boolean;
  user: User;

  screenWidth: any;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
  }

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.defaultNavLinks = {
      'mail': ['inbox', 'sent', 'drafts', 'trash'],
      'manage': [],
      'hour log': [],
      'settings': []
    }
    const userType = this.userService.getUserSession().type;
    userType === 'tutor' ? this.showSubLinks = false : this.showSubLinks = true;
    this.defaultNavLinksArr = Object.keys(this.defaultNavLinks);
    this.screenWidth = window.innerWidth;
    this.user = this.userService.getUserSession();
  }

  getIconLink(link: string): string {
    switch (link) {
      case 'mail': return 'mail';
      case 'inbox': return 'inbox';
      case 'sent': return 'send';
      case 'drafts': return 'drafts';
      case 'trash': return 'delete';
      case 'manage': return 'build';
      case 'hour log': return 'schedule';
      case 'settings': return 'settings';
    }
  }

  navigate(link: string) {
    if (link === 'mail') {
      // this.router.navigate(['mailhub/inbox'], { relativeTo: this.route });
    }
    else if (link === 'hour log') {
      this.toggleSubLinks('mail');
      this.showSubLinks = false;
    }
    else {
      this.showSubLinks = false;
      this.router.navigate([link], { relativeTo: this.route });
    }
  }

  navigateToSublink(sublink: string) {
    this.showSubLinks = false;
    this.router.navigate(['mail', sublink], { relativeTo: this.route });
  }

  toggleSubLinks(link: string) {
    if (link === 'mail')
      this.showSubLinks = !this.showSubLinks;
  }

  onClose() {
    this.closeNav.next();
  }

}
