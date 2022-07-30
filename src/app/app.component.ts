import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'orange-hub';

  constructor(private router:Router) {}

  hasRoute(route: string, secondRoute: string) {
    return this.router.url === route || this.router.url === secondRoute; 
  }
}
