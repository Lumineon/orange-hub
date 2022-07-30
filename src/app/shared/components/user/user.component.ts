import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() user!: User;
  @Input() stars!: Array<Object>;

  constructor() { }

  ngOnInit(): void {
    console.log(this.stars)
  }

}
