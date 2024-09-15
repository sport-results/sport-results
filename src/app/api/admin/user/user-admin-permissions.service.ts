import { Injectable } from '@angular/core';

import { ActionEnum } from '../../common/action';
import {
    UserPermissionsService,
    UserResourceEnum,
} from '../../domain/user';

@Injectable()
export class UserAdminPermissionsService extends UserPermissionsService {
    public static readonly viewUserAdminPage =
        ActionEnum.VIEW.toString() +
        UserResourceEnum.USER_ADMIN_PAGE.toString();
    public static readonly viewUserEditPage =
        ActionEnum.VIEW.toString() +
        UserResourceEnum.USER_EDIT_PAGE.toString();
    public static readonly viewUserListPage =
        ActionEnum.VIEW.toString() +
        UserResourceEnum.USER_LIST_PAGE.toString();
}
