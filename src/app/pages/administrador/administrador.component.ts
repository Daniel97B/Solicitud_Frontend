import { StorageService } from './../../Localstorage/localstorage';
import { Solicitud } from '../../../interfaces/Task';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.services';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css'],
})
export class AdministradorComponent implements OnInit {
  constructor(
    private router: Router,
    private task: TaskService,
    private storageService: StorageService,
    private fb: FormBuilder
  ) {
    //realizamos la definición de los formularios
    this.editForm = this.fb.group({
      nombreTarea: ['', Validators.required],
      estado: ['', Validators.required],
    });
    this.form = this.fb.group({
      Nombre_tarea: ['', Validators.required],
      Area: ['', Validators.required],
      Fecha_Estimada: ['', Validators.required],
      Asignado_a: ['', Validators.required],
    });
    this.segui = this.fb.group({
      soli: ['', Validators.required],
    })
    this.token = this.storageService.getItem('token');
    this.id = this.storageService.getItem('id');
  }
  /**
   * *Creamos las variables que vamos a utilizar
   */
  progressPercentage: number = 0;
  isChat = false;
  idchat: any;
  isDarkMode = false;
  isEditModalOpen = false;
  ischatSolici = false;
  editForm: FormGroup;
  segui:FormGroup;
  currentTarea: any;
  id:any;
  token:any;
  solicitudes: any = [];
  areas: any = [];
  asignado: any = [];
  mensajes: any= []
  usuarios_area:any = [];
  
  data = {
    Nombre_tarea: '',
    Solicitante: '',
    Asignado_a: '',
    Fecha_solicitud: '',
    Estado: '',
    Fecha_culminacion: null,
  };
  progreso = {
    Finalizado: 0,
    Total: 0,
  };
  /**
   * !Formateo la fecha e
   */
  fecha = new Date();
  año = this.fecha.getFullYear();
  mes = this.fecha.getMonth() + 1;
  dia = this.fecha.getDate();
  fecha_final = `${this.año}-${String(this.mes).padStart(2, '0')}-${String(
    this.dia
  ).padStart(2, '0')}`;

  /* 
  TODO REALIZAMOS LA CREACION DE TODAS LAS FUNCIONES QUE NECESITAMOS
  */
  form!: FormGroup;
  salir() {
    //*Limpiamos el localstorage y redirigimos al login
    localStorage.clear();
    this.router.navigate(['login']);
  }

  //! Método para calcular el progreso basado en los datos
  calcularProgreso(completados: number, total: number) {
    //* calculamos el % progreso
    if (total > 0) {
      this.progressPercentage = Math.round((completados / total) * 100);
    } else {
      this.progressPercentage = 0;
    }
  }
  //!Consulta de tareas
  appget(Apimetodo :'pendientes'|'asignado',token:any, id:any){
    console.log('entra aca');
    if (Apimetodo === 'pendientes') {
      this.task[Apimetodo](token,id).subscribe((res)=>this.solicitudes = this.mapeo(res)   
    )
    }else{ 
      this.task[Apimetodo](token,id).subscribe((res)=>this.asignado = this.mapeo(res))
    }
  }
  mapeo(mapa:any){
    console.log(mapa);
    
    const result = mapa.map((mapa: any) => ({
      ...mapa,
      Estado: mapa.Estado ? 'Finalizado' : 'Pendiente',
    }));
    
    return result;
  }
  //!Metodo para obtener todas las solicitudes
  Solicitudes() {
    //*Obtenemos el token y el id del usuario
    const token = this.token; 
    const id = this.id;
    console.log(token, id);
    // Solicitud a la API para obtener asignaciones
    this.appget('pendientes',token,id);
};
  //!Metodo para tener todas las peticiones hechas
  Asignado() {
    //*Obtenemos el token y el id del usuario
    const token = this.token;
    const id = this.id;
    //* Solicitud a la API para obtener solicitudes pendientes
    this.appget('asignado',token,id);
  }

  //!Se realizan diversas operaciones al abrir la aplicación
  ngOnInit() {
    //* Obtenemos el rol del usuario
    const roll = this.storageService.getItem('role');

    //* Si el rol es administrador
    if (roll === 'Administrador') {
      this.Solicitudes();
      this.Asignado();

      //* Obtenemos el progreso de las tareas
      this.task
        .contar(
          this.storageService.getItem('token'),
          this.storageService.getItem('id')
        )
        .subscribe((res: any) => {
          this.progreso.Finalizado = res.Finalizado;
          this.progreso.Total = res.Total;
          this.calcularProgreso(res.Finalizado, res.Total);
        });
    } else {
      this.router.navigate(['login']);
    }
  }
  //* Funcion para editar y enviar los datos del formulario a la api
  openEditModal(id: number, nombre_tarea: any, dato: any) {
    const fecha = this.fecha_final;
    this.currentTarea = { id, fecha, nombre_tarea, dato };
    this.editForm.patchValue({
      nombreTarea: this.currentTarea.nombre_tarea,
      estado: this.currentTarea.dato,
    });
    this.isEditModalOpen = true;
  }
  closeEditModal() {
    this.isEditModalOpen = false;
  }
  //*Funcion para abrir el chat
  openChat(seguimiento:any) {
    const token = this.token;
    this.isChat = true;
    this.task.mensajes(token,seguimiento).subscribe((res: any) => {
      console.log(res[0]);
      this.mensajes = res;
    });
  }
  closeChat() {}
  
  Traer(valor: Event): void {
    const valorSeleccionado = (valor?.target as HTMLSelectElement).value;
    const token = this.token;
    const usuarios = this.task.area_Usuario(token, valorSeleccionado).subscribe((res)=>{
      this.usuarios_area = res;
      
    });
  }
  //*Funcion enviar cambio de datos de el formulario
  saveEdit() {
    if (this.editForm.valid) {
      const token = this.token;
      const id = this.currentTarea.id;
      if (this.editForm.value.estado === '0') {
        const updatedTarea = {
          Nombre_tarea: this.editForm.value.nombreTarea,
          Estado: this.editForm.value.estado,
        };
        // Llamar al servicio para actualizar
        this.task.updateTarea(token, updatedTarea, id).subscribe((response) => {
          this.closeEditModal();
          // Actualizar la lista de tareas
          this.Solicitudes();
          this.Asignado();
        });
      } else {
        const updatedTarea = {
          Nombre_tarea: this.editForm.value.nombreTarea,
          Estado: this.editForm.value.estado,
          Fecha_culminacion: this.fecha_final,
        };

        this.task.aprobar(token, id, updatedTarea).subscribe((response) => {
          this.closeEditModal();
          // Actualizar la lista de tareas
          this.Solicitudes();
          this.Asignado();
        });
      }

      this.isEditModalOpen = false;
    }
  }
  openSolicitud() {
    this.ischatSolici = true;

    try {
      const token = this.token;
      const datos = this.task.areas(token).subscribe((res: any) => {
        this.areas = res;
      });
    } catch (error) {
      console.log(error);
    }

    if (this.form.valid) {
    }
  }
  newSolicitud() {
      try {
        const fecha = this.fecha_final;
        const token = this.token;
        const id = this.id;
        const asignado = this.form.get('Asignado_a')?.value;
        const solicitudN = {
          Nombre_tarea: this.form.get('Nombre_tarea')?.value,
          Solicitante: `${id}`,	
          Asignado_a: `${asignado}`,
          Fecha_solicitud:fecha,
          Estado: false,
          Fecha_culminacion:''
        };
        console.log(solicitudN);
        
        this.task.crear(token,solicitudN).subscribe((res)=>{
          this.Solicitudes();
          this.Asignado();
          this.ischatSolici = false;
        });
      } catch (error) {
        console.log(error);
      }
    
  }
  newSeguimiento(id_solicitud:any){
    console.log(id_solicitud);
    const token = this.token
    const mensaje = this.segui.value.soli;
    const mensaje_data ={
      mensaje:mensaje,
      id_solicitud:id_solicitud,
      emisor:this.id
    }
    console.log(mensaje);
    this.task.chat(token,mensaje_data).subscribe((res)=>{
      console.log(res);
      this.openChat(id_solicitud); 
    })
  };
}
