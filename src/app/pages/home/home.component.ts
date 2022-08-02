import { Component, OnInit, Input, Output } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { UserService } from '../../core/services/user/user.service'
import { Repository } from 'src/app/core/models/repository';

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
  errorMessage: string = '';
  loading!: boolean;
  error: boolean = false;
  starsError: boolean = false;

  constructor(private userService : UserService) { }
  ngOnInit(): void {
    // this.retrievedData = localStorage.getItem('name-data')
    // this.httpService.repoRequest(this.retrievedData)
  }

  searchUser () {
    this.loading = true;
    if (this.search) {
      this.isEmpty = false
      this.userService.getUser(this.search).subscribe({
        next: (users: any)  => {            
          if (users) {       
            this.error = false;
            this.user = users;
            this.userService.getStars(this.search).subscribe({
              next: (stars: any)  => {            
                if (stars) { 
                  this.starsError = false;        
                  this.stars = stars;
                }
              },
              error: (error:any) => {
                this.starsError = true
                this.errorMessage = error;
              }
            });
          }
        },
        error: (error:any) => {
          if (error.status === 404){
            this.error = true;
            this.errorMessage = 'Usuário não encontrado.';
          } else {
            this.errorMessage = error.message
          }
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });   

      //carregar quando ir pra outra pagina
      // this.repositoryService.getRepository(this.search).subscribe(repos => {
      //   this.repo = repos;
      // })

    } else {
      this.isEmpty = true
    }
  }
}


// submitName(){
//   if(this.newUser == "") {
//     localStorage.setItem('name-data', this.user.userName)
//   }