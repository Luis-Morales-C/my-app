import { Component } from '@angular/core';
import { ItemNegocioDTO } from '../../dto/item-negocio-dto';
import { NegociosService } from '../../servicios/negocios.service';
import { TokenService } from '../../servicios/token.service';
import { ModeradorService } from '../../servicios/moderador.service';
import { CambiarEstadoNegocioDTO } from '../../dto/cambiar-estado-negocio-dto';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-gestion-negocio-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gestion-negocio-admin.component.html',
  styleUrl: './gestion-negocio-admin.component.css'
})
export class GestionNegocioAdminComponent {
  negocios: ItemNegocioDTO[];
  seleccionados: ItemNegocioDTO[];
  textoBtnEliminar: string;
  negocio: CambiarEstadoNegocioDTO;
  isLogged: boolean;
  id: string;

  constructor(private negocioService: NegociosService, private tokenService: TokenService, private moderadorService: ModeradorService) {
    this.negocios = [];
    this.seleccionados = [];
    this.textoBtnEliminar = '';
    this.listarNegocios();
    this.negocio = new CambiarEstadoNegocioDTO('', '', '');
    this.isLogged = false;
    this.id = '';
  }

  public listarNegocios() {
    this.moderadorService.listarNegocios().subscribe({
      next: (data) => {
        this.negocios = data.respuesta;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  public seleccionar(negocio: ItemNegocioDTO, estado: boolean) {
    if (estado) {
      this.seleccionados.push(negocio);
    } else {
      this.seleccionados.splice(this.seleccionados.indexOf(negocio), 1);
    }
    this.actualizarMensaje();
  }

  private actualizarMensaje() {
    const tam = this.seleccionados.length;
    if (tam != 0) {
      if (tam == 1) {
        this.textoBtnEliminar = "1 elemento";
      } else {
        this.textoBtnEliminar = tam + " elementos";
      }
    } else {
      this.textoBtnEliminar = "";
    }
  }

  public aprobarNegocio(negocio: ItemNegocioDTO) {
    const dto = new CambiarEstadoNegocioDTO(negocio.id, "", this.id);
    this.moderadorService.aprobarNegocio(dto).subscribe({
      next: () => {
        this.listarNegocios();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  recharzarNegocio(negocio: ItemNegocioDTO) {

    const dto = new CambiarEstadoNegocioDTO(negocio.id, "", this.id);
    this.moderadorService.rechazarNegocio(dto).subscribe({
      next: () => {
        this.listarNegocios();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  public borrarNegocios() {
    this.seleccionados.forEach(n => {
      this.negocioService.eliminar(n.id).subscribe({
        next: () => {
          this.negocios = this.negocios.filter(negocio => negocio.id !== n.id);
        },
        error: (error) => {
          console.error(error);
        }
      });
    });
    this.seleccionados = [];
    this.actualizarMensaje();
  }
  OnInit(): void {
    this.isLogged = this.tokenService.isLogged();
    if (this.isLogged) {
      this.id = this.tokenService.getCodigo();

    }
  }
}

