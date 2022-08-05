import { ComponentFixture, TestBed, getTestBed, fakeAsync, flush } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { RepositoryResultsComponent } from './repository-results.component';
import { RepositoryService } from '../../core/services/repository/repository.service'
import { EMPTY, Observable, of } from 'rxjs';
import { MockComponent } from 'ng-mocks';
import { ReactiveFormsModule } from '@angular/forms';
import { Repository } from 'src/app/core/models/repository';
import { SelectComponent } from '../../shared/components/select/select.component'
import { By } from '@angular/platform-browser';

class MockService {
  getRepository(): Observable<Array<Repository>> { 
    return EMPTY; 
  }
}

describe('RepositoryResultsComponent', () => {
  let component: RepositoryResultsComponent;
  let injector: TestBed;
  let fixture: ComponentFixture<RepositoryResultsComponent>;
  let repositoryService: RepositoryService;
  let repositoryServiceSpy;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ RepositoryResultsComponent, MockComponent(SelectComponent)],
      imports: [HttpClientTestingModule, ReactiveFormsModule], 
      providers: [
        { provide: RepositoryService, useClass: MockService }
      ]
    })
    .compileComponents();
  }));
  
  beforeEach(() => {
    window.history.pushState({search: 'testeUser'}, '', '');
    injector = getTestBed();
    fixture = TestBed.createComponent(RepositoryResultsComponent);
    component = fixture.componentInstance;
    repositoryService = fixture.debugElement.injector.get(RepositoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have getRepository function', () => {
    const service: RepositoryService = TestBed.get(RepositoryService);
    expect(service.getRepository).toBeTruthy();
  });

  it('should return repositories', fakeAsync(() => {
    const service: RepositoryService = TestBed.get(RepositoryService);
    const mockResponse: Array<Repository> = [{
      name: "repo-teste",
      description: "teste",
      created_at: "11-05-10",
      forks_count: 2,
      watchers_count: 2,
      owner: []
    }]

    spyOn(component, 'ngOnInit').and.callThrough();

    repositoryServiceSpy = spyOn(repositoryService, 'getRepository').and.returnValue(of(mockResponse));

    component.ngOnInit();
    fixture.detectChanges();

    expect(repositoryServiceSpy).toHaveBeenCalledTimes(1);
    expect(repositoryServiceSpy).toHaveBeenCalledWith("testeUser");
  }));

  // it('should change select options', fakeAsync(() => {
  //   component.ngOnInit();
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => {
  //     spyOn(component, 'orderBy');
  //     const select = fixture.debugElement.query(By.directive(MockComponent(SelectComponent)));
  //     console.log(select)
  //     // select.value = select.options[1].value;
  //     // select.dispatchEvent(new Event('change'));
  //     fixture.detectChanges();
  //     expect(component.selectControl).toHaveBeenCalled();
  //   });
  //   // const select = fixture.debugElement.query(By.directive(MockComponent(SelectComponent)));
  //   // select.click();
  //   // select.value = select.options[3].value;
  //   // select.dispatchEvent(new Event('change'));
  // }));

});
