import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import { awsDashboardReducer, awsDashboardStateKey } from './awsDashboard';
import { awsExportReducer, awsExportStateKey } from './awsExport';
import { awsReportsReducer, awsReportsStateKey } from './awsReports';
import { ocpDashboardReducer, ocpDashboardStateKey } from './ocpDashboard';
import { ocpExportReducer, ocpExportStateKey } from './ocpExport';
import { ocpReportsReducer, ocpReportsStateKey } from './ocpReports';
import { providersReducer, providersStateKey } from './providers';
import { sessionReducer, sessionStateKey } from './session';
import { uiReducer, uiStateKey } from './ui';
import { usersReducer, usersStateKey } from './users';

export type RootState = StateType<typeof rootReducer>;

export const rootReducer = combineReducers({
  [awsDashboardStateKey]: awsDashboardReducer,
  [awsExportStateKey]: awsExportReducer,
  [awsReportsStateKey]: awsReportsReducer,
  [ocpDashboardStateKey]: ocpDashboardReducer,
  [ocpExportStateKey]: ocpExportReducer,
  [ocpReportsStateKey]: ocpReportsReducer,
  [providersStateKey]: providersReducer,
  [sessionStateKey]: sessionReducer,
  [usersStateKey]: usersReducer,
  [uiStateKey]: uiReducer,
});
