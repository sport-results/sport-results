import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { SportCategoryRuleFormService, EntityFormViewModel } from './sport-category-rule-form.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SportCategoryRuleFormService],
    selector: 'app-sport-category-rule-form',
    templateUrl: './sport-category-rule-form.component.html',
    styleUrls: ['./sport-category-rule-form.component.scss'],
})
export class SportCategoryRuleFormComponent implements OnInit {
    public entityFormViewModel$!: Observable<EntityFormViewModel>;

    @Input()
    public entityId: string | undefined;

    public constructor(private componentService: SportCategoryRuleFormService) {}

    public ngOnInit(): void {
        this.componentService.init$(this.entityId);
        this.entityFormViewModel$ = this.componentService.entityFormViewModel$;
    }
}
