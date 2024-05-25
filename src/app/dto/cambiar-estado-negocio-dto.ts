export class CambiarEstadoNegocioDTO {
    constructor(
        public codigoNegocio: string,
        public mensaje: string,
        public idModerador: string

    ) { }
}
