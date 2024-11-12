import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { io,Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket:Socket;
  private mensajeSubject = new Subject<any>();
  constructor() { 
    this.socket = io('http://localhost:4200/')
  };
  public SendMensaje(mensaje:string):void{
    this.socket.emit('message',mensaje);
  };
  public getMensaje(){
    this.socket.on('message',(mensaje: any)=>{
      this.mensajeSubject.next(mensaje);
    });
    return this.mensajeSubject.asObservable();
  };
  public disconnect(): void {
    this.socket.disconnect();
  }
}
