import { Injectable } from '@angular/core';
import { RegistroClienteDTO } from '../dto/registro-cliente-dto';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private listaRegistros: RegistroClienteDTO[] = [];

  constructor() { }

  agregarRegistro(registro: RegistroClienteDTO) {
    this.listaRegistros.push(registro);
  }

  obtenerRegistros(): RegistroClienteDTO[] {
    return this.listaRegistros;
  }
}
