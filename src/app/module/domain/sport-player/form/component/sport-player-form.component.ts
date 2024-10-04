import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import {
  SportPlayerFormService,
  SportPlayerFormViewModel,
} from './sport-player-form.service';
import { EntityFormComponent } from '@app/core/entity';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SportPlayerFormService],
  selector: 'sr-sport-player-form',
  templateUrl: './sport-player-form.component.html',
  styleUrls: ['./sport-player-form.component.scss'],
})
export class SportPlayerFormComponent
  extends EntityFormComponent<SportPlayerFormViewModel>
  implements OnInit
{
  private componentService = inject(SportPlayerFormService);

  public ngOnInit(): void {
    const params = this.extractAllRouteParams(this.router);

    this.userId = params['userId'];
    this.componentService.init$(this.entityId, this.userId, this.backUrl);
    this.entityFormViewModel$ = this.componentService.entityFormViewModel$;
  }
}
