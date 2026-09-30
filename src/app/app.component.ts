import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  bulbOutline,
  logOutOutline,
  personOutline,
  qrCode,
  readerOutline,
  refresh,
} from 'ionicons/icons';

addIcons({
  'person-outline': personOutline,
  'bulb-outline': bulbOutline,
  'reader-outline': readerOutline,
  'log-out-outline': logOutOutline,
  'qr-scanner': qrCode,
  refresh,
});

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IonApp, IonRouterOutlet]
})
export class AppComponent {
  constructor() {}
}
