import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import { SportEventTableService } from './sport-event-table.service';
import { TableModule } from 'primeng/table';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ButtonModule } from 'primeng/button';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, ButtonModule, NgxPermissionsModule, TableModule],
  providers: [SportEventTableService],
  selector: 'app-sport-event-table',
  templateUrl: './sport-event-table.component.html',
  standalone: true,
  styleUrls: ['./sport-event-table.component.scss'],
})
export class SportEventTableComponent implements OnInit {
  private componentService = inject(SportEventTableService);

  public entityTableViewModel$$$ = toSignal(
    this.componentService.entityTableViewModel$
  );

  public ngOnInit(): void {
    this.componentService.init$();
  }
}
