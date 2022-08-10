import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { UserService } from '../../core/services/user/user.service'
import { LocalStorageService } from '../../core/services/local-storage/local-storage.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user!: User;
  search: string = '';
  stars!: number;
  isEmpty: boolean = false;
  errorMessage: string = '';
  loading!: boolean;
  error: boolean = false;

  constructor(private userService : UserService, private storageService: LocalStorageService) { }
  ngOnInit(): void {
  }

  searchUser () {
    if (this.search) {
      this.loading = true;
      this.isEmpty = false
      const localStorageUserData = this.storageService.getData(this.search)
      if (Object.keys(localStorageUserData).length > 0) {
        const localStorageStarsData = this.storageService.getData(localStorageUserData.id)
        this.loading = false;
        this.user = localStorageUserData;
        this.stars = localStorageStarsData
        this.error = false;
      } else {
        this.userService.getUser(this.search).subscribe({
          next: (users: any)  => {            
            if (users) {       
              this.error = false;
              this.user = users;
              this.getStars();
            }
          },
          error: (error:any) => {
            this.error = true;
            if (error.status === 404){
              this.errorMessage = 'Usuário não encontrado.';
            } else if (error.status === 0){
              this.errorMessage = 'Problemas na conexão! Cheque sua conexão à internet e tente novamente'
            } else {
              this.errorMessage = error.message
            }
            this.loading = false;
          },
          complete: () => {
            this.loading = false;
          }
        });   
      }
    } else {
      this.isEmpty = true
    }
  }

  getStars(){
    this.userService.getStars(this.search).subscribe({
      next: (stars: any)  => {            
        if (stars) { 
          this.error = false;        
          this.stars = stars.length;
          this.storageService.setData((this.user.login).toLowerCase(), JSON.stringify(this.user))
          this.storageService.setData((this.user.id).toString(), JSON.stringify(this.stars))
        }
      },
      error: (error:any) => {
        this.error = true
        this.errorMessage = error;
      }
    });
  }
}