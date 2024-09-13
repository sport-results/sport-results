import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-role-list-page',
    templateUrl: './role-list-page.component.html',
    styleUrls: ['./role-list-page.component.scss'],
})
export class RoleListPageComponent {}
