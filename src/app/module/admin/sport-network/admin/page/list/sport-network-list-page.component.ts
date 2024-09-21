import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-sport-network-list-page',
    templateUrl: './sport-network-list-page.component.html',
    styleUrls: ['./sport-network-list-page.component.scss'],
})
export class SportNetworkListPageComponent {}
