import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { ResgisterComponent } from './pages/resgister/resgister.component';

const routes: Routes = [

  {
    path: '',
    component: MainComponent,
    children: [

      {
        path: 'login',
        component: LoginComponent
      },

      {
        path: 'register',
        component: ResgisterComponent
      },

      {
        path: '**',
        redirectTo: 'login'
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
