import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-sport-category-rule-edit-page',
    templateUrl: './sport-category-rule-edit-page.component.html',
    styleUrls: ['./sport-category-rule-edit-page.component.scss'],
})
export class SportCategoryRuleEditPageComponent {
    @Input()
    public sportCategoryRuleId!: string;
}
