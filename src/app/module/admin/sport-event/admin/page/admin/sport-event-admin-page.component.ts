import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SportEventStoreService } from '@app/api/domain/sport-event';
import { SportEventAdminPermissionsService } from '@app/api/admin/sport-event';
import { RoleNames } from '@app/api/common';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-sport-event-admin-page',
    templateUrl: './sport-event-admin-page.component.html',
    styleUrls: ['./sport-event-admin-page.component.scss'],
})
export class SportEventAdminPageComponent implements OnInit {
    public buttonPermissions: string[] = [];
    public isNewEntityButtonEnabled$!: Observable<boolean>;

    public constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private sportEventStoreService: SportEventStoreService
    ) {}

    public clickHandler(): void {
        this.router.navigate(['edit', 0], { relativeTo: this.activatedRoute });
    }

    public ngOnInit(): void {
        this.initButtonPermissions();
        this.isNewEntityButtonEnabled$ =
            this.sportEventStoreService.selectNewEntityButtonEnabled$();
    }

    private initButtonPermissions(): void {
        this.buttonPermissions = [
            RoleNames.ADMIN,
            SportEventAdminPermissionsService.createSportEventEntity,
        ];
    }
}
