import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RepositoryResultsComponent } from './pages/repository-results/repository-results.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: '**', component: NotFoundComponent },
  { 
    path: 'repository-results', 
    loadChildren: () => 
    import('./pages/repository-results/repository-results.module')
    .then(m => m.RepositoryResultsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
