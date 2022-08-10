import { TestBed, getTestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { mockResponse } from '../../mocks/repository-service/repositoriesMock'
import { RepositoryService } from './repository.service';

describe('RepositoryService', () => {
  let injector: TestBed;
  let httpClient: HttpClient;
  let service: RepositoryService;
  let httpMock: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: []
    }).compileComponents()
    .then(() => {
        injector = getTestBed();
        httpClient = injector.get(HttpClient);
        httpMock = injector.get(HttpTestingController);
        service = injector.get(RepositoryService);
      });
  }));

  it('should be created', () => {
    const service: RepositoryService = TestBed.inject(RepositoryService);
    expect(service).toBeTruthy();
  });

  it(`should return repositories`, () => {
    const userName = "lumineon";
    service.getRepository(userName).subscribe((res) => {      
      expect(res).toEqual(mockResponse);
    });

    const reqMock = httpMock.expectOne(`https://api.github.com/users/${userName}/repos?per_page=65`);
    reqMock.flush(mockResponse);
    httpMock.verify();
  });

  it(`should return an error when the server returns a 404`, (done: DoneFn) => {
    const userSearch = 'zxczxcxzcz';
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    spyOn(httpClient,'get').and.returnValue(throwError(() => errorResponse));

    service.getRepository(userSearch).subscribe({
      next: repos => done.fail('expected an error, not heroes'),
      error: error  => {
        expect(error.message).toContain(`404 Not Found`);
        done();
      }
    });
    httpMock.expectNone(`https://api.github.com/users/${userSearch}/repos`)
  });

});
