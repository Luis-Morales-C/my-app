import { Component, OnInit } from '@angular/core';
import { crearNegocioDTO } from '../../dto/crear-negocio-dto';
import { NegociosService } from '../../servicios/negocios.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Horario } from '../../dto/horario';
import { MapaService } from '../../servicios/mapa.service';
import { PublicoService } from '../../servicios/publico.service';
import { TokenService } from '../../servicios/token.service';
import { AlertaComponent } from '../alerta/alerta.component';
import { Alerta } from '../../dto/alerta';
import { ImagenService } from '../../servicios/imagen.service';

@Component({
  selector: 'app-crear-negocio',
  standalone: true,
  imports: [FormsModule, CommonModule, AlertaComponent, ReactiveFormsModule],
  templateUrl: './crear-negocio.component.html',
  styleUrl: './crear-negocio.component.css'
})
export class CrearNegocioComponent implements OnInit {
  archivos: File[] = [];
  urls: string[] = [];
  registroNegocioDTO: crearNegocioDTO;
  horarios: Horario[];
  numero: string = ''
  tipoNegocio: string[];
  alerta!: Alerta;


  constructor(private publicoService: PublicoService, private negociosService: NegociosService, private mapaService: MapaService, private tokenService: TokenService
    , private imagenService: ImagenService) {
    this.registroNegocioDTO = new crearNegocioDTO;
    this.horarios = [new Horario()];
    this.tipoNegocio = [];
    this.cargarTipoNegocio();
  }


  public crearNegocio() {
    const codigoCliente = this.tokenService.getCodigo();
    if (!codigoCliente) {
      console.error('No se ha iniciado sesión');
      return;
    }

    this.registroNegocioDTO.codigoCliente = codigoCliente;

    this.negociosService.crear(this.registroNegocioDTO).subscribe({
      next: (data) => {
        console.log('Negocio creado correctamente', data);
        this.alerta = { mensaje: 'Negocio Creado Correctamente', tipo: 'success' };
      },
      error: (error) => {
        console.error('Error al crear el negocio', error);
        this.alerta = { mensaje: 'Error al crear el negocio', tipo: 'danger' };
      }
    });
  }

  public agregarHorario() {
    this.registroNegocioDTO.horarios.push(new Horario());
  }

  public eliminarHorario(index: number) {
    this.registroNegocioDTO.horarios.splice(index, 1);
  }


  public subirImagen() {
    if (this.archivos != null && this.archivos.length > 0) {
      this.archivos.forEach((archivo) => {
        const formData = new FormData();
        formData.append('file', archivo);
        this.imagenService.subir(formData).subscribe(
          (data) => {
            console.log('Imagen subida correctamente', data);
            this.alerta = { mensaje: 'Imagen subida correctamente', tipo: 'success' };
            this.urls.push(data.respuesta.url);
            this.urls.forEach(e => {
              this.registroNegocioDTO.imagenes.push(e);
            });

          },
          (error) => {
            console.error('Error al subir la imagen', error);
            this.alerta = { mensaje: 'Error al subir la imagen', tipo: 'danger' };
          }
        )
      });
    } else {
      this.alerta = { mensaje: 'Debe subir una imagen', tipo: 'danger' };
    }
  }


  public onFileChange(event: any) {
    console.log("Evento de archivo cambiado", event);

    if (event.target.files.length > 0) {

      this.archivos = Array.from(event.target.files);
      this.subirImagen();
    } else {
      console.log("No se ha seleccionado ninguna imagen");
    }
  }


  public agregarTelefono() {
    this.registroNegocioDTO.telefonos.push(this.numero);
  }

  public eliminarTelefono(index: number) {
    this.registroNegocioDTO.telefonos.splice(index, 1);
  }


  private cargarTipoNegocio() {
    this.publicoService.listarTiposNegocio().subscribe({
      next: (data) => {
        this.tipoNegocio = data.respuesta;
      },
      error: (error) => {
        console.log("Error al cargar los tipos de negocio");
      }
    });
  }


  ngOnInit(): void {
    this.mapaService.crearMapa();
    this.mapaService.agregarMarcador().subscribe((marcador) => {
      this.registroNegocioDTO.ubicacion.latitud = marcador.lat;
      this.registroNegocioDTO.ubicacion.longitud = marcador.lng;
    });
  }
}
