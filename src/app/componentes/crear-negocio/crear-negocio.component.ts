import { Component, OnInit } from '@angular/core';
import { crearNegocioDTO } from '../../dto/crear-negocio-dto';
import { NegociosService } from '../../servicios/negocios.service';
import { FormsModule } from '@angular/forms';
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
  imports: [FormsModule, CommonModule, AlertaComponent],
  templateUrl: './crear-negocio.component.html',
  styleUrl: './crear-negocio.component.css'
})
export class CrearNegocioComponent implements OnInit {
  archivos!: FileList;
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
    this.crearNegocio();
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
      console.log('Subiendo imagenes');
      const formData = new FormData();
      formData.append('files', this.archivos[0]);
      this.imagenService.subir(formData).subscribe({
        next: (data) => {
          this.registroNegocioDTO.imagenes.push(data.respuesta.url);
          this.alerta = { mensaje: 'Imagenes subidas correctamente', tipo: 'success' };
        },
        error: (error) => {
          console.error('Error al subir las imagenes', error);
          this.alerta = { mensaje: 'Error al subir las imagenes', tipo: 'danger' };
        }
      });
    } else {
      this.alerta = { mensaje: 'Debe subir una imagen', tipo: 'danger' };
    }
  }


  public onFileChange(event: any) {
    console.log("Evento de archivo cambiado", event);

    if (event.target.files.length > 0) {
      console.log("Imagen capturada");

      this.registroNegocioDTO.imagenes = [];

      for (let i = 0; i < event.target.files.length; i++) {
        this.archivos = event.target.files;
        console.log("Archivo seleccionado:", this.archivos[0].name);
        this.registroNegocioDTO.imagenes.push(this.archivos[0].name);
      }
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
