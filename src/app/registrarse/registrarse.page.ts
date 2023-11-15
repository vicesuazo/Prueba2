import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
 } from '@angular/forms';
 import { AlertController, NavController } from '@ionic/angular';
 import { ApiService } from '../apirest.service';
@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {
  regiones: any[]=[];
  selectedRegion: any=[];
  comunas: any[]=[];
  selectedComuna: string="";
  formularioLogin: FormGroup;
  
  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController,
    private apiService: ApiService) {
      this.formularioLogin = this.fb.group({
        "nombre": new FormControl("",Validators.required),
        "apellido": new FormControl("",Validators.required),
        "rut": new FormControl("",Validators.required),
        "usuario": new FormControl("",Validators.required),
        "password": new FormControl("",Validators.required)

      });
      
    }
    ngOnInit() {
      this.apiService.getRegiones().subscribe((data: any) => {
        if (data && data.data) {
          this.regiones = data.data;
        }
      });
    }
  async guardar(){
    var f = this.formularioLogin.value;

    if(this.formularioLogin.invalid){
      const alert = await this.alertController.create({
        header:'Datos incorrectos',
        message: 'Tienes que llenar todos los datos',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }
    this.navCtrl.navigateRoot('login');
    var usuario = {
      nombre: f.nombre,
      apellido: f.apellido,
      rut: f.rut,
      usuario:f.usuario,
      password: f.password
    }
    var comuna= {
      nombreComuna: this.selectedComuna
    }
    localStorage.setItem('usuario',JSON.stringify(usuario));
    localStorage.setItem('regionSeleccionada', JSON.stringify(this.selectedRegion));
    localStorage.setItem('comunaSeleccionada', JSON.stringify(comuna));
  }
  cargarComunasPorRegion(regionId: number) {
    if (regionId) {
      console.log('Realizando solicitud a la API de comunas para la región:', regionId);
      this.apiService.getComunasPorRegion(regionId).subscribe((data: any) => {
        console.log('Respuesta de la API de comunas:', data);
        if (data && data.data) {
          this.comunas = data.data;
        }
      });
    }
  }  
}
