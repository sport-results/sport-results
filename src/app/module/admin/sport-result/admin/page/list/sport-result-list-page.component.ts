import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'sr-sport-result-list-page',
    templateUrl: './sport-result-list-page.component.html',
    styleUrls: ['./sport-result-list-page.component.scss'],
})
export class SportResultListPageComponent {}
