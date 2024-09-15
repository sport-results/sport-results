import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { SportCategoryFormService, EntityFormViewModel } from './sport-category-form.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SportCategoryFormService],
    selector: 'app-sport-category-form',
    templateUrl: './sport-category-form.component.html',
    styleUrls: ['./sport-category-form.component.scss'],
})
export class SportCategoryFormComponent implements OnInit {
    public entityFormViewModel$!: Observable<EntityFormViewModel>;

    @Input()
    public entityId: string | undefined;

    public constructor(private componentService: SportCategoryFormService) {}

    public ngOnInit(): void {
        this.componentService.init$(this.entityId);
        this.entityFormViewModel$ = this.componentService.entityFormViewModel$;
    }
}
