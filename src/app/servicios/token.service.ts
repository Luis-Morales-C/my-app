import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Buffer } from "buffer";

const TOKEN_KEY = "AuthToken";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private isBrowser: boolean;

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  public getCodigo(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.id;
    }
    return "";
  }

  public getEmail(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.sub;
    }
    return "";
  }
  public getNombre(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.nombre;
    }
    return "";
  }

  public setToken(token: string) {
    if (this.isBrowser) {
      window.sessionStorage.removeItem(TOKEN_KEY);
      window.sessionStorage.setItem(TOKEN_KEY, token);
    }
  }

  public getToken(): string | null {
    if (this.isBrowser) {
      return sessionStorage.getItem(TOKEN_KEY);
    } else {
      console.warn('sessionStorage is not available');
      return null;
    }
  }

  public isLogged(): boolean {
    return this.isBrowser && this.getToken() !== null;
  }

  public login(token: string) {
    this.setToken(token);
    if (this.isBrowser) {
      this.router.navigate(["/"]).then(() => {
        window.location.reload();
      });
    }
  }

  public logout() {
    if (this.isBrowser) {
      window.sessionStorage.clear();
      this.router.navigate(["/login"]).then(() => {
        window.location.reload();
      });
    }
  }
  public getRole(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.rol;
    }
    return "";
  }

  private decodePayload(token: string): any {
    const payload = token.split(".")[1];
    const payloadDecoded = Buffer.from(payload, 'base64').toString('ascii');
    return JSON.parse(payloadDecoded);
  }
}

