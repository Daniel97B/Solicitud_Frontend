//TODO ESTE ES EL MODELO DE DATOS

export interface Logueo{
    id:string;
    Usuario: String;
    Password:String;
}
export interface Solicitud{
    Nombre_tarea:string;
    Solicitante:number |string;
    Asignado_a:number |string;
    Fecha_Solicitud:Date | null;
    Estado:Boolean;
    Fecha_culminacion:Date | null;
}