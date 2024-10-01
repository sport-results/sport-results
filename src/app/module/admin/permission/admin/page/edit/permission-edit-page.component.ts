import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-permission-edit-page',
    templateUrl: './permission-edit-page.component.html',
    styleUrls: ['./permission-edit-page.component.scss'],
})
export class PermissionEditPageComponent {
    @Input()
    public permissionId!: string;
}
