import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-network-player-list-page',
    templateUrl: './network-player-list-page.component.html',
    styleUrls: ['./network-player-list-page.component.scss'],
})
export class NetworkPlayerListPageComponent {}
