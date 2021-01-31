import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDatetimePickerComponent } from './custom-datetime-picker.component';
import {IonicModule} from '@ionic/angular';
import {DatetimeModalComponent} from './datetime-modal/datetime-modal.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        CustomDatetimePickerComponent,
        DatetimeModalComponent,
    ],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule
    ],
    exports: [
        CustomDatetimePickerComponent,
    ]
})
export class CustomDatetimePickerModule { }
