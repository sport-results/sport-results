import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { SportEventFormService, EntityFormViewModel } from './sport-event-form.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SportEventFormService],
    selector: 'app-sport-event-form',
    templateUrl: './sport-event-form.component.html',
    styleUrls: ['./sport-event-form.component.scss'],
})
export class SportEventFormComponent implements OnInit {
    public entityFormViewModel$!: Observable<EntityFormViewModel>;

    @Input()
    public entityId: string | undefined;

    public constructor(private componentService: SportEventFormService) {}

    public ngOnInit(): void {
        this.componentService.init$(this.entityId);
        this.entityFormViewModel$ = this.componentService.entityFormViewModel$;
    }
}
