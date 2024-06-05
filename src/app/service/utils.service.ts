import { Injectable } from '@angular/core';
import { Modal } from 'bootstrap';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  route: any;

  constructor() { }

  returnFirstLetterUpper(palabra:string) {
    if (!palabra) return "";
    return palabra[0].toUpperCase() + palabra.slice(1).toLowerCase();
  }

  abrirModal(modalId:string): void {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

}
