import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  { path: 'cpu', loadComponent: () => import('./features/cpu-setup/cpu-setup.component').then(m => m.CpuSetupComponent) },
  { path: 'game/cpu', loadComponent: () => import('./features/game/game.component').then(m => m.GameComponent) },
  { path: 'local', loadComponent: () => import('./features/local/local.component').then(m => m.LocalComponent) },
  { path: 'online', loadComponent: () => import('./features/online/online.component').then(m => m.OnlineComponent) },
  { path: '**', redirectTo: '' },
];