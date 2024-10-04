import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sr-sport-player-edit-page',
  templateUrl: './sport-player-edit-page.component.html',
  styleUrls: ['./sport-player-edit-page.component.scss'],
})
export class SportPlayerEditPageComponent {
  @Input()
  sportPlayerId!: string;
  @Input()
  backUrl!: string;
}
