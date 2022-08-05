import { NgModule } from '@angular/core';
import { LoadingComponent } from './loading.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, FaIconLibrary, } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [LoadingComponent],
  exports: [
    LoadingComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class LoadingModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faSpinner
    );
  }
 }
