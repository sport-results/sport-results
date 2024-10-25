import { Observable } from 'rxjs';

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SportCategoryRuleStoreService } from '@app/api/domain/sport-category-rule';
import { SportCategoryRuleAdminPermissionsService } from '@app/api/admin/sport-category-rule';
import { RoleNamesEnum } from '@app/api/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sr-sport-category-rule-admin-page',
  templateUrl: './sport-category-rule-admin-page.component.html',
  styleUrls: ['./sport-category-rule-admin-page.component.scss'],
})
export class SportCategoryRuleAdminPageComponent implements OnInit {
  public buttonPermissions: string[] = [];
  public isNewEntityButtonEnabled$$$ = toSignal(
    inject(SportCategoryRuleStoreService).selectNewEntityButtonEnabled$(),
    { initialValue: false }
  );

  public constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  public clickHandler(): void {
    this.router.navigate(['edit', 0], { relativeTo: this.activatedRoute });
  }

  public ngOnInit(): void {
    this.initButtonPermissions();
  }

  private initButtonPermissions(): void {
    this.buttonPermissions = [
      RoleNamesEnum.ADMIN,
      SportCategoryRuleAdminPermissionsService.createSportCategoryRuleEntity,
    ];
  }
}
