import { Component, OnInit } from '@angular/core';
import { RegistroNegocioDTO } from '../../dto/registro-negocio-dto';
import { NegociosService } from '../../servicios/negocios.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Horario } from '../../dto/horario';
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
  constructor(private negociosService: NegociosService) {
  this.registroNegocioDTO = new RegistroNegocioDTO();
  this.horarios = [ new Horario() ];
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
  
  ngOnInit(): void {
  }
  }
