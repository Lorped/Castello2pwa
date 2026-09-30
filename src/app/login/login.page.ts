import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Status, User } from '../global';
import { Router } from '@angular/router';



import {
  AlertController,
  IonButton,
  IonCheckbox,
  IonCol,
  IonContent,
  IonHeader,
  IonInput,
  IonInputPasswordToggle,
  IonItem,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { Capacitor } from '@capacitor/core';


import { initializeApp } from 'firebase/app';




import { environment } from "src/environments/environment";





import { HttpClient } from '@angular/common/http';
import {
  FirebaseMessaging,
  GetTokenOptions,
} from '@capacitor-firebase/messaging';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      FormsModule,
      ReactiveFormsModule,
      IonButton,
      IonCheckbox,
      IonCol,
      IonContent,
      IonHeader,
      IonInput,
      IonInputPasswordToggle,
      IonItem,
      IonRow,
      IonTitle,
      IonToolbar,
    ]
})
export class LoginPage implements OnInit {
      

  login = new FormGroup({  
    email: new FormControl('',[ Validators.required ]),
    password: new FormControl('',[ Validators.required ]),
    checked: new FormControl(false),
  });




  constructor(public userservice: UserService, private user: User, public router: Router, public status: Status, public http: HttpClient ,   public alertCtrl: AlertController) { }

  ngOnInit() {
    var ee = window.localStorage.getItem( "castellouserid" ) ! ;
    var pp = window.localStorage.getItem( "castellopassword" ) ! ;
    this.login.controls.email.setValue(ee);
    this.login.controls.password.setValue(pp);
    //console.log(ee);
    
    if (ee != null )  { 
      this.login.controls.checked.setValue(true); 
    }

    const channel = new window.BroadcastChannel('my-channel');
    channel.addEventListener('message', (event: any) => {
      //console.log("Received message from SW:", event.data);
      this.userservice.getuser().subscribe(
        data => {
          this.user.Sanita = Number(data.Sanita);
          this.user.Miti = Number(data.Miti);
          this.user.PF = Number(data.PF);
        }
      );
    });

  }

  doLogin(){

    //console.log (this.login);
    //console.log (this.login.controls.checked.value);

    this.userservice.login(this.login.controls.email.value !, this.login.controls.password.value !).subscribe(
      (resp) => {
          if ( this.login.controls.checked.value == true ) {
            window.localStorage.setItem( "castellouserid" , this.login.controls.email.value ! );
            window.localStorage.setItem( "castellopassword" , this.login.controls.password.value ! );
          } else {
            window.localStorage.removeItem( "castellouserid" );
            window.localStorage.removeItem( "castellopassword" );
          }


          this.user.CognomePG = resp.user.CognomePG;
          this.user.IDbp = resp.user.IDbp;
          this.user.IDprofessione = resp.user.IDprofessione;
          this.user.IDspecial = resp.user.IDspecial;
          this.user.IDutente = resp.user.IDutente;
          this.user.Miti = Number ( resp.user.Miti);
          this.user.NomePG = resp.user.NomePG;
          this.user.PF = Number (resp.user.PF);
          this.user.Sanita = Number (resp.user.Sanita);
          this.user.URLimg = resp.user.URLimg;
          this.user.aaaa = resp.user.aaaa;
          this.user.bonus = resp.user.bonus;
          this.user.desc = resp.user.desc;
          this.user.descbp = resp.user.descbp;
          this.user.gg = resp.user.gg;
          this.user.mm = resp.user.mm;
          this.user.nomeprofessione = resp.user.nomeprofessione;
          this.user.nomespecial = resp.user.nomespecial;
          this.user.registrationID = resp.user.registrationID;
          this.user.xbonus = resp.user.xbonus;
          this.user.xspecpg = resp.user.xspecpg;
        

          //console.log("user: ", this.user);
          this.status.generico = false;
          this.status.magie = false;


        // Request permission to use push notifications

        this.pushsetup();

  


          /*
          this.mesg.messages.subscribe((message) => { 
            
            this.showalert(message.notification?.body);

              const channel = new BroadcastChannel('my-channel2');
              channel.postMessage(message);
      
            this.userservice.getuser().subscribe(
              data => {
                this.user.Sanita = Number(data.Sanita);
                this.user.Miti = Number(data.Miti);
                this.user.PF = Number(data.PF);
              }
            );

          });

          */


        this.router.navigate(['tabs']);
      

          


      }, 
      error => {
        switch ( error.status ) {
          case 401:
            alert("Non autorizzato");
          break;
          case 404:
            alert("Scheda non trovata");
          break;
          default:
            alert("Server error");
        }
      }
    );
  }

    async showalert(pot: any){
    let alert =  await this.alertCtrl.create({
      header: 'CASTELLO',
      subHeader: pot,
      buttons: ['OK']
    });
    alert.present();
  }

async pushsetup() {
    try {
      const permissions = await FirebaseMessaging.requestPermissions();
      if (permissions.receive === 'granted') {
        const token = await this.getToken();
        this.http
          .get(
            `https://www.roma-by-night.it/Castello/wsPHPapp/updateid.php?userid=${this.user.IDutente}&id=${token}`
          )
          .subscribe();
      }
    } catch (error) {
      console.error('Unable to configure push notifications', error);
    }

    await this.router.navigate(['tabs']);
  }

    private async getToken(): Promise<string> {
    const options: GetTokenOptions = {
      vapidKey: environment.firebase.vapidKey,
    };
    if (Capacitor.getPlatform() === 'web') {
      options.serviceWorkerRegistration =
        await navigator.serviceWorker.register('firebase-messaging-sw.js');
    }
    const { token } = await FirebaseMessaging.getToken(options);
    return token;
  }




}

