import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';

import { SportEventCardsService } from './sport-event-cards.service';

import { NgxPermissionsModule } from 'ngx-permissions';
import { ButtonModule } from 'primeng/button';
import { AsyncPipe } from '@angular/common';

import { SportEventEntity } from '@app/api/domain/sport-event';
import { SportEventCardComponent } from '../../../view';
import { toSignal } from '@angular/core/rxjs-interop';

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
  private componentService = inject(SportEventCardsService);

  @Input()
  public sportEventsByPermissions!: SportEventEntity[];
  public entityCardViewModel$$$ = toSignal(
    this.componentService.entityCardViewModel$
  );

  public ngOnInit(): void {
    this.componentService.init$(this.sportEventsByPermissions);
  }
}
