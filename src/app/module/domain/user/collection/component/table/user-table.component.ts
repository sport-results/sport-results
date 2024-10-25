import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import { UserTableService } from './user-table.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UserTableService],
  selector: 'sr-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit {
  private componentService = inject(UserTableService);

  public userTableViewModel$$$ = toSignal(
    this.componentService.userTableViewModel$
  );

  public ngOnInit(): void {
    this.componentService.init$();
  }
}
