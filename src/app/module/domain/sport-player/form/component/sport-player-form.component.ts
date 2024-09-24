import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { SportPlayerFormService, EntityFormViewModel } from './sport-player-form.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SportPlayerFormService],
    selector: 'app-sport-player-form',
    templateUrl: './sport-player-form.component.html',
    styleUrls: ['./sport-player-form.component.scss'],
})
export class SportPlayerFormComponent implements OnInit {
    public entityFormViewModel$!: Observable<EntityFormViewModel>;

    @Input()
    public entityId: string | undefined;

    public constructor(private componentService: SportPlayerFormService) {}

    public ngOnInit(): void {
        this.componentService.init$(this.entityId);
        this.entityFormViewModel$ = this.componentService.entityFormViewModel$;
    }
}
