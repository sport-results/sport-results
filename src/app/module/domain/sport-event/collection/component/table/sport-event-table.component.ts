import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { SportEventTableService, EntityTableViewModel } from './sport-event-table.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [SportEventTableService],
	selector: 'app-sport-event-table',
	templateUrl: './sport-event-table.component.html',
	styleUrls: ['./sport-event-table.component.scss'],
})
export class SportEventTableComponent implements OnInit {
	public entityTableViewModel$!: Observable<EntityTableViewModel>;

	public constructor(private componentService: SportEventTableService) {
	}

	public ngOnInit(): void {
		this.componentService.init$();
        this.entityTableViewModel$ = this.componentService.entityTableViewModel$;
	}
}
