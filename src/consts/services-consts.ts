import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { CalendarYearViewService } from 'src/app/services/calendar-services/calendar-year-view.service';
import { CalendarYearService } from 'src/app/services/core/calendar-year.service';
import { AuthService } from 'src/app/services/shared/auth.service';
import { LoadingService } from 'src/app/services/shared/loading.service';

export const CALENDAR_YEAR_SERVICE = new CalendarYearService(
  new AuthService(),
  new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }))
);

export const HTTP = new HttpClient(
  new HttpXhrBackend({ build: () => new XMLHttpRequest() })
);

export const LOADING_SERVICE = new LoadingService();

export const AUTH_SERVICE = new AuthService();
export const CALENAR_YEAR_VIEW_SERVICE = new CalendarYearViewService(
  AUTH_SERVICE,
  HTTP,
  CALENDAR_YEAR_SERVICE
);
