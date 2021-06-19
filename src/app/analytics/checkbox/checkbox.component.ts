import { AfterViewInit, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MonthData } from 'src/models/income-monthly-report/month-data.model';
import { ChbxService } from '../services/chbx.service';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  providers: [],
})
export class CheckboxComponent implements AfterViewInit {
  checked = true;
  @Input() longMonthName: string;
  @Input() monthNumber: number;
  showTableFC = new FormControl(this.checked);
  constructor(private chbxService: ChbxService) {}

  ngAfterViewInit() {
    this.showTableFC.valueChanges.subscribe((value) => {
      const obj: MonthData = {
        longMonthName: this.longMonthName,
        monthNumber: this.monthNumber,
        showTable: value,
      };
      this.chbxService.setShowTableSubj(obj);
    });
  }
}
