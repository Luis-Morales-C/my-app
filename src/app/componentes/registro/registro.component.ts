import { Component } from '@angular/core';
import { RegistroClienteDTO } from '../dto/registro-cliente-dto';
import { FormsModule } from '@angular/forms';
@Component({
selector: 'app-registro',
standalone: true,
imports: [FormsModule],
templateUrl: './registro.component.html',
styleUrl: './registro.component.css'
})
export class RegistroComponent {

  registroClienteDTO: RegistroClienteDTO;

  constructor() {
  this.registroClienteDTO = new RegistroClienteDTO();
  }

  public registrar() {
    console.log(this.registroClienteDTO);
    }
}
