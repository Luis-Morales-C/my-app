import { Component, OnInit } from '@angular/core';
import { RegistroClienteDTO } from '../../dto/registro-cliente-dto';
import { FormsModule } from '@angular/forms';
import { RegistroServicio } from '../../servicios/registro.service';
import { CommonModule } from '@angular/common';
import { PublicoService } from '../../servicios/publico.service'; 


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit {
  ciudades: string[];
  archivos!: FileList;
  registroClienteDTO: RegistroClienteDTO;
  listaRegistros: RegistroClienteDTO[];
  registroService: RegistroServicio;

  constructor(private publicoService: PublicoService) {
    this.registroClienteDTO = new RegistroClienteDTO();
    this.listaRegistros = new Array;
    this.ciudades = [];
    this.cargarCiudades();
    this.registroService = new RegistroServicio;
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
this.publicoService.listarCiudades().subscribe({
next: (data) => {
this.ciudades = data.respuesta;
},
error: (error) => {
console.log("Error al cargar las ciudades");
}
});
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
