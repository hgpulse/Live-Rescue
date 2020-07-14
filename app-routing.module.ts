import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { AuthGuard } from "./shared/guard/auth.guard";
import { MapComponent } from './map/map.component';
import { ListComponent } from './list/list.component';





const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'sign-in', component: SignInComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'map', component: MapComponent, canActivate: [AuthGuard] },
  { path: 'list', component: ListComponent, canActivate: [AuthGuard] }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
