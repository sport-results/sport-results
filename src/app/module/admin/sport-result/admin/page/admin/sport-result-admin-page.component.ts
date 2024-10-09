import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SportResultStoreService } from '@app/api/domain/sport-result';
import { SportResultAdminPermissionsService } from '@app/api/admin/sport-result';
import { RoleNamesEnum } from '@app/api/common';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'sr-sport-result-admin-page',
    templateUrl: './sport-result-admin-page.component.html',
    styleUrls: ['./sport-result-admin-page.component.scss'],
})
export class SportResultAdminPageComponent implements OnInit {
    public buttonPermissions: string[] = [];
    public isNewEntityButtonEnabled$!: Observable<boolean>;

    public constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private sportResultStoreService: SportResultStoreService
    ) {}

    public clickHandler(): void {
        this.router.navigate(['edit', 0], { relativeTo: this.activatedRoute });
    }

    public ngOnInit(): void {
        this.initButtonPermissions();
        this.isNewEntityButtonEnabled$ =
            this.sportResultStoreService.selectNewEntityButtonEnabled$();
    }

    private initButtonPermissions(): void {
        this.buttonPermissions = [
            RoleNamesEnum.ADMIN,
            SportResultAdminPermissionsService.createSportResultEntity,
        ];
    }
}
