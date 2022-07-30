import { Component, OnInit, Input } from '@angular/core';
import { OrderbyPipe } from 'src/app/shared/pipes/orderby.pipe';
import { Repository } from 'src/app/core/models/repository';
import { RepositoryService } from 'src/app/core/services/repository/repository.service';

@Component({
  selector: 'app-repository-results',
  templateUrl: './repository-results.component.html',
  styleUrls: ['./repository-results.component.css']
})
export class RepositoryResultsComponent implements OnInit {
  repo!: any;
  name!: string;
  owner!: any;
  orderbyPipe!: OrderbyPipe;

  constructor() { }

  ngOnInit(): void {
    this.repo = history.state.data?.repo
    this.owner = history.state.data?.repo[0]?.owner.login
    // this.name = history.state.data?.repo.name.push()
    console.log(this.repo,this.name)
  }

  orderBy(order: []){
    console.log(this.orderbyPipe)
    this.repo = this.orderbyPipe.transform(this.repo, order); 
  }
}
