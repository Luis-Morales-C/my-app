import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TokenService } from './servicios/token.service';
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, RouterModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'Unilocal';
    isLogged = false;
    email: string = "";
    nombre: string = "";
    footer: any;
    constructor(private tokenService: TokenService) { }
    ngOnInit(): void {
        this.isLogged = this.tokenService.isLogged();
        if (this.isLogged) {
            this.email = this.tokenService.getEmail();
            this.nombre = this.tokenService.getNombre();
        }
    }
    public logout() {
        this.tokenService.logout();
    }
}