import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { SportNetworkFormService, EntityFormViewModel } from './sport-network-form.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SportNetworkFormService],
    selector: 'app-sport-network-form',
    templateUrl: './sport-network-form.component.html',
    styleUrls: ['./sport-network-form.component.scss'],
})
export class SportNetworkFormComponent implements OnInit {
    public entityFormViewModel$!: Observable<EntityFormViewModel>;

    @Input()
    public entityId: string | undefined;

    public constructor(private componentService: SportNetworkFormService) {}

    public ngOnInit(): void {
        this.componentService.init$(this.entityId);
        this.entityFormViewModel$ = this.componentService.entityFormViewModel$;
    }
}
