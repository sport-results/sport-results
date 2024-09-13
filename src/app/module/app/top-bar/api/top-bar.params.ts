import { MenuItem } from 'primeng/api';

import { User } from '@app/api/common';

export type TopBarParams = {
  addPagePermissions: string[];
  editPagePermissions: string[];
  menuItems: MenuItem[];
  users: User[];
  user: User | null;
  isAuthenticated: boolean;
};
