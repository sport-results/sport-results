import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import { AdminPageService } from './admin-page.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AdminPageService],
  selector: 'sr-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  private componentService = inject(AdminPageService);

  public adminPageViewModel$$$ = toSignal(
    this.componentService.adminPageViewModel$
  );

  public ngOnInit(): void {
    this.componentService.init$();
  }
}
