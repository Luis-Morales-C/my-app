import { Component, OnInit } from '@angular/core';
import { RegistroClienteDTO } from '../dto/registro-cliente-dto';
import { FormsModule } from '@angular/forms';
import { RegistroService } from '../registro/registroService';

@Component({
selector: 'app-registro',
standalone: true,
imports: [FormsModule],
templateUrl: './registro.component.html',
styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit{
  ciudades: string[];
  archivos!:FileList;
  registroClienteDTO: RegistroClienteDTO;
  listaRegistros: RegistroClienteDTO[];
  registroService: RegistroService;

  constructor() {
  this.registroClienteDTO = new RegistroClienteDTO();
  this.listaRegistros=new Array;
  this.ciudades = [];
  this.cargarCiudades();
  this.registroService=new RegistroService;
  }


  public registrar() {
    if (this.registroClienteDTO.fotoPerfil != "") {
    console.log(this.registroClienteDTO);
    this.registroService.agregarRegistro(this.registroClienteDTO);
    } else {
    console.log("Debe cargar una foto");
    }
    }

  public sonIguales(): boolean {
    return this.registroClienteDTO.password == this.registroClienteDTO.confirmarPassword;
        }

  private cargarCiudades() {
    this.ciudades = ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena"];
    }   
  
  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;
      this.registroClienteDTO.fotoPerfil = this.archivos[0].name;
    }
  }
  ngOnInit(): void {
  }
}
