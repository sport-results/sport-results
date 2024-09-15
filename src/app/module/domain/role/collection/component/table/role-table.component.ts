import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { RoleTableService, RoleTableViewModel } from './role-table.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [RoleTableService],
    selector: 'sr-role-table',
    templateUrl: './role-table.component.html',
    styleUrls: ['./role-table.component.scss'],
})
export class RoleTableComponent implements OnInit {
    public roleTableViewModel$!: Observable<RoleTableViewModel>;

    public constructor(private componentService: RoleTableService) {}

    public ngOnInit(): void {
        this.componentService.init$();
        this.roleTableViewModel$ = this.componentService.roleTableViewModel$;
    }
}
