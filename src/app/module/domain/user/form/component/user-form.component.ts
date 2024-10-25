import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';

import { UserFormService } from './user-form.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UserFormService],
  selector: 'sr-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
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
