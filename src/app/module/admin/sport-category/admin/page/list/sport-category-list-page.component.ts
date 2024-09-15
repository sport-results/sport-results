import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-sport-category-list-page',
    templateUrl: './sport-category-list-page.component.html',
    styleUrls: ['./sport-category-list-page.component.scss'],
})
export class SportCategoryListPageComponent {}
