import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {HomePage} from './home.page';

import {HomePageRoutingModule} from './home-routing.module';
import {CustomDatetimePickerModule} from '../components/custom-datetime-picker/custom-datetime-picker.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
        CustomDatetimePickerModule,
    ],
    declarations: [HomePage]
})
export class HomePageModule {
}
