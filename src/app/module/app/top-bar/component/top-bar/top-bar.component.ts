import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';

import { TopBarService } from './top-bar.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TopBarService],
  selector: 'sr-top-bar',
  styleUrls: ['./top-bar.component.scss'],
  templateUrl: './top-bar.component.html',
})
export class TopBarComponent {
  private componentService = inject(TopBarService);
  params$$$ = toSignal(this.componentService.init$());

  @Input()
  title: string = '';

  imgClickHandler(): void {
    this.componentService.imgClickHandler();
  }

  loginClickHandler(): void {
    this.componentService.login();
  }

  logoutHandler(): void {
    this.componentService.logout();
  }

  logoClickHandler(): void {
    this.componentService.logoClickHandler();
  }
}
