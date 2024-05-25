import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../dto/mensaje-dto';
import { Observable } from 'rxjs';
import { CambiarEstadoNegocioDTO } from '../dto/cambiar-estado-negocio-dto';

@Injectable({
  providedIn: 'root'
})
export class ModeradorService {

  private moderadorURL = "http://localhost:8080/api/moderador";

  constructor(private http: HttpClient) { }

  public aprobarNegocio(cambiarEstadoNegocioDTO: CambiarEstadoNegocioDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.moderadorURL}/aprobar-negocio`, cambiarEstadoNegocioDTO);
  }

  public rechazarNegocio(cambiarEstadoNegocioDTO: CambiarEstadoNegocioDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.moderadorURL}/rechazar-negocio`, cambiarEstadoNegocioDTO);
  }
  public listarNegocios(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.moderadorURL}/listar-negocios`);
  }
}
