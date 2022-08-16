import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './pessoa/cadastro/cadastro.component';
import { ListaComponent } from './pessoa/lista/lista.component';

const routes: Routes = [
{path: '', redirectTo: '/home', pathMatch:'full'},
{path: 'home', component: HomeComponent},
{path: 'pessoa-lista', component: ListaComponent},
{path:'pessoa-cadastro', component: CadastroComponent},

];

@NgModule({
  declarations: [],

  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
