import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { SportEventCardService, EntityCardViewModel } from './sport-event-card.service';
import { TableModule } from 'primeng/table';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ButtonModule } from 'primeng/button';
import { AsyncPipe, DatePipe } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, DatePipe, ButtonModule, NgxPermissionsModule, TableModule, CardModule],
	providers: [SportEventCardService],
	selector: 'sr-sport-event-card-collection',
	templateUrl: './sport-event-card.component.html',
  standalone: true,
	styleUrls: ['./sport-event-card.component.scss'],
})
export class SportEventCardComponent implements OnInit {
	public entityCardViewModel$!: Observable<EntityCardViewModel>;

	public constructor(private componentService: SportEventCardService) {
	}

	public ngOnInit(): void {
		this.componentService.init$();
        this.entityCardViewModel$ = this.componentService.entityCardViewModel$;
	}
}
