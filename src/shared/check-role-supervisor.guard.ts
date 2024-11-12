import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, UrlTree, GuardResult, MaybeAsync } from "@angular/router";
import { TaskService } from "../services/task.services";

@Injectable({
    providedIn: 'root'
})

export class CheckRoleSupervisorGuard implements CanActivate {
    constructor(
    private authSvc: TaskService,
    private router: Router
    ){ }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const roll = localStorage.getItem('Roll');

        if (roll !== 'Supervisor') {
            this.router.navigate(['login']);
            return false;
        } else {
            return true;
        }
    }
}