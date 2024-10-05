import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SportEventEntity } from '@app/api/domain/sport-event';
import { CardModule } from 'primeng/card';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardModule, DatePipe],
  selector: 'sr-sport-event-card',
  standalone: true,
  styleUrl: './sport-event-card.component.scss',
  templateUrl: './sport-event-card.component.html',
})
export class SportEventCardComponent {
  @Input()
  public sportEvent?: SportEventEntity;
}
