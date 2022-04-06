import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  miFormulario: FormGroup = this.fb.group({

    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],

  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService:  AuthService) { }


  login() {
    //Obtengo el email y el password de miFormulario y se los mando por parametro al login de mi servicio
    const {email, password} = this.miFormulario.value;

    this.authService.login(email, password)
    .subscribe( resp => {
      if(resp) {
        this.router.navigateByUrl('/dashboard');
      }else{
        Swal.fire('Error de acceso', resp, 'error');
      }




      // next: (resp) => {
      //   console.log(resp)
      //   this.router.navigateByUrl('/dashboard');
      // },
      // error: (msg) => {Swal.fire('Error', 'Credenciales incorrectas', 'error')}
    });
  }


}
