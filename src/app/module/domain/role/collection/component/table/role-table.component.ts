import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import { RoleTableService } from './role-table.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RoleTableService],
  selector: 'sr-role-table',
  templateUrl: './role-table.component.html',
  styleUrls: ['./role-table.component.scss'],
})
export class RoleTableComponent implements OnInit {
  private componentService = inject(RoleTableService);

  public roleTableViewModel$$$ = toSignal(
    this.componentService.roleTableViewModel$
  );

  public ngOnInit(): void {
    this.componentService.init$();
  }
}
