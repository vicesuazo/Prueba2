import { Component, VERSION, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Result } from '@zxing/library';
import { BarcodeFormat } from '@zxing/library';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  ngVersion = VERSION.full;
  @ViewChild('scanner', { static: true })
  scanner!: ZXingScannerComponent;
  hasDevices!: boolean;
  hasPermission!: boolean;
  qrResultString!: string;
  qrResult!: Result;
  availableDevices!: MediaDeviceInfo[];
  currentDevice!: MediaDeviceInfo;
  constructor(private navCtrl: NavController) { }
  ngOnInit(): void {
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasDevices = true;
      this.availableDevices = devices;
      // selects the devices's back camera by default
      for (const device of devices) {
          if (/back|rear|environment/gi.test(device.label)) {
              new this.scanner.deviceChange();
              this.currentDevice = device;
              break;
          }
      }
    });
    this.scanner.camerasNotFound.subscribe(() => this.hasDevices = false);
    this.scanner.scanComplete.subscribe((result: Result) => this.qrResult = result);
    this.scanner.permissionResponse.subscribe((perm: boolean) => this.hasPermission = perm);
  }
  handleQrCodeResult(resultString: string) {
    console.log('Result:   ', resultString);
    const componentes = resultString.split(',');
    const datos: { [key: string]: string } = {};
    componentes.forEach(componente => {
      const [nombre, valor] = componente.split(':');
      datos[nombre.trim()] = valor.trim();
    });
    this.navCtrl.navigateForward('photo');
    localStorage.setItem('profesor',JSON.stringify(datos));
    console.log('Datos guardados en el localStorage:', datos);
    
  }
  

formats: BarcodeFormat[] = [
  BarcodeFormat.QR_CODE,
  BarcodeFormat.EAN_13,
  BarcodeFormat.CODE_128,
  BarcodeFormat.DATA_MATRIX
];

}
