import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { UserService } from './core/services/user/user.service';
import { RepositoryService } from './core/services/repository/repository.service';
import { HttpClientModule } from '@angular/common/http';
import { OrderModule } from 'ngx-order-pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { UserComponent } from './shared/components/user/user.component';
import { RepositoryResultsComponent } from './pages/repository-results/repository-results.component';
import { OrderbyPipe } from './shared/pipes/orderby.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    UserComponent,
    RepositoryResultsComponent,
    OrderbyPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserService, RepositoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
