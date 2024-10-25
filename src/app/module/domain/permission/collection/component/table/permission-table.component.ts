import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { PermissionTableService } from './permission-table.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PermissionTableService],
  selector: 'app-permission-table',
  templateUrl: './permission-table.component.html',
  styleUrls: ['./permission-table.component.scss'],
})
export class PermissionTableComponent implements OnInit {
  private componentService = inject(PermissionTableService);

  public entityTableViewModel$$$ = toSignal(
    this.componentService.entityTableViewModel$
  );

  public ngOnInit(): void {
    this.componentService.init$();
  }
}
