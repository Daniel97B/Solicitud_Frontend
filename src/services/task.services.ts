import { Logueo } from './../interfaces/Task';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
    private api = 'http://localhost:5006/api/'
  constructor(
    private http:HttpClient
  ) { }
  verfiToken(token:any){
    return this.http.get(this.api+'auth/verificacion/',{headers:{authorization:`${token}` }})

};
  CreateLogueo(login:any){
    const path = '';  
  return this.http.post('http://localhost:5006/api/auth/login',login);
};
  //!VER SOLICITUDES PENDIENTES
  pendientes(token:any,Asignar_a:any){
    return  this.http.get(`${this.api}solicitud/pendientes/${Asignar_a}`,{headers:{authorization:`${token}`}})
  };
  //!VER SOLICITUDES ASIGNADAS
  asignado(token:any,solicitado:any){
    return  this.http.get(`${this.api}solicitud/solicitado/${solicitado}`,{headers:{authorization:`${token}`}})
  };
  //!APROBAR SOLICITUD
  aprobar(token:any,aprobar_id:any,aprobacion:any){
    return this.http.put(`${this.api}solicitud/aprobado/${aprobar_id}`,aprobacion,{headers:{authorization:`${token}`}})
  };
  //!CREAR TAREAS
  crear(token:any,data:any){
    return this.http.post(`${this.api}solicitud`,data,{headers:{authorization:`${token}`}});
  };
  //!CANTIDAD DE TAREAS
  contar(token:any,id:any){
    return this.http.get(`${this.api}informes/informe/${id}`,{headers:{authorization:`${token}`}});
  };
  //!APROBAR SOLICITUD
  updateTarea(token:any,datos :any,id: number){
    console.log(token);
    return this.http.put(`${this.api}solicitud/${id}`,datos,{headers:{authorization:`${token}`}});
  };
  //!GET AREAS
  areas(token:any){
    return this.http.get(`${this.api}area/`,{headers:{authorization:`${token}`}});
    };
  //! GET USUARIOS SEGÚN AREA
  area_Usuario(token:any,id:any){
    return this.http.get(`${this.api}area/${id}`,{headers:{authorization:`${token}`}});
  }
  //!GET MENSAJES DE SOLICITUD
  mensajes(token:any,id:any){
    return this.http.get(`${this.api}seguimiento/${id}`,{headers:{authorization:`${token}`}});
  };
  //*CREAR CHAT DE SEGUIMIENTO
  chat(token:any,data:any){
    return this.http.post(`${this.api}seguimiento`,data,{headers:{authorization:`${token}`}});
  };

}