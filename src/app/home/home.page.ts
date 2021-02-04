import {Component} from '@angular/core';
import * as moment from 'moment';
import {WeekdayEnum} from '../components/custom-datetime-picker/datetime-modal/weekday.enum';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public dateTime1: string;
  public dateTime2: string;
  public dateTime3: string;
  public minDateTime3 = '2021-01-14';
  public dateTime4: string;
  public maxDateTime4 = '2021-02-03';
  public dateTime5: string;
  public disabledWeekDays: WeekdayEnum[];

  public dateTime6: string;
  public minDate6 = '2021-02-01';
  public maxDate6 = '2021-02-15';
  public disabledWeekDays6: WeekdayEnum[];

  public weekDayEnum = WeekdayEnum;

  constructor() {}

  public ionViewDidEnter() {
    this.dateTime1 = moment().format('YYYY-MM-DDTHH:mm:ss.000Z');
    this.dateTime2 = moment().format('YYYY-MM-DDTHH:mm:ss.000Z');
    this.dateTime3 = moment().format('YYYY-MM-DDTHH:mm:ss.000Z');
    this.dateTime4 = moment().format('YYYY-MM-DDTHH:mm:ss.000Z');
    this.dateTime5 = moment().format('YYYY-MM-DDTHH:mm:ss.000Z');
    this.dateTime6 = moment().format('YYYY-MM-DDTHH:mm:ss.000Z');
    this.disabledWeekDays = [WeekdayEnum.wednesday, WeekdayEnum.thursday, WeekdayEnum.friday, WeekdayEnum.saturday, WeekdayEnum.sunday];
    this.disabledWeekDays6 = [WeekdayEnum.friday, WeekdayEnum.sunday];
  }

  public date1Changed(value) {
    this.dateTime1 = value;
    console.log(this.dateTime1);
  }

  public date2Changed(value) {
    this.dateTime2 = value;
    console.log(this.dateTime2);
  }

  public date3Changed(value) {
    this.dateTime3 = value;
    console.log(this.dateTime3);
  }

  public date4Changed(value) {
    this.dateTime4 = value;
    console.log(this.dateTime4);
  }

  public date5Changed(value) {
    this.dateTime5 = value;
    console.log(this.dateTime5);
  }

  public date6Changed(value) {
    this.dateTime6 = value;
    console.log(this.dateTime6);
  }

}
