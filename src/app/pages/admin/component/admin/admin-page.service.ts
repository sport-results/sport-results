import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ComponentStore } from '@ngrx/component-store';

export type AdminPageViewModel = {
  menuItems: MenuItem[];
};

export interface AdminPageState {

}

@Injectable()
export class AdminPageService extends ComponentStore<AdminPageState> {
  
  public readonly adminPageViewModel$: Observable<AdminPageViewModel> =
    this.select({
    }).pipe(
      map(() => ({
        menuItems: this.createMenuItems(),
      }))
    );

  public constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    super({
      event: undefined,
    });
  }

  public init$(): void {
  }

  private createMenuItems(): MenuItem[] {
    const items: MenuItem[] = [];

    return items;
  }
}
