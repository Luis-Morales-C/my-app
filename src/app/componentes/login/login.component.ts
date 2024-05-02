import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginDTO } from '../dto/login-dto';
import { RegistroComponent } from '../registro/registro.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginDTO: LoginDTO;
  registroComponent: RegistroComponent;

  constructor() {
    this.loginDTO=new LoginDTO;
    this.registroComponent=new RegistroComponent;
  }
  public iniciarSesion() {
    const email = this.loginDTO.email;
    const password = this.loginDTO.password;

    const listaRegistros = this.registroComponent.listaRegistros;

    const usuarioEncontrado = listaRegistros.find(registro => registro.email === email && registro.password === password);
    
    if (usuarioEncontrado) {
      console.log('Inicio de sesión exitoso');
    } else {
      console.log('Credenciales incorrectas');
    }
  }
}

