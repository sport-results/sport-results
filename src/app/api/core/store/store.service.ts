import { Observable } from 'rxjs';

export abstract class StoreService {
	public abstract isLoading$(): Observable<boolean>;
}
