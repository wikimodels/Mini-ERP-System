import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  get_DD_MMMM_YYYY_Str(dayNumber, monthNumber, yearNumber) {
    const date = moment(new Date(`${yearNumber}-${monthNumber}-${dayNumber}`))
      .locale('ru')
      .format('DD MMMM YYYY');
    return date;
  }
}
