import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  public get Usuario(){
    return this.formLogin.get('Usuario');
  };
  
  public get Password(){
    return this.formLogin.get('Password');
  };
  
  formLogin = new FormGroup({
    'Usuario': new FormControl('', Validators.required),
    'Password':new FormControl('',[Validators.required, Validators.minLength(8), Validators.maxLength(10)])
  });

  entrar(){
    console.log(this.formLogin,'Usuario');
    
  }
}
