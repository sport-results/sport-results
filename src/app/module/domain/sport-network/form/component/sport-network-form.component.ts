import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  runInInjectionContext,
} from '@angular/core';

import {
  SportNetworkFormService,
  SportNetworkFormViewModel,
} from './sport-network-form.service';
import { EntityFormComponent } from '@app/core/entity';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SportNetworkFormService],
  selector: 'sr-sport-network-form',
  templateUrl: './sport-network-form.component.html',
  styleUrls: ['./sport-network-form.component.scss'],
})
export class SportNetworkFormComponent
  extends EntityFormComponent<SportNetworkFormViewModel>
  implements OnInit
{
  private componentService = inject(SportNetworkFormService);

  public ngOnInit(): void {
    const params = this.extractAllRouteParams(this.router);

    this.userId = params['userId'];
    this.componentService.init$(this.entityId, this.userId, this.backUrl);

    runInInjectionContext(this.injector, () => {
      this.entityFormViewModel$$$ = toSignal(
        this.componentService.entityFormViewModel$
      );
    });
  }
}
