import { Ubicacion } from './ubicacion';

export class ItemNegocioDTO {
    constructor(
        public id: string = '',
        public nombre: string = '',
        public descripcion: string = '',
        public ubicacion: Ubicacion = new Ubicacion(),
        public telefonos: string[] = [],
        public imagenes: string[] = [],
        public codigoPropietario: string = '',
        public calificacionPromedio: number = 0,
        public estadoNegocio: string = '',
    ) { }
}
