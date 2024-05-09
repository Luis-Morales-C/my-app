import { Horario } from "./horario";
import { Ubicacion } from "./ubicacion";
export class RegistroNegocioDTO {
constructor(
public nombre: string = '',
public descripcion: string = '',
public codigoCliente: string = '',
public ubicacion: Ubicacion = new Ubicacion(),
public imagenes: string[] = [],
public tipoNegocio: string = '',
public horarios: Horario[] = [],
public telefonos: string[] = []
) { }
}