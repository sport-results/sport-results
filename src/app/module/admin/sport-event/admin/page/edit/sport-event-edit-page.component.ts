import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-sport-event-edit-page',
    templateUrl: './sport-event-edit-page.component.html',
    styleUrls: ['./sport-event-edit-page.component.scss'],
})
export class SportEventEditPageComponent {
    @Input()
    public sportEventId!: string;
}
