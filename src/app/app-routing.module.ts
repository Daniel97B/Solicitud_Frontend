import { LoginModule } from './pages/login/login.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CheckRoleAdministradorGuard} from '../shared/check-role-administrador.guard';
import { CheckRoleDirectorGuard } from '../shared/check-role-director.guard';
import { CheckRoleSupervisorGuard } from '../shared/check-role-supervisor.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo:'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren:()=> import('./pages/login/login.module').then(m => m.LoginModule),
    pathMatch:'full'
  },
  {
    path: 'Supervisor',
    loadChildren:()=> import('./pages/supervisor/supervisor.module').then(m =>m.SupervisorModule),
    pathMatch:'full',
    canActivate:[CheckRoleSupervisorGuard]
  },
  {
    path: 'Director',
    loadChildren:()=> import('./pages/director/director.module').then(m =>m.DirectorModule),
    pathMatch:'full',
    canActivate:[CheckRoleDirectorGuard]
  },
  {
    path: 'Administrador',
    loadChildren:()=> import('./pages/prin-admin/administrador/administrador.module').then(m =>m.AdministradorModule),
    pathMatch:'full',
    canActivate:[CheckRoleAdministradorGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
