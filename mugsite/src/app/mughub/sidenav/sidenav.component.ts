import { Component, OnInit, Output, HostListener, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { UserService } from '../auth/user.service';
import { User } from '../auth/user.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mughub-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

export class SidenavComponent implements OnInit, OnDestroy {

  private subs = new Subscription();
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
    this.user = this.userService.getUserSession();
    this.listenForUser();
    this.getDefaultNavLinks();
    this.defaultNavLinksArr = Object.keys(this.defaultNavLinks);
    this.screenWidth = window.innerWidth;
  }

  listenForUser() {
    this.subs.add(this.userService.user.subscribe(user => {
      this.user = user;
    }))
  }

  getDefaultNavLinks() {
    if (this.user.type === 'tutor') {
      this.defaultNavLinks = {
        'mail': ['inbox', 'sent', 'drafts', 'trash'],
        'manage': [],
        'hour log': [],
        'settings': []
      }
      this.showSubLinks = false
    } else {
      this.defaultNavLinks = {
        'mail': ['inbox', 'sent', 'drafts', 'trash'],
        'settings': []
      }
      this.showSubLinks = true
    }
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
      this.router.navigate(['hour-log'], { relativeTo: this.route });
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

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
