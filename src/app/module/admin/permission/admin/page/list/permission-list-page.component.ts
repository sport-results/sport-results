import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-permission-list-page',
    templateUrl: './permission-list-page.component.html',
    styleUrls: ['./permission-list-page.component.scss'],
})
export class PermissionListPageComponent {}
