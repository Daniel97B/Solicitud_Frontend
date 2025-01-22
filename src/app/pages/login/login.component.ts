import { TaskService } from '../../../services/task.services';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
//importación de router para la navegación
import { Router } from '@angular/router';
//importación de los servicios taskservice
import { Component, Inject, PLATFORM_ID, } from '@angular/core';
import { OnInit } from '@angular/core';
import { Logueo } from '../../../interfaces/Task';
import { Socket } from 'ngx-socket-io';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  image :string ='assets/images/FB_IMG_1636657642644.jpg'
  imageUrl = 'assets/img/pla.jpg';
  //Instancio las vatiables a utilizar
  datos: Logueo = {
    id: "",
    Usuario: "",
    Password: ""
  }

  constructor(
    //Inyectamos la importacion de los servicios para realizar el llamado a la api
    private TaskService: TaskService,
    //inyecta la importación de router para las rutas
    private router: Router,
    //inyecta la importación del contructor de formularios de angular
    private builder: FormBuilder,

  ) { }

  form!: FormGroup;
  ngOnInit() {
    
    // Inicializamos el formulario en el constructor
    this.form = this.builder.group({
      'Usuario': [null, [Validators.required]],
      'Password': [null, [Validators.required, Validators.minLength(8), Validators.maxLength(15)]]
    });
  }
  

  //?Creamos esta funcion para dejar mas limpio el codigo html
  public get Usuario() {
    return this.form.get('Usuario') as FormControl;
  };

  public get Password() {
    return this.form.get('Password') as FormControl;
  };

  entrar() {
    //*Creamos una validacion en caso que el formulario sea invalido
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      })
    };

    //TODO Realizo el llamado a los valores de el formulario
    try {
      const Usuario = this.Usuario.value;
      const Password = this.Password.value;

      const login = {
        User: `${Usuario}`,
        Password: `${Password}`
      };
      
      this.TaskService.CreateLogueo(login).subscribe((res: any) => {
        //console.log(res.data.user.email);
        localStorage.setItem('User', res.data.user.User);
        //console.log(res.data.user.role[0]);
        localStorage.setItem('role', res.data.user.Roll);
        //console.log(res.data.user.name);
        localStorage.setItem('Nombre', res.data.user.Nombre);
        // console.log(res.data.user.apellido);
        localStorage.setItem('Email', res.data.user.Email);
        localStorage.setItem('id', res.data.user.id);
        const token = res.data.token;
        localStorage.setItem('token', token);

        
        if (res.data.user.Roll === 'Administrador') {
          this.router.navigate(['Administrador']);
          return;
        }
        else if (res.data.user.Roll === 'Director') {
          this.router.navigate(['Director']);
          return;
        }
        else if (res.data.user.Roll === 'Supervisor') {
          this.router.navigate(['Supervisor']);
          return;
        };
      }
    );
    
    }catch (e) {
      console.log('Error->', e);
    };

  };

};
