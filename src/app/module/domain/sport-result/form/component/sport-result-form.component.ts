import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
  runInInjectionContext,
} from '@angular/core';
import { EntityFormComponent } from '@app/core/entity';

import { SportResultFormViewModel } from './sport-result-form.models';
import { SportResultFormService } from './sport-result-form.service';
import { SportEventEntity } from '@app/api/domain/sport-event';
import { ValidationError } from '@app/api/core/form';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SportResultFormService],
  selector: 'sr-sport-result-form',
  templateUrl: './sport-result-form.component.html',
  styleUrls: ['./sport-result-form.component.scss'],
})
export class SportResultFormComponent
  extends EntityFormComponent<SportResultFormViewModel>
  implements OnInit
{
  private componentService = inject(SportResultFormService);

  validationErrors: ValidationError[] = [
    {
      key: 'periodResult',
      value: 'Invalid value',
    },
  ];

  @Input()
  sportEvent?: SportEventEntity;

  public ngOnInit(): void {
    const params = this.extractAllRouteParams(this.router);

    this.userId = params['userId'];
    this.componentService.init$(
      this.entityId,
      this.userId,
      this.backUrl,
      this.sportEvent
    );

    runInInjectionContext(this.injector, () => {
      this.entityFormViewModel$$$ = toSignal(
        this.componentService.entityFormViewModel$
      );
    });
  }
}
