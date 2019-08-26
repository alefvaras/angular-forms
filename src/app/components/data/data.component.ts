import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder, FormArray, AbstractControl} from '@angular/forms';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent implements OnInit {

  form: FormGroup;
  email: FormControl;

  usuario: any = {
    nombre: 'Alejandro',
    apellido: 'Fernandez',
    email: 'ale.fvaras@gmail.com',
    pasaTiempos: []
  };


  constructor(private fb: FormBuilder) {


  }

  ngOnInit() {
    // FormGroup es un cojunto de FormControls, el estado de este objeto depende del estado de todos sus objetos, es decir, si uno de los FormControl es inválido, el grupo entero es inválido.
    this.form = new FormGroup({

      // FormControl es un objeto qué se usa en los formularios para tener un control sobre su valor y su estado,
      // segundo parametro del constructor agrego validadores
      nombre: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      apellido: new FormControl(null, [Validators.required, this.validatonLastName]),
      email: new FormControl(null, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      // arreglo de form control, para pasatiempos
      pasaTiempos: new FormArray([
        new FormControl('correr', Validators.required)

      ]),
      password1: new FormControl(null, Validators.required),
      password2: new FormControl(),
      // validador asincorno
      username: new FormControl('', Validators.required, this.userExists),

    });

    // otra forma de llamar a las validaciones, despues de haber creador el formControl
    // bind especifica el contexto de mi this, en este caso el contexto es el form
    this.form.get('password2').setValidators([Validators.required, this.validatonPassword.bind(this.form)]);

    // cargar el formulario con valores por defectos, ocupar para objecto que vienen de un servicio rest
    // this.form.setValue(this.usuario);

    // FormBuilder proporciona azúcar sintáctico que acorta la creación de instancias de un FormControl
    // , FormGroup o FormArray. Reduce la cantidad de repeticiones necesarias para construir formas complejas
    // this.email =new FormControl(null, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]);
    // this.form = this.fb.group({
    //   nombre: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    //   apellido: new FormControl(null, Validators.required),
    //   email: this.email
    // });

    // detectar cambios en los valores o estado del formulario
    this.form
      .controls.username
      .valueChanges
      .subscribe(data => console.log(data));

    // cuando cambia el estatus
    this.form
      .controls.username
      .statusChanges
      .subscribe(data => console.log(data));
  }

  saveChanges() {

    // resetear los valores
    // this.form.reset({
    //   nombre: '',
    //   apellido: '',
    //   email: ''

    // });
    console.log(this.form.value);
    console.log(this.form);
  }

  addPasatiempos() {
    (this.form.get('pasaTiempos') as FormArray).push(
      new FormControl(null, Validators.required)
    );
  }


  // validaciones 
  validatonLastName(control: AbstractControl): { [s: string]: boolean } {

    if (control.value === 'fernandez') {
      return {validatonLastName: true};
    }
    return null;

  }

  validatonPassword(control: AbstractControl): { [s: string]: boolean } {

    const myForm: any = this;

    // password2 !==password1
    if (control.value !== myForm.controls['password1'].value) {
      return {validatonPassword: true};
    }
    return null;

  }

  // validacion asincrona

  userExists(control: AbstractControl): Promise<any> | Observable<any> {


// con promesa
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'ozymern') {
          resolve({userExists: true});
        } else {
          resolve(null);
        }
      }, 2000);
    });

  }


}
