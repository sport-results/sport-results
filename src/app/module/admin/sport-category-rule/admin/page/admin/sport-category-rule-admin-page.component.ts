import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SportCategoryRuleStoreService } from '@app/api/domain/sport-category-rule';
import { SportCategoryRuleAdminPermissionsService } from '@app/api/admin/sport-category-rule';
import { RoleNamesEnum } from '@app/api/common';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'sr-sport-category-rule-admin-page',
    templateUrl: './sport-category-rule-admin-page.component.html',
    styleUrls: ['./sport-category-rule-admin-page.component.scss'],
})
export class SportCategoryRuleAdminPageComponent implements OnInit {
    public buttonPermissions: string[] = [];
    public isNewEntityButtonEnabled$!: Observable<boolean>;

    public constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private sportCategoryRuleStoreService: SportCategoryRuleStoreService
    ) {}

    public clickHandler(): void {
        this.router.navigate(['edit', 0], { relativeTo: this.activatedRoute });
    }

    public ngOnInit(): void {
        this.initButtonPermissions();
        this.isNewEntityButtonEnabled$ =
            this.sportCategoryRuleStoreService.selectNewEntityButtonEnabled$();
    }

    private initButtonPermissions(): void {
        this.buttonPermissions = [
          RoleNamesEnum.ADMIN,
            SportCategoryRuleAdminPermissionsService.createSportCategoryRuleEntity,
        ];
    }
}
