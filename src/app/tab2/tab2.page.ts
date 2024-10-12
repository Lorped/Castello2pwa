import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { Oggetto, Status, User } from '../global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  


  public barcodes: Barcode[] = [];
  public isPermissionGranted = false;

  constructor(public alertController: AlertController, public oggetto: Oggetto, public status: Status, public user: User, public router: Router) {
    this.initialstuff();
  }

  ngOnInit(): void {
  }

  async initialstuff(){
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
    }
    
    let { available } = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
 
    if (available == false ){
      // alert("debug: module not available");
      await BarcodeScanner.installGoogleBarcodeScannerModule();
    } else {
      // alert("debug: module available");
    }
    
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async openbarcode() {
    this.router.navigate(['/qrscanner']);
    return; 
    
    

    // this.oggetto.id='504756580060';
    // this.router.navigate(['/tabs/oggetto']);
    this.barcodes = [];


    /**************    
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);

    **************    */


    this.oggetto.id=this.barcodes[0].rawValue;



    if (this.oggetto.id.substring(0,1)=='M'){
      this.status.magie = true ;
      this.status.generico = false;
      
    } else {
      this.status.magie = false ;
      this.status.generico = true;
    }
 
  }

}
