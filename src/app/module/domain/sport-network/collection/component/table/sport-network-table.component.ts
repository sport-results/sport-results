import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { SportNetworkTableService, EntityTableViewModel } from './sport-network-table.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [SportNetworkTableService],
	selector: 'app-sport-network-table',
	templateUrl: './sport-network-table.component.html',
	styleUrls: ['./sport-network-table.component.scss'],
})
export class SportNetworkTableComponent implements OnInit {
	public entityTableViewModel$!: Observable<EntityTableViewModel>;

	public constructor(private componentService: SportNetworkTableService) {
	}

	public ngOnInit(): void {
		this.componentService.init$();
        this.entityTableViewModel$ = this.componentService.entityTableViewModel$;
	}
}
