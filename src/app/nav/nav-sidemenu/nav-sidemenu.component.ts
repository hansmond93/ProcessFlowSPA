import { Component, OnInit } from '@angular/core';
import { NavItem } from 'src/app/_models/side-nav-item';

@Component({
  selector: 'app-nav-sidemenu',
  templateUrl: './nav-sidemenu.component.html',
  styleUrls: ['./nav-sidemenu.component.css']
})
export class NavSidemenuComponent implements OnInit {
  menuChild: any;
  currentNav: any = null;

  items: string[] = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  ];

  navItems: NavItem[] = [
    {
      displayName: 'Setup',
      iconName: 'fa fa-analytics',
      children: [
        {
          displayName: 'Approval Setup',
          route: '',
        },
        {
          displayName: 'Pending Setup',
          route: '',
        }
      ]
    },
    {
      displayName: 'Approval',
      iconName: 'fa fa-address-book',
      children: [
        {
          displayName: 'Project Approval',
          route: ''
        },
      ]
    },
    {
      displayName: 'Operations',
      iconName: 'fa fa-address-book',
      children: [
        {
          displayName: 'Project',
          route: '/project'
        },
      ]
    }

  ]
  constructor() { }

  ngOnInit(): void {
    this.navItems = this.navItems.filter(x => x);
  }

  trigger(nav: any) {

    event.preventDefault();
    if(this.currentNav === nav) {
      this.menuChild = null;
      this.currentNav = null;
    }
    else {
      this.currentNav = nav;
      var filter = this.navItems.filter(x => x.displayName === nav.displayName)
      this.menuChild = filter[0];
    }
    
  }

}
