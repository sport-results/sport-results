import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SportEventFormModule } from '@app/domain/sport-event';

import { SportEventEditPageResolverService } from './sport-event-edit-page-resolver.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SportEventFormModule],
  selector: 'sr-sport-event-edit-page',
  templateUrl: './sport-event-edit-page.component.html',
  styleUrls: ['./sport-event-edit-page.component.scss'],
  providers: [SportEventEditPageResolverService],
})
export class SportEventEditPageComponent {
  @Input()
  public sportEventId!: string;
  @Input()
  backUrl!: string;
}
