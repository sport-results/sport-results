import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { PermissionTableService, EntityTableViewModel } from './permission-table.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [PermissionTableService],
	selector: 'app-permission-table',
	templateUrl: './permission-table.component.html',
	styleUrls: ['./permission-table.component.scss'],
})
export class PermissionTableComponent implements OnInit {
	public entityTableViewModel$!: Observable<EntityTableViewModel>;

	public constructor(private componentService: PermissionTableService) {
	}

	public ngOnInit(): void {
		this.componentService.init$();
        this.entityTableViewModel$ = this.componentService.entityTableViewModel$;
	}
}
