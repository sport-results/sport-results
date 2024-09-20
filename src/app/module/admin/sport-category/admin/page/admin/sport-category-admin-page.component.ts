import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SportCategoryStoreService } from '@app/api/domain/sport-category';
import { SportCategoryAdminPermissionsService } from '@app/api/admin/sport-category';
import { RoleNames } from '@app/api/common';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'sr-sport-category-admin-page',
    templateUrl: './sport-category-admin-page.component.html',
    styleUrls: ['./sport-category-admin-page.component.scss'],
})
export class SportCategoryAdminPageComponent implements OnInit {
    public buttonPermissions: string[] = [];
    public isNewEntityButtonEnabled$!: Observable<boolean>;

    public constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private sportCategoryStoreService: SportCategoryStoreService
    ) {}

    public clickHandler(): void {
        this.router.navigate(['edit', 0], { relativeTo: this.activatedRoute });
    }

    public ngOnInit(): void {
        this.initButtonPermissions();
        this.isNewEntityButtonEnabled$ =
            this.sportCategoryStoreService.selectNewEntityButtonEnabled$();
    }

    private initButtonPermissions(): void {
        this.buttonPermissions = [
            RoleNames.ADMIN,
            SportCategoryAdminPermissionsService.createSportCategoryEntity,
        ];
    }
}
