import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
    `
      * {
        margin: 15px
      }
        button {
          background: lightblue;
          border: solid;
          border-radius: 5px;
          padding: 3px;
        }
      
    `
  ]
})
export class DashboardComponent implements OnInit{

  ngOnInit(): void {
  }

  get usuario() {
    return this.authService.usuario;
  }

  constructor(private router: Router,
              private authService: AuthService) { }

  logout() {

    this.router.navigateByUrl('./auth');
    this.authService.logout();
  }


}
