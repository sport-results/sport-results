import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { EntityFormComponent } from '@app/core/entity';

import { SportEventFormViewModel } from './sport-event-form.models';
import { SportEventFormService } from './sport-event-form.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SportEventFormService],
  selector: 'sr-sport-event-form',
  templateUrl: './sport-event-form.component.html',
  styleUrls: ['./sport-event-form.component.scss'],
})
export class SportEventFormComponent
  extends EntityFormComponent<SportEventFormViewModel>
  implements OnInit
{
  private componentService = inject(SportEventFormService);

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
    this.entityFormViewModel$ = this.componentService.entityFormViewModel$;
  }
}
