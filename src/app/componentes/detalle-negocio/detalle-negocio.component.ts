import { Component } from '@angular/core';
import { ItemNegocioDTO } from '../../dto/item-negocio-dto';
import { ActivatedRoute } from '@angular/router';
import { NegociosService } from '../../servicios/negocios.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-detalle-negocio',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './detalle-negocio.component.html',
    styleUrl: './detalle-negocio.component.css'
})
export class DetalleNegocioComponent {
    codigoNegocio: string = '';
    negocio: ItemNegocioDTO | undefined;
    constructor(private route: ActivatedRoute, private negociosService: NegociosService) {
        this.route.params.subscribe((params) => {
            this.codigoNegocio = params['codigo'];
            this.obtenerNegocio();
        });
    }
    public obtenerNegocio() {
       this.negociosService.obtener(this.codigoNegocio).subscribe({
        next: data => {
            this.negocio = data.respuesta;
        }
       })
    }
}
