import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NetworkPlayerFormModule } from '@app/domain/network-player';
import { NetworkPlayerEditPageResolverService } from './network-player-edit-page-resolver.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NetworkPlayerFormModule],
  selector: 'app-network-player-edit-page',
  templateUrl: './network-player-edit-page.component.html',
  styleUrls: ['./network-player-edit-page.component.scss'],
  providers: [NetworkPlayerEditPageResolverService],
})
export class NetworkPlayerEditPageComponent {
  @Input()
  public networkPlayerId!: string;
  @Input()
  backUrl!: string;
}
