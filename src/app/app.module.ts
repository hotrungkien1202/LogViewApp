import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule, RoutingComponent } from './app-routing/app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmpSearchComponent } from './emp-search/emp-search.component';
import { Routes, Router, RouterModule } from '@angular/router';
import { PadEndPipe } from './custome-pipe/padEnd.pipe';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/auth.guard';
import { TaskSearchComponent } from './task-search/task-search.component';

const routes: Routes = [
   { path: 'emp-search/:folder/:emp_id/:block_id', component: EmpSearchComponent },
   { path: 'task-search/:folder/:block_id/:unique_id', component: TaskSearchComponent },
   { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
   { path: '', component: LoginComponent },
   { path: '**', component: LoginComponent }

];

@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      RoutingComponent,
      EmpSearchComponent,
      PadEndPipe,
      LoginComponent,
      TaskSearchComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      NgbModule,
      MatSelectModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      MatAutocompleteModule,
      MatInputModule,
      BrowserAnimationsModule,
      RouterModule.forRoot(routes)
   ],
   providers: [AuthGuard],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
