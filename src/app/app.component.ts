import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { IsLoadingService } from '@service-work/is-loading';

import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NavBarService } from './services/calendar-services/nav-bar.service';
import { UrlService } from './services/shared/url.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  isLoading: Observable<boolean>;
  previousUrl: string = '';
  currentUrl: string = '';
  constructor(
    private isLoadingService: IsLoadingService,
    private router: Router,
    private urlService: UrlService,
    private navBarService: NavBarService
  ) {
    this.isLoading = this.isLoadingService.isLoading$();
  }

  ngOnInit() {
    this.navBarService.getCalendarYearNumbers();
  }

  ngAfterViewInit() {
    this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationStart ||
            event instanceof NavigationEnd ||
            event instanceof NavigationCancel ||
            event instanceof NavigationError
        )
      )
      .subscribe((event) => {
        // If it's the start of navigation, `add()` a loading indicator
        if (event instanceof NavigationStart) {
          this.isLoadingService.add();
          return;
        }
        if (event instanceof NavigationEnd) {
          this.previousUrl = this.currentUrl;
          this.currentUrl = event.url;
          this.urlService.setPreviousUrl(this.previousUrl);
        }

        // Else navigation has ended, so `remove()` a loading indicator
        setTimeout(() => {
          this.isLoadingService.remove();
        }, 1000);
      });
  }
}
