import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Signal,
} from '@angular/core';

import { UserTableService, UserTableViewModel } from './user-table.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { TableModule } from 'primeng/table';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TableModule],
  providers: [UserTableService],
  selector: 'sr-user-table',
  standalone: true,
  styleUrls: ['./user-table.component.scss'],
  templateUrl: './user-table.component.html',
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
