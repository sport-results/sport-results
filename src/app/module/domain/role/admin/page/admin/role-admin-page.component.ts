import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleNames } from '@app/api/common';
import { RoleStoreService } from '@app/api/domain/role';

import { RoleAdminPermissionsService } from '../../service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-role-admin-page',
    templateUrl: './role-admin-page.component.html',
    styleUrls: ['./role-admin-page.component.scss'],
})
export class RoleAdminPageComponent implements OnInit {
    public buttonPermissions: string[] = [];
    public isNewEntityButtonEnabled$!: Observable<boolean>;

    public constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private roleStoreService: RoleStoreService
    ) {}

    public clickHandler(): void {
        this.router.navigate(['edit', 0], { relativeTo: this.activatedRoute });
    }

    public ngOnInit(): void {
        this.initButtonPermissions();
        this.isNewEntityButtonEnabled$ =
            this.roleStoreService.selectNewEntityButtonEnabled$();
    }

    private initButtonPermissions(): void {
        this.buttonPermissions = [
            RoleNames.ADMIN,
            RoleAdminPermissionsService.createRoleEntity,
        ];
    }
}
