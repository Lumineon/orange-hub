import { TestBed, async, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { Repository } from '../../models/repository';

import { RepositoryService } from './repository.service';

const mockResponse: Repository[] = [
  {
    name: "app-ideas",
    description: "A Collection of application ideas which can be used to improve your coding skills.",
    created_at: "2021-05-28T14:07:44Z",
    forks_count: 0,
    watchers_count: 0,
    owner: {}
  }
]

describe('RepositoryService', () => {
  let injector: TestBed;
  let httpClient: HttpClient;
  let service: RepositoryService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
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

  // it(`Should return error`, () => {
  //   const userSearch = 'zxczxcxzcz';
  //   const params = {userSearch}; 
  //   let response: any;
  //   let errResponse: any;

  //   spyOn(httpClient,'get').and.returnValue(throwError(() => new Error()));

  //   service.getUser('zxczxcxzcz').subscribe(() => {}, (err) => {
  //     response = err
  //   });

  //   const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
  //   const data = '404 Http failure response for https://api.github.com/users/zxczxczxczxczxcxz: 404 OK';
  //   service.getUser('zxczxcxzcz').subscribe(res => response = res, err => errResponse = err);
  //   httpMock.expectNone(`https://api.github.com/users/${userSearch}`)
  //   expect(errResponse).toBe(data);
  // });

});
