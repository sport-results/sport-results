import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import { SportNetworkTableService } from './sport-network-table.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SportNetworkTableService],
  selector: 'sr-sport-network-table',
  templateUrl: './sport-network-table.component.html',
  styleUrls: ['./sport-network-table.component.scss'],
})
export class SportNetworkTableComponent implements OnInit {
  private componentService = inject(SportNetworkTableService);

  public entityTableViewModel$$$ = toSignal(
    this.componentService.entityTableViewModel$
  );

  public ngOnInit(): void {
    this.componentService.init$();
  }
}
