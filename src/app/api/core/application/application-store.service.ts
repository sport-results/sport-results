import { Observable } from 'rxjs';

import { User } from '../../common/user';

export abstract class ApplicationStoreService {
  public abstract dispatchAuthenticated(user: User | undefined): void;
  public abstract dispatchGetUser(): void;
  public abstract dispatchLogin(): void;
  public abstract dispatchLogout(): void;
  public abstract dispatchTestLogin(user: User): void;
  public abstract dispatchSetCheckpointId(checkpointId: number): void;
  public abstract selectAuthenticatedUser$(): Observable<User | null>;
  public abstract selectIsAuthenticated$(): Observable<boolean>;
  public abstract selectCheckpointId$(): Observable<number>;
}
