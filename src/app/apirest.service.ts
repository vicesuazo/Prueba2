import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://dev.matiivilla.cl/duoc/location';

  constructor(private http: HttpClient) {}
  getRegiones() {
    return this.http.get(`${this.baseUrl}/region`);
  }
  getComunasPorRegion(regionId: number) {
    return this.http.get(`${this.baseUrl}/comuna/${regionId}`).pipe(
      catchError((error: any) => {
        console.error('Error en la solicitud a la API de comunas', error);
        return throwError(error);
      })
    );
  }

  
}

