import { EventEmitter, Injectable, OnInit, output } from '@angular/core';
import { Subject } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})

export class SocketWebService extends Socket  {
  mensaje: EventEmitter<any> = new EventEmitter();
  constructor(

  ) {
    try {
      super({
        url: 'http://localhost:5009',
        options: { transports: ['websocket'] }
      });

      this.escucharmensaje();

    } catch (error) {
      console.log(error);
    }
    
  };
    solicitudes(id_usuario: any) {
        this.ioSocket.emit('cliente:enviarMensaje', {id_usuario});   
    };

    escucharmensaje(){
      this.ioSocket.on('server:enviarMensaje',(datos:any,res:any) => {
        this.mensaje.emit(datos);
      });    
        
    };
  };
