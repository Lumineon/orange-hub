import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  error = this.notificationService.errors();

  constructor(private readonly notificationService: NotificationService) { }

  ngOnInit(): void {
  }

}
