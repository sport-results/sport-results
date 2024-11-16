import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { UserTableStore } from './user-table.store';
import { TableModule } from 'primeng/table';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ButtonModule } from 'primeng/button';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonModule, TableModule, NgxPermissionsModule],
  providers: [UserTableStore],
  selector: 'sr-user-table',
  standalone: true,
  styleUrls: ['./user-table.component.scss'],
  templateUrl: './user-table.component.html',
})
export class UserTableComponent {
  public componentStore = inject(UserTableStore);
}
