import { TestBed, getTestBed, waitForAsync } from '@angular/core/testing';
import { SortService } from './sort.service';
import { RepositoryResultsComponent } from '../../../pages/repository-results/repository-results.component'
import { RepositoryService } from '../repository/repository.service'
import { LocalStorageService } from '../local-storage/local-storage.service'
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { 
  reposInOrderStarsAsc, 
  reposInOrderStarsDesc,
  reposStarsAsc, 
  reposStarsDesc,
  reposDesc,
  reposInOrderDesc,
  mockRepositories,
  repositoriesInOrder
} from '../../mocks/sort-service/repositoriesMock'

describe('SortService', () => {
  let service: SortService;
  let repoService: RepositoryService;
  let localStorageService: LocalStorageService;
  let injector: TestBed;
  let httpClient: HttpClient;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    })
  .compileComponents()
  .then(() => {
      injector = getTestBed();
      httpClient = injector.get(HttpClient);
      service = injector.get(SortService);
      repoService = injector.get(RepositoryService);
      localStorageService = injector.get(LocalStorageService);
    });
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should order by name(asc) correctly',(() => {
      const component: RepositoryResultsComponent = new RepositoryResultsComponent(service, repoService, localStorageService);
      component.repo = mockRepositories;

      service.sortDataPerName(mockRepositories, true);
      expect(component.repo).toEqual(repositoriesInOrder);
    })
  );

  it('should order by name(desc) correctly',(() => {
      const component: RepositoryResultsComponent = new RepositoryResultsComponent(service, repoService, localStorageService);
      component.repo = reposDesc;

      service.sortDataPerName(reposDesc, false);
      expect(component.repo).toEqual(reposInOrderDesc);
    })
  );

  it('should order by stars(desc) correctly',(() => {
      const component: RepositoryResultsComponent = new RepositoryResultsComponent(service, repoService, localStorageService);
      component.repo = reposStarsDesc;

      service.sortDataPerStars(reposStarsDesc, false);
      expect(component.repo).toEqual(reposInOrderStarsDesc);
    })
  );

  it('should order by stars(asc) correctly',(() => {
      const component: RepositoryResultsComponent = new RepositoryResultsComponent(service, repoService, localStorageService);
      component.repo = reposStarsAsc;

      service.sortDataPerStars(reposStarsAsc, true);
      expect(component.repo).toEqual(reposInOrderStarsAsc);
    })
  );
});
