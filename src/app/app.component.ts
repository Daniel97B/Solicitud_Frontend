import { Component } from '@angular/core';
import { TaskService } from '../services/task.services';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { io,Socket } from 'socket.io-client';
import { StorageService } from './Localstorage/localstorage';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  constructor(
    //inyevta la importación de taskservices
    private usuarioservicio: TaskService,
    private router: Router,
    private localStorage :StorageService
  ){}
  //inyevta la importación de taskservices
  title = "hola"
  ngOnInit(){
    
    //Obtengo el token de el localstorage
    const token = this.localStorage.getItem('Token');
    //Realizo una validacion en caso de que alla token dure cierta cantidad de tiempo
    if(token !== null){
      this.usuarioservicio.verfiToken(token).subscribe((res: any)=>{
        const msg = res.msg;
        if (msg === 'TOKEN_NULO') {
          localStorage.clear();
          this.router.navigate(['login'])
        }
        if (msg === 'NOT_TOKEN'){
          localStorage.clear();
          this.router.navigate(['login']);
        }
      });

      };
    };
};
