import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-sport-event-list-page',
    templateUrl: './sport-event-list-page.component.html',
    styleUrls: ['./sport-event-list-page.component.scss'],
})
export class SportEventListPageComponent {}
