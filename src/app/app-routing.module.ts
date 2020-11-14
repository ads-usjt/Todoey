import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ClienteListaComponent } from './clientes/cliente-lista/cliente-lista.component';
// import { ClienteInserirComponent } from './clientes/cliente-inserir/cliente-inserir.component';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  // {path: '', component: ClienteListaComponent},
  // { path: 'criar', component: ClienteInserirComponent },
  // { path: 'editar/:idCliente', component: ClienteInserirComponent }

]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]

})
export class AppRoutingModule {

}
