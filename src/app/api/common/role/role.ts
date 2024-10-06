import { Identifiable } from '../identifiable';

export interface _Role {
    editable?: boolean;
    name: string;
    permissions: string[];
}

export type Role = _Role & Identifiable;

export enum RoleNamesEnum {
    ADMIN = 'ADMIN',
    EDITOR = 'EDITOR',
    OWNER = 'OWNER',
    USER = 'USER',
};
