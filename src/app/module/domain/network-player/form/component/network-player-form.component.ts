import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { NetworkPlayerFormService, EntityFormViewModel } from './network-player-form.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [NetworkPlayerFormService],
    selector: 'app-network-player-form',
    templateUrl: './network-player-form.component.html',
    styleUrls: ['./network-player-form.component.scss'],
})
export class NetworkPlayerFormComponent implements OnInit {
    public entityFormViewModel$!: Observable<EntityFormViewModel>;

    @Input()
    public entityId: string | undefined;

    public constructor(private componentService: NetworkPlayerFormService) {}

    public ngOnInit(): void {
        this.componentService.init$(this.entityId);
        this.entityFormViewModel$ = this.componentService.entityFormViewModel$;
    }
}
