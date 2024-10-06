import { RoleNamesEnum } from '@app/api/common';
import { PermissionEntity } from '@app/api/domain/permission';

import { ActionEnum } from '../../common/action';
import { Role } from '../../common/role';

export abstract class AuthorizationService {
  public abstract addPermission(permission: string): void;
  public abstract addPermissionsByRoles(roles: Role[]): void;
  public abstract addRole(role: Role): void;
  public abstract addRoles(roles: Role[]): void;
  public abstract generatePermissionName(
    action: ActionEnum | RoleNamesEnum,
    resource: string
  ): string;
  public abstract hasPermission(permissionName: string): boolean;
  public abstract hasRole(roleName: string): boolean;
  public abstract removeAll(): void;
  public abstract addUserPermissions(permissions: PermissionEntity[]): void;
}
