import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { SportEventCardService, EntityCardViewModel } from './sport-event-card.service';
import { TableModule } from 'primeng/table';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ButtonModule } from 'primeng/button';
import { AsyncPipe, DatePipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { SportEventEntity } from '@app/api/domain/sport-event';

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
  @Input()
  public sportEventsByPermissions!: SportEventEntity[];
	public entityCardViewModel$!: Observable<EntityCardViewModel>;

	public constructor(private componentService: SportEventCardService) {
	}

	public ngOnInit(): void {
		this.componentService.init$(this.sportEventsByPermissions);
        this.entityCardViewModel$ = this.componentService.entityCardViewModel$;
	}
}
