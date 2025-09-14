import { Component, OnInit } from '@angular/core';
import { Scan, User , Messaggio } from '../global';
import { UserService } from '../user.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  scanlist: Array<Scan> = [];
  messaggi: Array<Messaggio> = [];

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

      this.scanlist.sort((a, b) => {
        return <any>new Date(a.datascan) - <any>new Date(b.datascan);
      });
      //console.log(this.scanlist);
    });
  }

  openMessaggio(url: string) {
    // Implementa la logica per aprire il messaggio
    this.iab.create(url,'_system');
  }
}
 