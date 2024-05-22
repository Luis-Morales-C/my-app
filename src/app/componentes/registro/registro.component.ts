import { Component, OnInit } from '@angular/core';
import { RegistroClienteDTO } from '../../dto/registro-cliente-dto';
import { FormsModule } from '@angular/forms';
import { RegistroServicio } from '../../servicios/registro.service';
import { CommonModule } from '@angular/common';
import { PublicoService } from '../../servicios/publico.service';
import { AuthService } from '../../servicios/auth.service';
import { Alerta } from '../../dto/alerta';
import { AlertaComponent } from '../alerta/alerta.component';
import { ImagenService } from '../../servicios/imagen.service';


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule, AlertaComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit {
  ciudades: string[];
  archivos!: FileList;
  registroClienteDTO: RegistroClienteDTO;
  listaRegistros: RegistroClienteDTO[];
  registroService: RegistroServicio;
  alerta!: Alerta;

  constructor(private publicoService: PublicoService, private authService: AuthService,
    private imagenService: ImagenService) {
    this.registroClienteDTO = new RegistroClienteDTO();
    this.listaRegistros = new Array;
    this.ciudades = [];
    this.cargarCiudades();
    this.registroService = new RegistroServicio;
  }

  public registrar() {
    if (this.registroClienteDTO.fotoPerfil != "") {
      this.authService.registrarCliente(this.registroClienteDTO).subscribe({
        next: (data) => {
          this.alerta = new Alerta(data.respuesta, "success");
        },
        error: (error) => {
          this.alerta = new Alerta(error.error.respuesta, "danger");
        }
      });
    } else {
      this.alerta = new Alerta("Debe subir una imagen", "danger");
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
  public subirImagen() {
    if (this.archivos != null && this.archivos.length > 0) {
      const formData = new FormData();
      formData.append('file', this.archivos[0]);
      this.imagenService.subir(formData).subscribe({
        next: data => {
          this.registroClienteDTO.fotoPerfil = data.respuesta.url;
          this.alerta = new Alerta("Se ha subido la foto", "success");
        },
        error: error => {
          this.alerta = new Alerta(error.error, "danger");
        }
      });
    } else {
      this.alerta = new Alerta("Debe seleccionar una imagen y subirla", "danger");
    }
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
