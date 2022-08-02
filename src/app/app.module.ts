import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { UserService } from './core/services/user/user.service';
import { RepositoryService } from './core/services/repository/repository.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { DatePipe } from '@angular/common';
import { LoadingModule } from './shared/components/loading/loading.module';
import { ErrorCatchingInterceptor } from './core/interceptors/error-catching.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { UserComponent } from './shared/components/user/user.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NotificationComponent } from './shared/components/notification/notification.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    UserComponent,
    NotFoundComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoadingModule
  ],
  providers: [UserService, 
    RepositoryService, 
    DatePipe,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorCatchingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
