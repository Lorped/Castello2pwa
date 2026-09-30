import { ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../global';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      IonBadge,
      IonButton,
      IonButtons,
      IonCard,
      IonCardContent,
      IonCardHeader,
      IonCardSubtitle,
      IonCardTitle,
      IonCol,
      IonContent,
      IonGrid,
      IonHeader,
      IonIcon,
      IonItem,
      IonLabel,
      IonRefresher,
      IonRefresherContent,
      IonRow,
      IonTitle,
      IonToolbar,
    ]
})
export class Tab1Page implements OnInit {

  img = '';

  constructor(public user: User, public router: Router, public userservice: UserService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    //console.log("user tab1", this.user);

    if (this.user.URLimg != "nopicture.gif") {
      this.img = "https://www.roma-by-night.it/Castello/assets/" + this.user.URLimg;
    } else {
      this.img="assets/imgs/nopicture.gif";  
    }

  
  }

  logout(){
    this.router.navigate(['login']);
  }


  handleRefresh(event: any) {
    setTimeout(() => {
      this.loadusr();
      event.target.complete();
    }, 2000);
  }

  loadusr(){
    this.userservice.getuser().subscribe(
      data => {
        this.user.Sanita = Number(data.Sanita);
        this.user.Miti = Number(data.Miti);
        this.user.PF = Number(data.PF);
        this.changeDetectorRef.markForCheck();
      }
    );
  }

}
