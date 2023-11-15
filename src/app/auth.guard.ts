// src/app/auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    // Aquí puedes agregar lógica para verificar la autenticación del usuario
    // Por ejemplo, verifica si el usuario está autenticado en tu aplicación

    const isUserAuthenticated = true; // Cambia esto según tus necesidades

    if (!isUserAuthenticated) {
      this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión si no está autenticado
    }

    return isUserAuthenticated;
  }
}
