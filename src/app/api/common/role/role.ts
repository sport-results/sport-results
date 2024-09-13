import { Identifiable } from '../identifiable';

export interface _Role {
    editable?: boolean;
    name: string;
    permissions: string[];
}

export type Role = _Role & Identifiable;

export const RoleNames = {
    ADMIN: 'ADMIN',
    EDITOR: 'EDITOR',
    USER: 'USER',
};
