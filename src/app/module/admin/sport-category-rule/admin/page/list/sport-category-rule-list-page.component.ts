import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'sr-sport-category-rule-list-page',
    templateUrl: './sport-category-rule-list-page.component.html',
    styleUrls: ['./sport-category-rule-list-page.component.scss'],
})
export class SportCategoryRuleListPageComponent {}
