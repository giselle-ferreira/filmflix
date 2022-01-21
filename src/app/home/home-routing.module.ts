import { HomeComponent } from './home.component';
import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard'; // Ativar guard

// Ativar guard
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/auth/login'])

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'perfil',
    component: ProfileComponent,
    ...canActivate(redirectUnauthorizedToLogin) // Ativar guard
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
