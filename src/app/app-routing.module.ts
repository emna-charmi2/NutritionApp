import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { WalkChallengeComponent } from './componentes/walk-challenge/walk-challenge.component';
import { SugarChallengeComponent } from './componentes/sugar-challenge/sugar-challenge.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registre',
    loadChildren: () => import('./registre/registre.module').then(m => m.RegistrePageModule)
  },
  {
    path: 'reset',
    loadChildren: () => import('./reset/reset.module').then( m => m.ResetPageModule)
  },
  {
    path: 'recipes',
    loadChildren: () => import('./recipes/recipes.module').then( m => m.RecipesPageModule)
  },
  {
    path: 'challenges',
    loadChildren: () => import('./challenges/challenges.module').then( m => m.ChallengesPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'fitness-journey',
    loadChildren: () => import('./fitness-journey/fitness-journey.module').then( m => m.FitnessJourneyPageModule)
  },
  {
    path: 'walk-challenge',
    component: WalkChallengeComponent,
  },
  {
    path: 'no-sugar',
    component: SugarChallengeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
