import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import {
  SportNetworkFormService,
  SportNetworkFormViewModel,
} from './sport-network-form.service';
import { EntityFormComponent } from '@app/core/entity';

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
    this.entityFormViewModel$ = this.componentService.entityFormViewModel$;
  }
}
