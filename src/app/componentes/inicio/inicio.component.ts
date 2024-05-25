import { Component, OnInit } from '@angular/core';
import { MapaService } from '../../servicios/mapa.service';
import { Router } from '@angular/router';
import { NegociosService } from '../../servicios/negocios.service';
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {

  iraBusqueda(valor: string) {
    if (valor) {
      this.router.navigate(["/busqueda", valor]);
    }
  }

  constructor(private mapaService: MapaService, private router: Router, private negociosService: NegociosService) {
    this.negociosService.buscarMejoresNegocios().subscribe({
      next: (data) => {
        this.mapaService.pintarMarcadores(data.respuesta);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  ngOnInit(): void {
    this.mapaService.crearMapa();

  }
}