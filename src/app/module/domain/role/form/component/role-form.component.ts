import { Observable } from 'rxjs';


import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';

import { RoleFormService, RoleFormViewModel } from './role-form.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [RoleFormService],
    selector: 'sr-role-form',
    templateUrl: './role-form.component.html',
    styleUrls: ['./role-form.component.scss'],
})
export class RoleFormComponent implements OnInit {
    public roleFormViewModel$!: Observable<RoleFormViewModel>;

    @Input()
    public roleId: string | undefined;

    public constructor(private componentService: RoleFormService) {}

    public ngOnInit(): void {
        this.componentService.init(this.roleId);
        this.roleFormViewModel$ = this.componentService.roleFormViewModel$;
    }
}
