import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GET_INCOME_TYPES_BY_EMAIL } from 'ignored/urls.const';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IncomeType } from 'src/models/income-yearly-report/income-type.model';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root',
})
export class IncomeTypeService {
  constructor(private authService: AuthService, private http: HttpClient) {}

  incomeTypesByEmail$() {
    const email = this.authService.getUserEmail();
    return this.http.get<IncomeType[]>(GET_INCOME_TYPES_BY_EMAIL(email)).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(error);
      })
    );
  }
}
