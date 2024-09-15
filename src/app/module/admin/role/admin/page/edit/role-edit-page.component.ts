import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'sr-role-edit-page',
    templateUrl: './role-edit-page.component.html',
    styleUrls: ['./role-edit-page.component.scss'],
})
export class RoleEditPageComponent {
    @Input()
    public roleId!: string;
}
