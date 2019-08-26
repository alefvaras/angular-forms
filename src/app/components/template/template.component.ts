import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`
  
    .ng-invalid.ng-touched:not(form) {
      border: 1px solid red;
    }
  
  `]
})
export class TemplateComponent implements OnInit {

  constructor() { }

  usr: any = {
    nombre: 'Alejandro',
    apellido: 'Fernandez',
    email: 'alejandro.fvaras@gmail.com',
    pais: '',
    sexo: 'H',
    accepta: false
  };
  sexos: string[] = ['H', 'M'];
  paises = [{ codigo: 'CH', nombre: 'Chile' }, { codigo: 'ESP', nombre: 'España' }];
  ngOnInit() {
  }

  save(form: NgForm): void {
    console.log(form);
    console.log(form.value);
  }

  save2(form2: NgForm): void {
    console.log(this.usr);
  }

}
