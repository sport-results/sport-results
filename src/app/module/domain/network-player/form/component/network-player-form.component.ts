import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
  runInInjectionContext,
} from '@angular/core';

import {
  NetworkPlayerFormService,
  NetworkPlayerFormViewModel,
} from './network-player-form.service';
import { EntityFormComponent } from '@app/core/entity';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NetworkPlayerFormService],
  selector: 'sr-network-player-form',
  templateUrl: './network-player-form.component.html',
  styleUrls: ['./network-player-form.component.scss'],
})
export class NetworkPlayerFormComponent
  extends EntityFormComponent<NetworkPlayerFormViewModel>
  implements OnInit
{
  private componentService = inject(NetworkPlayerFormService);

  @Input()
  public sportNetworkId: string | undefined;

  public ngOnInit(): void {
    const params = this.extractAllRouteParams(this.router);

    this.userId = params['userId'];
    this.sportNetworkId = params['sportNetworkId'];

    this.componentService.init$(
      this.entityId,
      this.sportNetworkId,
      this.userId,
      this.backUrl
    );
    runInInjectionContext(this.injector, () => {
      this.entityFormViewModel$$$ = toSignal(this.componentService.entityFormViewModel$);
    });
  }
}
