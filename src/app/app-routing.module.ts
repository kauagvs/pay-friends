import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from '@layouts/main/main.component';

import { AuthGuard } from '@guards/auth.guard';

const ROUTES: Routes = [
  {
    path: 'login',
    loadChildren: () => import('@pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () => import('@pages/home/home.module').then((m) => m.HomeModule),
        data: {
          title: 'Meus pagamentos',
        },
      },
      {
        path: 'profile',
        loadChildren: () => import('@pages/profile/profile.module').then((m) => m.ProfileModule),
        data: {
          layout: 'full',
        },
      },
    ],
  },
  {
    path: '**',
    loadChildren: () => import('@pages/not-found/not-found.module').then((m) => m.NotFoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
