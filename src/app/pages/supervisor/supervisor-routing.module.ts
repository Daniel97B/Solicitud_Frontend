import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupervisorComponent } from './supervisor.component';

const routes: Routes = [{
  path:'',
  component:SupervisorComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupervisorRoutingModule { }
