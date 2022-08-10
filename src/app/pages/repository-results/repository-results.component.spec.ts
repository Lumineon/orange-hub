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
import { mockResponse } from '../../core/mocks/repository-service/repositoriesMock'

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
    spyOn(component, 'ngOnInit').and.callThrough();

    repositoryServiceSpy = spyOn(repositoryService, 'getRepository').and.returnValue(of(mockResponse));

    component.ngOnInit();
    fixture.detectChanges();

    expect(repositoryServiceSpy).toHaveBeenCalledTimes(1);
    expect(repositoryServiceSpy).toHaveBeenCalledWith("testeUser");
  }));
});
