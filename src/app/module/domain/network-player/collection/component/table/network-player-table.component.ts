import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { NetworkPlayerTableService, EntityTableViewModel } from './network-player-table.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [NetworkPlayerTableService],
	selector: 'app-network-player-table',
	templateUrl: './network-player-table.component.html',
	styleUrls: ['./network-player-table.component.scss'],
})
export class NetworkPlayerTableComponent implements OnInit {
	public entityTableViewModel$!: Observable<EntityTableViewModel>;

	public constructor(private componentService: NetworkPlayerTableService) {
	}

	public ngOnInit(): void {
		this.componentService.init$();
        this.entityTableViewModel$ = this.componentService.entityTableViewModel$;
	}
}
