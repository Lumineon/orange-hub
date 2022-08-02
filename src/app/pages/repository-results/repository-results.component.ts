import { Component, OnInit, Input } from '@angular/core';
import { Repository } from 'src/app/core/models/repository';
import { SortService } from 'src/app/core/services/sort/sort.service';
import { FormControl } from '@angular/forms';
import { Option } from 'src/app/core/models/options';
import { RepositoryService } from 'src/app/core/services/repository/repository.service';

@Component({
  selector: 'app-repository-results',
  templateUrl: './repository-results.component.html',
  styleUrls: ['./repository-results.component.css']
})
export class RepositoryResultsComponent implements OnInit {
  repo!: Array<Repository>;
  name!: string;
  owner!: string;
  options!: Option[];
  error: boolean = false;
  errorMessage: string = '';
  loading: boolean = true;
  @Input() search!: string;
  @Input() data!: any;

  selectControl = new FormControl('nameAsc');

  constructor(private func: SortService, private repositoryService : RepositoryService) { }

  ngOnInit(): void {
    this.options = [
      { value: 'nameAsc', name: 'Nome do repositório (A-Z)' },
      { value: 'nameDesc', name: 'Nome do repositório (Z-A)' },
      { value: 'starsDesc', name: 'Mais estrelas' },
      { value: 'starsAsc', name: 'Menos estrelas' }
    ];

    if (history.state.search) {
      this.repositoryService.getRepository(history.state.search).subscribe({
        next: (repo: any)  => {            
          if (repo.length > 0) { 
            this.error = false;        
            this.repo = repo;
          } else {
            this.error = true;  
            this.errorMessage = 'Usuário não possui nenhum repositório!';
          }
        },
        error: (error:any) => {
          this.error = true
          this.errorMessage = error;
        },
        complete: () => {
          this.loading = false
        }
      });
    }
  }

  orderBy(value: string){
    switch (value) {
      case 'nameDesc':
        this.func.sortDataPerName(this.repo, false)
      break;
      case 'nameAsc':
        this.func.sortDataPerName(this.repo, true)
      break;
      case 'starsDesc':
        this.func.sortDataPerStars(this.repo, false)
      break;
      case 'starsAsc':
        this.func.sortDataPerStars(this.repo, true)
      break;
   }
  }
}
