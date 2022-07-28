import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user';
import {UserService} from '../../core/services/user/user.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user!: User;
  homeSearch!: string;

  constructor(private userService : UserService) { }

  ngOnInit(): void {
  }

  searchGithubUser () {
    // this.homeSearch = this.searchForm.value.search;
    this.userService.getUsers(this.homeSearch).subscribe(users => {
      this.user = users;
   })

      // (error) => {
      //   console.log(error);
      //   this.displayGithubUserErrorNotFound = true;
      // }
  }
}
