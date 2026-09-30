import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/angular';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs]
})
export class TabsPage {

  constructor() {}

}
