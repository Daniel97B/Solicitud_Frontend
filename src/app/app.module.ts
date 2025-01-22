import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient,withFetch } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatDialogModule } from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AlertasComponent } from './modules/alertas/alertas.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { SupervisorComponent } from './pages/supervisor/supervisor.component';
import { DirectorComponent } from './pages/director/director.component';
import { AdministradorModule } from './pages/prin-admin/administrador/administrador.module';
import { ModulesComponent } from './modules/modules.component';
import { AuthInterceptor } from '../services/interseccion.services';
@NgModule({
  declarations: [
    AppComponent,
    SupervisorComponent,
    DirectorComponent,
    ModulesComponent,
    AlertasComponent,
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AdministradorModule
  ],
  providers: [ // Habilita fetch aquí
    provideHttpClient(withFetch()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
