import { Action } from '../../common/action';
import { Resource } from '../../common/resource';
import { Role } from '../../common/role';

export abstract class AuthorizationService {
    public abstract addPermission(permission: string): void;
    public abstract addPermissionsByRoles(roles: Role[]): void;
    public abstract addRole(role: Role): void;
    public abstract addRoles(roles: Role[]): void;
    public abstract generatePermissionName(
        action: Action,
        resource: Resource
    ): string;
    public abstract hasPermission(permissionName: string): boolean;
    public abstract hasRole(roleName: string): boolean;
    public abstract removeAll(): void;
}
