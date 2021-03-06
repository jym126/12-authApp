import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-resgister',
  templateUrl: './resgister.component.html',
  styles: [
  ]
})
export class ResgisterComponent {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  register() {
    const {nombre, email, password} = this.miFormulario.value;
    this.authService.register(nombre, email, password).subscribe(resp => {

      if(resp === true) {
        this.router.navigateByUrl('./dashboard');
      }else{
        Swal.fire('Fallo de registro', resp, 'error')
      }    
    });
  }
}
