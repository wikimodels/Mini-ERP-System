import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  ACTIVITY,
  INCOME_DAILY_DYNAMICS,
  INCOME_LIST,
  INCOME_MONTHLY_DYNAMICS,
  TAX_PAYMENTS,
} from 'src/consts/url-consts';
import { YearNumber } from 'src/models/nav-bar/year-numbers.model';
import { NavBarService } from '../services/calendar-services/nav-bar.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
  providers: [NavBarService],
})
export class AnalyticsComponent implements OnInit, OnDestroy {
  sub: Subscription;
  constructor(private router: Router, private navbarService: NavBarService) {
    this.navbarService.getCalendarYearNumbers();
  }
  calendarYearsNumbers: YearNumber[] = [];
  selectedYearNumber: YearNumber;
  ngOnInit(): void {
    this.sub = this.navbarService.yearNumbersSub$.subscribe((value) => {
      this.calendarYearsNumbers = [...value];
      this.selectedYearNumber = this.navbarService.getInitialYearNumber(
        this.calendarYearsNumbers
      );
    });
  }

  selectYearNumber(yearNumber: YearNumber): void {
    this.selectedYearNumber = yearNumber;
    this.navbarService.setYearNumbers([yearNumber]);
  }

  goToTaxes() {
    this.router.navigate([TAX_PAYMENTS], {
      queryParams: { yearNumber: this.selectedYearNumber.yearNumber },
    });
  }

  goToActivity() {
    this.router.navigate([ACTIVITY], {
      queryParams: { yearNumber: this.selectedYearNumber.yearNumber },
    });
  }

  goToIncomeList() {
    this.router.navigate([INCOME_LIST], {
      queryParams: { yearNumber: this.selectedYearNumber.yearNumber },
    });
  }

  goToIncomeStructure() {
    this.router.navigate([INCOME_MONTHLY_DYNAMICS], {
      queryParams: { yearNumber: this.selectedYearNumber.yearNumber },
    });
  }

  goToIncomeDynamics() {
    this.router.navigate([INCOME_DAILY_DYNAMICS], {
      queryParams: { yearNumber: this.selectedYearNumber.yearNumber },
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
