/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/** Third Party Dependencies */
import { Store } from '@ngrx/store';

/** Framework Dependencies */
import { AnalyticsService, LogService } from '../../framework.ref';

/** Module Level Dependencies */
import { BaseService } from '../../core/index';
import { USER_LIST_ACTIONS } from './user.actions';

/**
 * UserListService Definition
 */
export const CONTEXT = 'user';
@Injectable()
export class UserListService extends BaseService {
    constructor(public analytics: AnalyticsService, httpService: Http, public logService: LogService, private store: Store<any>) {
        super(analytics, httpService, CONTEXT, logService);
        this.store.dispatch({ type: USER_LIST_ACTIONS.INIT });
    }
}