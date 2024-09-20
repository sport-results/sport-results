import { Observable } from 'rxjs';

import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';

import { UserFormService, UserFormViewModel } from './user-form.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UserFormService],
    selector: 'sr-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
    public userFormViewModel$!: Observable<UserFormViewModel>;
    @Input()
    public userId: string | undefined;

    public constructor(private componentService: UserFormService) {}

    public ngOnInit(): void {
        this.componentService.init(this.userId);
        this.userFormViewModel$ = this.componentService.userFormViewModel$;
    }
}
