import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { SportPlayerTableService, EntityTableViewModel } from './sport-player-table.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [SportPlayerTableService],
	selector: 'app-sport-player-table',
	templateUrl: './sport-player-table.component.html',
	styleUrls: ['./sport-player-table.component.scss'],
})
export class SportPlayerTableComponent implements OnInit {
	public entityTableViewModel$!: Observable<EntityTableViewModel>;

	public constructor(private componentService: SportPlayerTableService) {
	}

	public ngOnInit(): void {
		this.componentService.init$();
        this.entityTableViewModel$ = this.componentService.entityTableViewModel$;
	}
}
