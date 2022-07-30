import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { RepositoryResultsComponent } from './pages/repository-results/repository-results.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'repository-results', component: RepositoryResultsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
