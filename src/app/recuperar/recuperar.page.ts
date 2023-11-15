import { Component } from '@angular/core';
import { AlertController,NavController } from '@ionic/angular';
import { Preferences, SetOptions } from '@capacitor/preferences';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage  {
 usuario: string = '';
  nuevaContrasena: string = '';

  constructor(public alertController: AlertController,public navCtrl: NavController) { }

  ngOnInit() {
  }

  async resetearContrasena() {
    const storedUser = await Preferences.get({ key: 'usuario' });

    if (storedUser) {
      const usuarioString: string = storedUser.value as string;
      const user = JSON.parse(usuarioString);
      if (user && user.usuario === this.usuario) {
        // Actualiza la contraseña en el almacenamiento
        user.password = this.nuevaContrasena;
        const setOptions: SetOptions = {
          key: 'usuario',
          value: JSON.stringify(user)
        };
        await Preferences.set(setOptions);

        const alert = await this.alertController.create({
          header: 'Contraseña actualizada',
          message: 'Su contraseña se ha restablecido correctamente.',
          buttons: ['Aceptar']
        });
        await alert.present();
        this.navCtrl.navigateRoot('login')
      } else {
        const alert = await this.alertController.create({
          header: 'Usuario no encontrado',
          message: 'El nombre de usuario ingresado no existe.',
          buttons: ['Aceptar']
        });
        await alert.present();
      }
    } else {
      // Manejar el caso en el que no hay usuarios almacenados
    }
  }
}