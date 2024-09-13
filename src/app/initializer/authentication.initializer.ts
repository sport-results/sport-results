import { first, tap } from 'rxjs';

import { ApplicationStoreService } from '@app/api/core/application';

export function AuthenticationInitializer(
    applicationStoreService: ApplicationStoreService
) {
    return () => {
        return new Promise<any>((resolve, reject) => {
            applicationStoreService
                .selectAuthenticatedUser$()
                .pipe(
                    first(),
                    tap((authenticatedUser) => {
						if (authenticatedUser?.uid) {
							applicationStoreService.dispatchLogin();
						}
					})
                )
                .subscribe(() => {
                    resolve(true);
                });
        });
    };
}
