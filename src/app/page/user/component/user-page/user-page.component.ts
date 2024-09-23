import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sr-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent {
  private route = inject(ActivatedRoute); 
  @Input()
  userId: string;

  constructor() {
    this.userId = this.route.snapshot.params['userId'];
    console.log(this.userId);
  }
}
