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
export class AppComponent implements OnInit {
  constructor(
    //inyecta la importación de taskservices
    private usuarioservicio: TaskService,
    private router: Router,
    private localStorage :StorageService
  ){}
  //inyecta la importación de taskservices
  title = "hola"
  ngOnInit(){
     
    };
};
