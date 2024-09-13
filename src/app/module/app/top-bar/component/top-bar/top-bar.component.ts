import { Observable } from 'rxjs';

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { TopBarParams } from '../../api';
import { TopBarService } from './top-bar.service';
import { DropdownChangeEvent } from 'primeng/dropdown';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TopBarService],
  selector: 'sr-top-bar',
  styleUrls: ['./top-bar.component.scss'],
  templateUrl: './top-bar.component.html',
})
export class TopBarComponent implements OnInit {
  params$!: Observable<TopBarParams>;

  constructor(private componentService: TopBarService) {}

  @Input()
  title: string | null = '';

  imgClickHandler(): void {
    this.componentService.imgClickHandler();
  }

  loginClickHandler(): void {
    this.componentService.login();
  }

  logoutHandler(): void {
    this.componentService.logout();
  }

  ngOnInit(): void {
    this.params$ = this.componentService.init$();
  }

  logoClickHandler(): void {
    this.componentService.logoClickHandler();
  }
}
