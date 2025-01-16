import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./features/auth/login/login.module').then( m => m.LoginPageModule),
    canActivate: [guestGuard]
  },
  {
    path: 'register',
  loadChildren: () => import('./features/auth/register/register.module').then( m => m.RegisterPageModule),
  canActivate: [guestGuard]
  },
  {
    path: 'recover-password',
    loadChildren: () => import('./features/auth/recover-password/recover-password.module').then( m => m.RecoverPasswordPageModule),
    canActivate: [guestGuard]
  },
  {
    path: 'select-profile',
    loadChildren: () => import('./pages/select-profile/select-profile.module').then( m => m.SelectProfilePageModule),
    canActivate: [authGuard]
  },
  {
    path: 'message-register',
    loadChildren: () => import('./pages/message-register/message-register.module').then( m => m.MessageRegisterPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./features/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [authGuard]
  },
  {
    path: 'create-local',
    loadChildren: () => import('./pages/create-local/create-local.module').then( m => m.CreateLocalPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'chat',
    loadChildren: () => import('./features/chat/chat.module').then( m => m.ChatPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'search-local',
    loadChildren: () => import('./pages/search-local/search-local.module').then( m => m.SearchLocalPageModule)
  },
  {
    path: 'local',
    loadChildren: () => import('./pages/local/local.module').then( m => m.LocalPageModule)
  },
  {
    path: 'local-verification',
    loadChildren: () => import('./pages/local-verification/local-verification.module').then( m => m.LocalVerificationPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/auth/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'gestion-admin',
    loadChildren: () => import('./pages/gestion-admin/gestion-admin.module').then( m => m.GestionAdminPageModule)
  },
  {
    path: '**',
    redirectTo: 'login'
  },
  

  

  

  
  
  

  

  

  




];

@NgModule({
  imports: [
  RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
