import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { EntityFormComponent } from '@app/core/entity';

import {SportResultFormViewModel } from './sport-result-form.models';
import { SportResultFormService } from './sport-result-form.service';
import { SportEventEntity } from '@app/api/domain/sport-event';
import { ValidationMessageDirective } from '@app/core/form';
import { ValidationError } from '@app/api/core/form';

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

    public validationErrors: ValidationError[] = [
      {
        key: 'periodResult',
        value: 'Invalid value',
      },
    ]

    @Input()
    sportEvent?: SportEventEntity;

    public ngOnInit(): void {
        const params = this.extractAllRouteParams(this.router);

        this.userId = params['userId'];

        this.componentService.init$(this.entityId, this.userId, this.backUrl, this.sportEvent);
        this.entityFormViewModel$ = this.componentService.entityFormViewModel$;
    }
}
