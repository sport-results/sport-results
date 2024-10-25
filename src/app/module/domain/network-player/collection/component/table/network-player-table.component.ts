import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import { NetworkPlayerTableService } from './network-player-table.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NetworkPlayerTableService],
  selector: 'sr-network-player-table',
  templateUrl: './network-player-table.component.html',
  styleUrls: ['./network-player-table.component.scss'],
})
export class NetworkPlayerTableComponent implements OnInit {
  private componentService = inject(NetworkPlayerTableService);

  public entityTableViewModel$$$ = toSignal(
    this.componentService.entityTableViewModel$
  );

  public ngOnInit(): void {
    this.componentService.init$();
  }
}
