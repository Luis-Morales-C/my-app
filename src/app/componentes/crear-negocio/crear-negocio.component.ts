import { Component, OnInit } from '@angular/core';
import { RegistroNegocioDTO } from '../../dto/registro-negocio-dto';
import { NegociosService } from '../../servicios/negocios.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Horario } from '../../dto/horario';
import { MapaService } from '../../servicios/mapa.service';
import { PublicoService } from '../../servicios/publico.service';

@Component({
selector: 'app-crear-negocio',
standalone: true,
imports: [FormsModule, CommonModule],
templateUrl: './crear-negocio.component.html',
styleUrl: './crear-negocio.component.css'
})
export class CrearNegocioComponent implements OnInit{
  archivos!: FileList;
  registroNegocioDTO: RegistroNegocioDTO;
  horarios: Horario[];
  numero: string=''
  tipoNegocio: string[];


  constructor(private publicoService: PublicoService, private negociosService: NegociosService, private mapaService: MapaService) {
    this.registroNegocioDTO = new RegistroNegocioDTO();
    this.horarios = [ new Horario() ];
    this.tipoNegocio = [];
    
  }

  public crearNegocio() {
  this.registroNegocioDTO.horarios = this.horarios;
  this.negociosService.crear(this.registroNegocioDTO);
  console.log(this.registroNegocioDTO);
  }
  public agregarHorario() {
  this.horarios.push(new Horario());
  }
  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      // Reiniciar la lista de imágenes
      this.registroNegocioDTO.imagenes = [];
  
      // Iterar sobre cada archivo seleccionado
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
  
        // Agregar el nombre del archivo a la lista de imágenes
        this.registroNegocioDTO.imagenes.push(file.name);
      }
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
