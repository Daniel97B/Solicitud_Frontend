import { isPlatformBrowser } from '@angular/common';
import { Injectable} from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { TaskService } from "../services/task.services";
import { Inject, PLATFORM_ID } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CheckRoleAdministradorGuard implements CanActivate {
    constructor(
        private authSvc: TaskService,
        private router: Router,
        @Inject(PLATFORM_ID) private plataformId: Object
    ) { }
  
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        // Verifica si localStorage está disponible
            if (isPlatformBrowser(this.plataformId)) {
                const roll = localStorage.getItem('role');
                // Si el rol es indefinido o no es 'Administrador', redirige a 'login'
                if (roll !== 'Administrador') {
                    this.router.navigate(['login']);
                    console.log(roll);
                    console.log('Rol no permitido o no definido, redirigiendo a login');
                    return false; // Cambia a false para evitar que se active la ruta
                }else {
                    // Si no estamos en el navegador, también podemos redirigir
                    this.router.navigate(['login']);
                    return false;
                }
            }
            return true;
    }
}
