import { Component, OnInit } from '@angular/core';
import { Scan, User , Messaggio } from '../global';
import { UserService } from '../user.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss'],
    standalone: false
})
export class Tab3Page implements OnInit {

  scanlist: Array<Scan> = [];
  messaggi: Array<Messaggio> = [];
  timeline: Array<{ tipo: 'scan', data: string, timestamp: number, scan: Scan } | { tipo: 'messaggio', data: string, timestamp: number, messaggio: Messaggio }> = [];

  constructor(public user: User, public userservice: UserService, private iab: InAppBrowser) {}

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
      //console.log(this.scanlist);
    });
  }

  openMessaggio(url: string) {
    // Implementa la logica per aprire il messaggio
    //this.iab.create(url,'_system');
    window.open(url, "_blank");
  }
}
 