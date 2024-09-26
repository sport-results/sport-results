import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'sr-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent {
  private route = inject(ActivatedRoute);

  @Input()
  userId: string;

  menuItems: MenuItem[] = [];

  constructor() {
    this.userId = this.route.snapshot.params['userId'];
  }

  ngOnInit(): void {
    this.menuItems.push({
      label: 'Profile',
      routerLink: './profile',
      tabindex: '1',
    });
  }
}
