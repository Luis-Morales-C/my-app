import { Injectable } from '@angular/core';
import { ItemNegocioDTO } from '../dto/item-negocio-dto';
import {crearNegocioDTO } from '../dto/crear-negocio-dto';
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
this.negocios.push( new ItemNegocioDTO('1', 'Bar Armenia', 'https://picsum.photos/100',
'BAR', new Ubicacion(4.531456060381842, -75.68035469963664), 4.5, 'APROBADO') );
this.negocios.push( new ItemNegocioDTO('2', 'Restaurante La Casona',
'https://picsum.photos/100', 'RESTAURANTE', new Ubicacion(4.551298538672697,
-75.65858458442557), 4.0, 'APROBADO') );
this.negocios.push( new ItemNegocioDTO('3', 'Peluquería La 33', 'https://picsum.photos/100',
'PELUQUERIA', new Ubicacion(4.541984423452234, -75.68579829641877), 4.0, 'RECHAZADO') );
this.negocios.push( new ItemNegocioDTO('4', 'Veterinaria Los Amigos',
'https://picsum.photos/100', 'VETERINARIA', new Ubicacion(4.539872786267409,
-75.65011488244343), 4.0, 'APROBADO') );
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

    }
