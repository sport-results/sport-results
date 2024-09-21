import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-sport-network-edit-page',
    templateUrl: './sport-network-edit-page.component.html',
    styleUrls: ['./sport-network-edit-page.component.scss'],
})
export class SportNetworkEditPageComponent {
    @Input()
    public sportNetworkId!: string;
}
