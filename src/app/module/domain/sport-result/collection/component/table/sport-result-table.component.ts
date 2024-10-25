import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import { SportResultTableService } from './sport-result-table.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SportResultTableService],
  selector: 'sr-sport-result-table',
  templateUrl: './sport-result-table.component.html',
  styleUrls: ['./sport-result-table.component.scss'],
})
export class SportResultTableComponent implements OnInit {
  private componentService = inject(SportResultTableService);

  public entityTableViewModel$$$ = toSignal(
    this.componentService.entityTableViewModel$
  );

  public ngOnInit(): void {
    this.componentService.init$();
  }
}
