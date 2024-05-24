import { Injectable } from '@angular/core';
import { ItemNegocioDTO } from '../dto/item-negocio-dto';
import { crearNegocioDTO } from '../dto/crear-negocio-dto';
import { Ubicacion } from '../dto/ubicacion';
import { HttpClient } from '@angular/common/http';
import { MensajeDTO } from '../dto/mensaje-dto';
import { Observable } from 'rxjs';
import { ActualizacionNegocioDTO } from '../dto/actualizacion-negocio-dto';

@Injectable({
  providedIn: 'root'
})

export class NegociosService {

  private negociosURL = "http://localhost:8080/api/negocio";


  negocios: ItemNegocioDTO[];
  constructor(private http: HttpClient) {
    this.negocios = [];
  }


  public crear(negocioNuevo: crearNegocioDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.negociosURL}/crear`, negocioNuevo);
  }
  public actualizar(actualizacionNegocio: ActualizacionNegocioDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.negociosURL}/actualizar`, actualizacionNegocio);
  }
  public obtener(codigoNegocio: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.negociosURL}/obtener/${codigoNegocio}`);
  }
  public eliminar(codigoNegocio: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.negociosURL}/eliminar/${codigoNegocio}`);
  }
  public listarNegociosPropietario(codigoCliente: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.negociosURL}/listar-negocios-propietario/${codigoCliente}`);
  }
  public buscar(cadenaBusqueda: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.negociosURL}/filtrar-por-nombre/${cadenaBusqueda}`);
  }

}
