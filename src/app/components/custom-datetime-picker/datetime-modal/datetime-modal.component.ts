import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import {MomentInput} from 'moment';
import {ModalController} from '@ionic/angular';
import {WeekdayEnum, WeekdayNumberEnum} from './weekday.enum';
import {WeekInterface} from './week.interface';

@Component({
    selector: 'app-datetime-modal',
    templateUrl: './datetime-modal.component.html',
    styleUrls: ['./datetime-modal.component.scss'],
})
export class DatetimeModalComponent implements OnInit {
    @Input() public inputDateTime: string;
    @Input() public includeTime: boolean;
    @Input() public min: string | MomentInput;
    @Input() public max: string | MomentInput;
    @Input() public disabledWeekDays: WeekdayEnum[];
    @Input() public weekStart: WeekdayEnum;
    @Input() public startYear: number;
    @Input() public endYear: number;
    @Input() public dateFormat: string;
    @Input() public amPm: boolean;
    public date: any;
    public selectedDate: any;
    public time: string;
    public calendar: any = [];
    public months: any;
    public years: any;
    public mode = {
        dayPicker: true,
        monthPicker: false,
        yearPicker: false,
    };
    public firstYear: any;
    public lastYear: any;

    public nextYearDisabled = false;
    public prevYearDisabled = false;

    public weekdays: WeekInterface[];

    public selectedYears = [];

    public dateTimePickerFormat: string;

    public constructor(private modalController: ModalController) {
    }

    public ngOnInit() {
        this.dateTimePickerFormat = this.amPm ? 'hh:mm A' : 'HH:mm';
        this.generateWeek();
        const weekdayNumber = this.weekdays.find((weekday) => {
            return weekday.day === this.weekStart;
        }).number;
        moment.updateLocale('en', {
            week: {
                dow: weekdayNumber,
            }
        });
        if (this.min) {
            this.min = moment(this.min);
        }
        if (this.max) {
            this.max = moment(this.max);
        }
        if (this.inputDateTime) {
            this.date = moment(this.inputDateTime);
            if (this.includeTime) {
                this.time = moment(this.inputDateTime).format('HH:mm');
            } else {
                this.time = null;
            }
        } else {
            this.date = moment();
            if (this.includeTime) {
                this.time = moment().format('HH:mm');
            } else {
                this.time = null;
            }
        }
        this.selectedDate = this.date.clone();
        this.generateCalendar();
        this.months = this.generateMonths();
        this.years = this.generateYears();
        this.selectedYears = this.getSelectedYears(this.date.year());
        this.getFirstLastYear();
    }

    public selectDate(date) {
        if (!date.disabled) {
            this.selectedDate = date;
        }
    }

    public selectMode(key) {
        this.mode = {
            dayPicker: false,
            monthPicker: false,
            yearPicker: false,
        };
        this.mode[key] = true;

        if (this.mode.yearPicker) {
            const findInMatrix = this.findArrayInMatrix(this.years);
            if (findInMatrix > -1) {
                const newIndex = findInMatrix;
                this.selectedYears = this.setSelectedYears(newIndex);
                this.getFirstLastYear();
            }
            this.disableNextPrevYears();
        }
    }

    public selectMonth(monthNumber) {
        // generate month
        this.date.set({month: monthNumber});
        this.generateCalendar();
        // set mode to dayPicker
        this.selectMode('dayPicker');
    }

    public selectYear(year) {
        // set mode to monthPicker
        this.date.set({year});
        this.selectMode('monthPicker');
    }

    public selectPreviousYears() {
        const findInMatrix = this.findArrayInMatrix(this.years);
        if (findInMatrix > -1) {
            const newIndex = findInMatrix - 1;
            this.selectedYears = this.setSelectedYears(newIndex);
            this.getFirstLastYear();
        }
        this.disableNextPrevYears();
    }

    public selectNextYears() {
        const findInMatrix = this.findArrayInMatrix(this.years);
        if (findInMatrix > -1 && findInMatrix < this.years.length - 1) {
            const newIndex = findInMatrix + 1;
            this.selectedYears = this.setSelectedYears(newIndex);
            this.getFirstLastYear();
        }
        this.disableNextPrevYears();
    }

    public selectPreviousMonth() {
        const currentMonthNumber = this.date.month();
        this.date.set({month: currentMonthNumber - 1});
        this.generateCalendar();
    }

    public selectNextMonth() {
        const currentMonthNumber = this.date.month();
        this.date.set({month: currentMonthNumber + 1});
        this.generateCalendar();
    }

    public async cancelModal() {
        await this.modalController.dismiss();
    }

    public async dismissModal() {
        if (!this.time) {
            this.time = '00:00';
        }
        const dateTime = moment(`${this.selectedDate.format('YYYY-MM-DD')} ${this.time}`);
        await this.modalController.dismiss({
            dateTime
        });
    }

    public resetCalendar() {
        this.date = this.selectedDate.clone();
        this.generateCalendar();
    }

    private generateCalendar() {
        this.calendar = [];
        const startDay = this.date.clone().startOf('month').startOf('week');
        const endDay = this.date.clone().endOf('month').endOf('week');

        const date = startDay.clone().subtract(1, 'day');

        while (date.isBefore(endDay, 'day')) {
            this.calendar.push({
                days: Array(7).fill(0).map(() => date.add(1, 'day').clone()),
            });
        }

        this.disableDaysOnMinDate();
        this.disableDaysOnMaxDate();
        this.disableDaysOnSelectableWeekDays();
    }

    private generateMonths() {
        this.months = [];
        const months = [[], [], [], []];
        const monthNumber = 12;

        for (let i = 0; i < monthNumber; i++) {
            const month = {
                monthName: '',
                monthNumber: 0
            };
            if (i < 3) {
                month.monthNumber = i;
                month.monthName = moment.monthsShort()[i];
                months[0].push(month);
            } else if (i >= 3 && i < 6) {
                month.monthNumber = i;
                month.monthName = moment.monthsShort()[i];
                months[1].push(month);
            } else if (i >= 6 && i < 9) {
                month.monthNumber = i;
                month.monthName = moment.monthsShort()[i];
                months[2].push(month);
            } else if (i >= 9 && i < 12) {
                month.monthNumber = i;
                month.monthName = moment.monthsShort()[i];
                months[3].push(month);
            }
        }
        return months;
    }

    private generateYears() {
        this.years = [];
        const startYear = this.startYear;
        // const endYear = parseInt(moment().format('YYYY'), 10);
        const endYear = this.endYear;
        const years = [];
        const yearsToSort = [];
        for (let i = startYear; i <= endYear; i++) {
            yearsToSort.push(i);
        }
        for (let i = 0; i < yearsToSort.length; i += 16) {
            years.push(yearsToSort.slice(i, i + 16));
        }
        return years;
    }

    private getSelectedYears(year) {
        let selectedArr = [];
        for (let i = 0; i < this.years.length; i++) {
            for (let j = 0; j < this.years[i].length; j++) {
                if (this.years[i][j] === year) {
                    selectedArr = this.years[i];
                    return this.formatSelectedYears(selectedArr);
                }
            }
        }
        return this.formatSelectedYears(this.years[0]);
    }

    private setSelectedYears(index) {
        let selectedArr = [];
        selectedArr = this.years[index];
        if (!selectedArr) {
            return;
        }
        return this.formatSelectedYears(selectedArr);
    }

    private formatSelectedYears(selectedYears) {
        const years = [];
        for (let i = 0; i < selectedYears.length; i += 4) {
            years.push(selectedYears.slice(i, i + 4));
        }
        return years;
    }

    private getFirstLastYear() {
        this.firstYear = this.selectedYears[0][0];
        this.lastYear = this.selectedYears[this.selectedYears.length - 1][this.selectedYears[this.selectedYears.length - 1].length - 1];
    }

    private findArrayInMatrix(matrix) {
        const array = [];
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.selectedYears.length; i++) {
            // tslint:disable-next-line:prefer-for-of
            for (let j = 0; j < this.selectedYears[i].length; j++) {
                array.push(this.selectedYears[i][j]);
            }
        }
        let index = -1;

        matrix.some((item, i) => {
            if (JSON.stringify(item) === JSON.stringify(array)) {
                index = i;
                return true;
            }
        });
        return index;
    }

    private disableDaysOnMinDate() {
        for (let i = 0; i < this.calendar.length; i++) {
            for (let j = 0; j < this.calendar[i].days.length; j++) {
                if (this.calendar[i].days[j] < this.min) {
                    this.calendar[i].days[j].disabled = true;
                }
            }
        }
    }

    private disableDaysOnMaxDate() {
        for (let i = 0; i < this.calendar.length; i++) {
            for (let j = 0; j < this.calendar[i].days.length; j++) {
                if (this.calendar[i].days[j] > this.max) {
                    this.calendar[i].days[j].disabled = true;
                }
            }
        }
    }

    private disableDaysOnSelectableWeekDays() {
        if (!this.disabledWeekDays || this.disabledWeekDays.length === 0) {
            return;
        }
        for (let i = 0; i < this.calendar.length; i++) {
            for (let j = 0; j < this.calendar[i].days.length; j++) {
                const day = this.calendar[i].days[j].clone();
                const weekdayName = day.format('dddd').toLowerCase();
                this.disabledWeekDays.forEach((disabledWeekDay) => {
                    if (disabledWeekDay === weekdayName) {
                        this.calendar[i].days[j].disabled = true;
                    }
                });
            }
        }
    }

    public generateWeek() {
        this.weekdays = [
            {
                day: WeekdayEnum.sunday,
                number: WeekdayNumberEnum.sunday,
                shortDay: 'Sun',
            },
            {
                day: WeekdayEnum.monday,
                number: WeekdayNumberEnum.monday,
                shortDay: 'Mon',
            },
            {
                day: WeekdayEnum.tuesday,
                number: WeekdayNumberEnum.tuesday,
                shortDay: 'Tue',
            },
            {
                day: WeekdayEnum.wednesday,
                number: WeekdayNumberEnum.wednesday,
                shortDay: 'Wed',
            },
            {
                day: WeekdayEnum.thursday,
                number: WeekdayNumberEnum.thursday,
                shortDay: 'Thur',
            },
            {
                day: WeekdayEnum.friday,
                number: WeekdayNumberEnum.friday,
                shortDay: 'Fri',
            },
            {
                day: WeekdayEnum.saturday,
                number: WeekdayNumberEnum.saturday,
                shortDay: 'Sat',
            },
        ];
        const weekdayNumber = this.weekdays.find((weekday) => {
            return weekday.day === this.weekStart;
        }).number;

        let index = 0;
        for (let i = 0; i < this.weekdays.length; i++) {
            if (this.weekdays[i].number === weekdayNumber) {
                index = i;
            }
        }

        const startWeek = [];
        const endWeek = [];

        for (let i = 0; i < index; i++) {
            endWeek.push(this.weekdays[i]);
        }
        for (let i = index; i < this.weekdays.length; i++) {
            startWeek.push(this.weekdays[i]);
        }

        this.weekdays = startWeek;

        for (let i = 0; i < endWeek.length; i++) {
            this.weekdays.push(endWeek[i]);
        }
    }

    public disableNextPrevYears() {
        this.nextYearDisabled = false;
        this.prevYearDisabled = false;
        const lastSelectedYear =
            this.selectedYears[this.selectedYears.length - 1][this.selectedYears[this.selectedYears.length - 1].length - 1];
        if (this.years[this.years.length - 1][this.years[this.years.length - 1].length - 1] === lastSelectedYear) {
            this.nextYearDisabled = true;
        }
        const firstSelectedYear = this.selectedYears[0][0];
        if (this.years[0][0] === firstSelectedYear) {
            this.prevYearDisabled = true;
        }
    }

}
