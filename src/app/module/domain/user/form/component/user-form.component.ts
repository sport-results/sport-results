import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';

import { UserFormService } from './user-form.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, DropdownModule, MultiSelectModule],
  providers: [UserFormService],
  selector: 'sr-user-form',
  standalone: true,
  styleUrls: ['./user-form.component.scss'],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
  private componentService = inject(UserFormService);

  public userFormViewModel$$$ = toSignal(
    this.componentService.userFormViewModel$
  );
  @Input()
  public userId: string | undefined;

  public ngOnInit(): void {
    this.componentService.init(this.userId);
  }
}
