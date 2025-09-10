import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  { path: 'cpu', loadComponent: () => import('./features/cpu-setup/cpu-setup.component').then(m => m.CpuSetupComponent) },
  { path: 'game/cpu', loadComponent: () => import('./features/cpu-game/cpu-game.component').then(m => m.CpuGameComponent) },
  { path: 'local', loadComponent: () => import('./features/locale/locale.component').then(m => m.LocaleComponent) },
  { path: 'online', loadComponent: () => import('./features/online/online.component').then(m => m.OnlineComponent) },
  { path: '**', redirectTo: '' },
];
