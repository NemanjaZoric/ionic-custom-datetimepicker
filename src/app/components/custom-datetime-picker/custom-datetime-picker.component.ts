import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {DatetimeModalComponent} from './datetime-modal/datetime-modal.component';
import * as moment from 'moment';
import {WeekdayEnum} from './datetime-modal/weekday.enum';

@Component({
    selector: 'app-custom-datetime-picker',
    templateUrl: './custom-datetime-picker.component.html',
    styleUrls: ['./custom-datetime-picker.component.scss'],
})
export class CustomDatetimePickerComponent implements OnInit {
    @Output() public dateEvent: EventEmitter<string> = new EventEmitter<string>();
    @Input() public inputDateTime: string;
    @Input() public placeholder: string;
    @Input() public includeTime = false;
    @Input() public id: string;
    @Input() public min?: string;
    @Input() public max?: string;
    @Input() public disabledWeekDays?: WeekdayEnum[];
    @Input() public weekStart?: WeekdayEnum;
    @Input() public startYear?: number;
    @Input() public endYear?: number;
    @Input() public dateFormat?: string;
    @Input() public amPm?: boolean;

    public formattedDateTime: string;

    public dateTime: any = {
        date: '',
        time: '',
    };

    public constructor(private modalController: ModalController) {
    }

    public ngOnInit() {
        this.formatDateTime();
    }

    public async onClick() {
        const modal = await this.modalController.create({
            component: DatetimeModalComponent,
            componentProps: {
                inputDateTime: this.inputDateTime,
                includeTime: this.includeTime,
                min: this.min,
                max: this.max,
                disabledWeekDays: this.disabledWeekDays,
                weekStart: this.weekStart ?? WeekdayEnum.monday,
                startYear: this.startYear ?? 1970,
                endYear: this.endYear ?? 2099,
                dateFormat: this.dateFormat ?? 'L',
                amPm: this.amPm ?? false,
            },
            cssClass: 'custom-datetime-picker',
        });
        await modal.present();

        modal.onDidDismiss().then((result) => {
            if (result && result.data) {
                if (result.data.length === 0 || Object.keys(result.data).length === 0) {
                    result.data = undefined;
                }
                if (result.data) {
                    if (result.data.dateTime && !this.includeTime) {
                        this.inputDateTime = moment(result.data.dateTime).format('YYYY-MM-DD');
                    } else {
                        this.inputDateTime = result.data.dateTime;
                    }
                    this.formatDateTime();
                    this.dateEvent.emit(this.inputDateTime);
                }
            }
        });
    }

    private formatDateTime() {
        if (!this.dateFormat && !this.includeTime) {
            this.dateFormat = 'L';
        } else if (!this.dateFormat && this.includeTime) {
            this.dateFormat = 'L HH:mm';
            if (this.amPm) {
                this.dateFormat = 'L hh:mm A';
            }
        }
        this.formattedDateTime = moment(this.inputDateTime).format(this.dateFormat);
    }

}
