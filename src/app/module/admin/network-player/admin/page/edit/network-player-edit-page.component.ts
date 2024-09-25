import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-network-player-edit-page',
    templateUrl: './network-player-edit-page.component.html',
    styleUrls: ['./network-player-edit-page.component.scss'],
})
export class NetworkPlayerEditPageComponent {
    @Input()
    public networkPlayerId!: string;
}
