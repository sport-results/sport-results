import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import { SportPlayerTableService } from './sport-player-table.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SportPlayerTableService],
  selector: 'app-sport-player-table',
  templateUrl: './sport-player-table.component.html',
  styleUrls: ['./sport-player-table.component.scss'],
})
export class SportPlayerTableComponent implements OnInit {
  private componentService = inject(SportPlayerTableService);

  public entityTableViewModel$$$ = toSignal(
    this.componentService.entityTableViewModel$
  );

  public ngOnInit(): void {
    this.componentService.init$();
  }
}
