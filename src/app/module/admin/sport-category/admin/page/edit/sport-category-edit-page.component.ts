import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'sr-sport-category-edit-page',
    templateUrl: './sport-category-edit-page.component.html',
    styleUrls: ['./sport-category-edit-page.component.scss'],
})
export class SportCategoryEditPageComponent {
    @Input()
    public sportCategoryId!: string;
}
