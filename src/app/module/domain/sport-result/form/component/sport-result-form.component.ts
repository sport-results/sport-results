import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { EntityFormComponent } from '@app/core/entity';

import {SportResultFormViewModel } from './sport-result-form.models';
import { SportResultFormService } from './sport-result-form.service';

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

    public ngOnInit(): void {
        const params = this.extractAllRouteParams(this.router);

        this.userId = params['userId'];

        this.componentService.init$(this.entityId, this.userId, this.backUrl);
        this.entityFormViewModel$ = this.componentService.entityFormViewModel$;
    }
}
