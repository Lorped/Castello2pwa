import { ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Scan, User , Messaggio } from '../global';
import { UserService } from '../user.service';
import { Browser } from '@capacitor/browser';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      IonButton,
      IonCard,
      IonCardContent,
      IonCardHeader,
      IonCardSubtitle,
      IonCardTitle,
      IonContent,
      IonHeader,
      IonTitle,
      IonToolbar,
    ]
})
export class Tab3Page implements OnInit {

  scanlist: Array<Scan> = [];
  messaggi: Array<Messaggio> = [];
  timeline: Array<{ tipo: 'scan', data: string, timestamp: number, scan: Scan } | { tipo: 'messaggio', data: string, timestamp: number, messaggio: Messaggio }> = [];

  constructor(public user: User, public userservice: UserService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(){

    const channel = new window.BroadcastChannel('my-channel2');
    channel.addEventListener('message', (event: any) => {
      console.log("Received message from channel 2:", event.data);
      this.loadscan();
    });



  }


  ionViewWillEnter () {
    this.scanlist = [];
    this.loadscan();
  }


  loadscan(){
    this.userservice.scanlist().subscribe( resp => {
      this.scanlist = resp.scan;
      this.messaggi = resp.messaggi;

      this.timeline = [
        ...this.scanlist.map(scan => ({ tipo: 'scan' as const, data: scan.datascan, timestamp: Number(scan.timestamp), scan })),
        ...this.messaggi.map(messaggio => ({ tipo: 'messaggio' as const, data: messaggio.data, timestamp: Number(messaggio.timestamp), messaggio })),
      ].sort((a, b) => b.timestamp - a.timestamp);
      this.changeDetectorRef.markForCheck();
      //console.log(this.scanlist);
    });
  }

  openMessaggio(url: string) {
    // Implementa la logica per aprire il messaggio
    //this.iab.create(url,'_system');
    window.open(url, "_blank");
  }
}
 