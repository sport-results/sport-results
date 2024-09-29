import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { SportEventTableService, EntityTableViewModel } from './sport-event-table.service';
import { TableModule } from 'primeng/table';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ButtonModule } from 'primeng/button';
import { AsyncPipe } from '@angular/common';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, ButtonModule, NgxPermissionsModule, TableModule],
	providers: [SportEventTableService],
	selector: 'app-sport-event-table',
	templateUrl: './sport-event-table.component.html',
  standalone: true,
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
