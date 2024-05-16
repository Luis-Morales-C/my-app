import { Component } from '@angular/core';
import { LoginDTO } from '../../dto/login-dto';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../servicios/auth.service';
import { MensajeDTO } from '../../dto/mensaje-dto';
import { TokenService } from '../../servicios/token.service';

import { Alerta } from '../../dto/alerta';
import { AlertaComponent } from '../alerta/alerta.component';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, RouterLink, CommonModule]
})
export class LoginComponent {
  
  loginDTO: LoginDTO;
  alerta!: Alerta;  

  constructor(
    private authService: AuthService,
    private tokenService: TokenService
  ) {
    this.loginDTO = new LoginDTO();
  }
  public login() {
    this.authService.loginCliente(this.loginDTO).subscribe({
    next: data => {
      this.tokenService.login(data.respuesta.token);
},
error: error => {
this.alerta = new Alerta(error.error.respuesta, "danger" );
}
});
}
