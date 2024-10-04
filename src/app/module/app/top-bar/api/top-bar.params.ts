import { MenuItem } from 'primeng/api';

import { User } from '@app/api/common';

export type TopBarParams = {
  addPagePermissions: string[];
  editPagePermissions: string[];
  menuItems: MenuItem[];
  user: User | undefined;
  isAuthenticated: boolean;
};
