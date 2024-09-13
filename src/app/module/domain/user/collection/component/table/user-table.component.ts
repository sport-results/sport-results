import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import {
    UserTableService,
    UserTableViewModel,
} from './user-table.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UserTableService],
    selector: 'app-user-table',
    templateUrl: './user-table.component.html',
    styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit {
    public userTableViewModel$!: Observable<UserTableViewModel>;

    public constructor(private componentService: UserTableService) {}

    public ngOnInit(): void {
        this.componentService.init$();
        this.userTableViewModel$ =
            this.componentService.userTableViewModel$;
    }
}
