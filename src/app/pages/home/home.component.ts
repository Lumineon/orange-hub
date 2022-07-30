import { Component, OnInit, Input, Output } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { UserService } from '../../core/services/user/user.service'
import { Repository } from 'src/app/core/models/repository';
import { RepositoryService } from 'src/app/core/services/repository/repository.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user!: User;
  @Output() search!: string;
  stars!: Array<Object>;
  repo!: Repository;
  @Output() isEmpty: boolean = false;

  constructor(private userService : UserService, private repositoryService : RepositoryService) { }
  ngOnInit(): void {
    // this.retrievedData = localStorage.getItem('name-data')
    // this.httpService.repoRequest(this.retrievedData)
  }

  searchUser () {
    if (this.search) {
      this.isEmpty = false
      console.log('nao vazio', this.isEmpty)
      this.userService.getUser(this.search).subscribe(users => {
        this.user = users;
      })
  
      this.userService.getStars(this.search).subscribe(stars => {
        this.stars = stars;
      })
      
      //carregar quando ir pra outra pagina
      this.repositoryService.getRepository(this.search).subscribe(repos => {
        this.repo = repos;
      })
    } else {
      this.isEmpty = true
    }
  }
}


// submitName(){
//   if(this.newUser == "") {
//     localStorage.setItem('name-data', this.user.userName)
//   }