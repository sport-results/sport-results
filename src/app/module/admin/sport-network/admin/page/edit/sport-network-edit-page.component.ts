import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sr-sport-network-edit-page',
  templateUrl: './sport-network-edit-page.component.html',
  styleUrls: ['./sport-network-edit-page.component.scss'],
})
export class SportNetworkEditPageComponent {
  @Input()
  sportNetworkId!: string;
  @Input()
  backUrl!: string;
}
