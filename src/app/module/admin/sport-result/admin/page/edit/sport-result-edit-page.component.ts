import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'sr-sport-result-edit-page',
    templateUrl: './sport-result-edit-page.component.html',
    styleUrls: ['./sport-result-edit-page.component.scss'],
})
export class SportResultEditPageComponent {
    @Input()
    public sportResultId!: string;
    @Input()
    backUrl!: string;
}
