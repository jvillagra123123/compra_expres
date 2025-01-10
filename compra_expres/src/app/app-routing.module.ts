import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./features/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
  loadChildren: () => import('./features/auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'recover-password',
    loadChildren: () => import('./features/auth/recover-password/recover-password.module').then( m => m.RecoverPasswordPageModule)
  },
  {
    path: 'select-profile',
    loadChildren: () => import('./pages/select-profile/select-profile.module').then( m => m.SelectProfilePageModule)
  },
  {
    path: 'message-register',
    loadChildren: () => import('./pages/message-register/message-register.module').then( m => m.MessageRegisterPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'create-local',
    loadChildren: () => import('./pages/create-local/create-local.module').then( m => m.CreateLocalPageModule)
  },  {
    path: 'chat',
    loadChildren: () => import('./features/chat/chat.module').then( m => m.ChatPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
