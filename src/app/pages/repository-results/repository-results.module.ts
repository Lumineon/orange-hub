import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoryResultsComponent } from './repository-results.component';
import { RouterModule, Routes } from '@angular/router';
import { SelectComponent } from '../../shared/components/select/select.component'
import { LoadingModule } from 'src/app/shared/components/loading/loading.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

let routes: Routes
@NgModule({
  declarations: [RepositoryResultsComponent, SelectComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LoadingModule,
    RouterModule.forChild( routes = [
     {
      path: '',
      component: RepositoryResultsComponent
    }
    ])
  ]
})
export class RepositoryResultsModule { }
