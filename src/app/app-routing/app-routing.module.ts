import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'
import { AppComponent } from '../app.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';

const routes: Routes = [
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponent = [
];
