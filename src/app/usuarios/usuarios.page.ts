import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  username!: string;
  apellido!: string;
  rut!: string;
  region1!: string;
  comuna1!: string;
  latitude!: number;
  longitude!: number;

  datos: {
    'Nombre Profesor': string;
    'Hora': string;
    'sala': string;
    'Dia': string;
  } = {
    'Nombre Profesor': '', // Puedes proporcionar valores iniciales si es necesario
    'Hora': '',
    'sala': '',
    'Dia': '',
  };
  constructor() {
   }

  ngOnInit() {
    const userDataString = localStorage.getItem('usuario');
    const regionString = localStorage.getItem('regionSeleccionada');
    const comunaString = localStorage.getItem('comunaSeleccionada');
    if (regionString){
      const region = JSON.parse(regionString);
      if(region.nombre){
        this.region1= region.nombre;
      }
      this.obtenerUbicacionPeriodicamente();
    }
    if (comunaString){
      const comuna = JSON.parse(comunaString);
      if(comuna.nombreComuna){
        this.comuna1= comuna.nombreComuna;
      }
    }
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      if (userData.nombre) {
        this.username = userData.nombre;
        
      }
      if (userData.apellido) {
        this.apellido = userData.apellido;
        
      }
      if (userData.rut) {
        this.rut= userData.rut;
        
      }
      
    }
    const datosJSON = localStorage.getItem('profesor');

    if (datosJSON) {
  // Convierte la cadena JSON de nuevo a un objeto
    const datos = JSON.parse(datosJSON);

  // Asigna los datos al miembro del componente para que estén disponibles en el HTML
    this.datos = datos;
  }
}
async obtenerUbicacionPeriodicamente() {
  // Realiza la obtención de ubicación cada 30 segundos (ajusta el intervalo según tus necesidades)
  setInterval(async () => {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
      // Puedes mostrar un mensaje de error al usuario aquí.
    }
  }, 1000); // Intervalo en milisegundos (30 segundos en este caso)
}


}