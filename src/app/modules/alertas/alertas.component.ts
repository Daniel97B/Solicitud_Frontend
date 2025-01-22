import { Component,Inject,Input} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrl: './alertas.component.css'
})
export class AlertasComponent {
@Input() mensaje:string ='';
constructor(
  //*creamos un dialogo de referencia
  public dialogRef:MatDialogRef<AlertasComponent>,
  //*Definimos el parametro de entrada para el mensaje de error
  @Inject(MAT_DIALOG_DATA)public Errormsg:string
){}

//!Definimos funcion para cerrar el modal
  close(){
    this.dialogRef.close(); 
  }
}
