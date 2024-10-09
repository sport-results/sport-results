import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { SportResultTableService, EntityTableViewModel } from './sport-result-table.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [SportResultTableService],
	selector: 'sr-sport-result-table',
	templateUrl: './sport-result-table.component.html',
	styleUrls: ['./sport-result-table.component.scss'],
})
export class SportResultTableComponent implements OnInit {
	public entityTableViewModel$!: Observable<EntityTableViewModel>;

	public constructor(private componentService: SportResultTableService) {
	}

	public ngOnInit(): void {
		this.componentService.init$();
        this.entityTableViewModel$ = this.componentService.entityTableViewModel$;
	}
}
