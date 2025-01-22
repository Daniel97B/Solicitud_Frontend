import { isPlatformBrowser } from '@angular/common';
import { Injectable } from "@angular/core";
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
            console.log(roll);
            if (roll === 'Administrador') {
                return true;
            } else {
                console.log('No tienes permisos para acceder a esta página');
                this.router.navigate(['login']);
                return false;
            }
        }
        return false;
    }
}