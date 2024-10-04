import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';

import {
  SportEventFormService,
  SportEventFormViewModel,
} from './sport-event-form.service';
import { EntityFormComponent } from '@app/core/entity';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SportEventFormService],
  selector: 'app-sport-event-form',
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
