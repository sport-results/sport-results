import { Observable } from 'rxjs';

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

import {
  SportEventCardsService,
  EntityCardsViewModel,
} from './sport-event-cards.service';

import { NgxPermissionsModule } from 'ngx-permissions';
import { ButtonModule } from 'primeng/button';
import { AsyncPipe, DatePipe } from '@angular/common';

import { SportEventEntity } from '@app/api/domain/sport-event';
import { SportEventCardComponent } from '../../../view';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    ButtonModule,
    NgxPermissionsModule,
    SportEventCardComponent,
  ],
  providers: [SportEventCardsService],
  selector: 'sr-sport-event-cards-collection',
  templateUrl: './sport-event-cards.component.html',
  standalone: true,
  styleUrls: ['./sport-event-cards.component.scss'],
})
export class SportEventCardsComponent implements OnInit {
  @Input()
  public sportEventsByPermissions!: SportEventEntity[];
  public entityCardViewModel$!: Observable<EntityCardsViewModel>;

  public constructor(private componentService: SportEventCardsService) {}

  public ngOnInit(): void {
    this.componentService.init$(this.sportEventsByPermissions);
    this.entityCardViewModel$ = this.componentService.entityCardViewModel$;
  }
}
