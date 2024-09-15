import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { SportCategoryTableService, EntityTableViewModel } from './sport-category-table.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [SportCategoryTableService],
	selector: 'app-sport-category-table',
	templateUrl: './sport-category-table.component.html',
	styleUrls: ['./sport-category-table.component.scss'],
})
export class SportCategoryTableComponent implements OnInit {
	public entityTableViewModel$!: Observable<EntityTableViewModel>;

	public constructor(private componentService: SportCategoryTableService) {
	}

	public ngOnInit(): void {
		this.componentService.init$();
        this.entityTableViewModel$ = this.componentService.entityTableViewModel$;
	}
}
