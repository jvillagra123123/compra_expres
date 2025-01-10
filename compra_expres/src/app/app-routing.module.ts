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
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'recover-password',
    loadChildren: () => import('./pages/recover-password/recover-password.module').then( m => m.RecoverPasswordPageModule)
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
    path: 'registers',
    loadChildren: () => import('./features/auth/registers/registers.module').then( m => m.RegistersPageModule)
  },
  {
    path: 'registersss',
    loadChildren: () => import('./features/auth/registersss/registersss.module').then( m => m.RegistersssPageModule)
  },
  {
    path: 'registers',
    loadChildren: () => import('./features/auth/registers/registers.module').then( m => m.RegistersPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
