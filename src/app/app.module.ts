import { RouteReuseStrategy, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { SupervisorComponent } from './pages/supervisor/supervisor.component';
import { RouterModule } from '@angular/router';
import { DirectorComponent } from './pages/director/director.component';
import { AdministradorComponent } from './pages/administrador/administrador.component';
import { LoginPruebaComponent } from './login-prueba/login-prueba.component';

@NgModule({
  declarations: [
    AppComponent,
    SupervisorComponent,
    DirectorComponent,
    LoginPruebaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule 
  ],
  providers: [ // Habilita fetch aquí
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
