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


import { initializeApp,  } from 'firebase/app';
import { isSupported, getMessaging, onMessage, getToken } from 'firebase/messaging';
import { Subject } from 'rxjs';



import { environment } from "../../environments/environment";





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

    private messageReceived = new Subject<any>();
    message$ = this.messageReceived.asObservable();

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

  // emette ad ogni notifica push ricevuta in foreground

try {
      if (!(await isSupported())) {
        console.warn('Le notifiche push non sono supportate su questo browser/dispositivo');
        return;
      }

      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        console.warn('Permesso per le notifiche push negato dall\'utente');
        return;
      }

      const app = initializeApp(environment.firebase);
      const messaging = getMessaging(app);

      onMessage(messaging, (payload) => {
        //alert('Notifica push ricevuta in foreground: ' + JSON.stringify(payload));
        //console.log('Notifica push ricevuta in foreground', payload);
        this.messageReceived.next(payload);
      });

      const registration = await navigator.serviceWorker.register('firebase-messaging-sw.js', {
        scope: '/firebase-messaging-scope/',
      });

      const token = await getToken(messaging, {
        vapidKey: environment.firebase.vapidKey,
        serviceWorkerRegistration: registration,
      });

      this.saveToken(this.user.IDutente, token);
    } catch (error) {
      console.error('Impossibile configurare le notifiche push', error);
    }


  }

  private saveToken(user_id: number, token: string) {
    // Endpoint non ancora disponibile: il backend PHP verrà sviluppato in seguito
        this.http
          .get(
            `https://www.roma-by-night.it/Castello/wsPHPapp/updateid.php?userid=${this.user.IDutente}&id=${token}`
          ).subscribe({
      next: () => console.log('Token push salvato'),
      error: (error) => console.error('Errore nel salvataggio del token push', error),
    });
  }



}

