import { Identifiable } from '../identifiable';
import { Role } from '../role';

export interface _User {
    displayName?: string | null;
    email: string;
    firstName?: string;
    language?: string;
    lastName?: string;
    phone?: string;
    photoURL?: string | null;
}

export type User = _User & Identifiable & {
    checkpointId?: number;
    roles: Role[];
};
