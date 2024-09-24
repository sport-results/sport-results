import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-sport-player-list-page',
    templateUrl: './sport-player-list-page.component.html',
    styleUrls: ['./sport-player-list-page.component.scss'],
})
export class SportPlayerListPageComponent {}
