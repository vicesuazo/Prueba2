import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  usuario: string="";
  newPassword: string="";
  constructor(public alertController: AlertController,
    public navCtrl: NavController) { }

  ngOnInit() {
  }
  async resetPassword() {
    // Verifica si el nombre de usuario existe en localStorage
    const storedUser = localStorage.getItem('usuario');

    if (storedUser) {
      // Actualiza la contraseña en localStorage
      const user = JSON.parse(storedUser);
      if (user && user.usuario === this.usuario) {
      const alert = await this.alertController.create({
        header:'Datos correctos',
        message: 'Su contraseña se cambio con exito',
        buttons: ['Aceptar']
      });
      user.password = this.newPassword;
      localStorage.setItem('usuario',JSON.stringify(user));
      await alert.present();
      this.navCtrl.navigateRoot('login');
    } else {
      // Muestra un mensaje de error si el nombre de usuario no existe
      const alert = await this.alertController.create({
        header:'Datos incorrectos',
        message: 'Su nombre de usuario esta incorrecto',
        buttons: ['Aceptar']
      });
      await alert.present();
    }
  }
  }
}