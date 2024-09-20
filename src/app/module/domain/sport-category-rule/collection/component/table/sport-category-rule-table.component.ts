import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { SportCategoryRuleTableService, EntityTableViewModel } from './sport-category-rule-table.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [SportCategoryRuleTableService],
	selector: 'sr-sport-category-rule-table',
	templateUrl: './sport-category-rule-table.component.html',
	styleUrls: ['./sport-category-rule-table.component.scss'],
})
export class SportCategoryRuleTableComponent implements OnInit {
	@Input()
	sportCategoryId!: string;

	public entityTableViewModel$!: Observable<EntityTableViewModel>;

	public constructor(private componentService: SportCategoryRuleTableService) {
	}

	public ngOnInit(): void {
		this.componentService.init$(this.sportCategoryId);
        this.entityTableViewModel$ = this.componentService.entityTableViewModel$;
	}
}
