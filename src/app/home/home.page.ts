import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public dateTime1: string;
  public dateTime2: string;

  constructor() {}

  public ionViewDidEnter() {
    this.dateTime1 = moment().format('YYYY-MM-DDTHH:mm:ss.000Z');
    this.dateTime2 = moment().format('YYYY-MM-DDTHH:mm:ss.000Z');
  }

  public date1Changed(value) {
    this.dateTime1 = value;
    console.log(this.dateTime1);
  }

  public date2Changed(value) {
    this.dateTime2 = value;
    console.log(this.dateTime2);
  }

}
