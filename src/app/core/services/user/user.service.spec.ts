import { TestBed, async, getTestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { mockResponse, starsMockResponse } from '../../mocks/user-service/userMock'

describe('UserService', () => {
  let injector: TestBed;
  let service: UserService;
  let httpClient: HttpClient;
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
        service = injector.get(UserService);
    });
  }));

  it('should be created', () => {
    const service: UserService = TestBed.inject(UserService);
    expect(service).toBeTruthy();
  });

  it(`should return user`, () => {
    const userSearch = "lumineon";
    service.getUser(userSearch).subscribe((res) => {      
      expect(res).toEqual(mockResponse);
    });

    const reqMock = httpMock.expectOne(`https://api.github.com/users/${userSearch}`);
    reqMock.flush(mockResponse);
    httpMock.verify();
  });

  it(`should return stars`, () => {
    const userSearch = "lumineon";
    service.getStars(userSearch).subscribe((res) => {      
      expect(res).toEqual(starsMockResponse);
    });

    const reqMock = httpMock.expectOne(`https://api.github.com/users/${userSearch}/starred`);
    reqMock.flush(starsMockResponse);
    httpMock.verify();
  });

  it(`should return an error when the server returns a 404 on user request`, (done: DoneFn) => {
    const userSearch = 'zxczxcxzcz';
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    spyOn(httpClient,'get').and.returnValue(throwError(() => errorResponse));

    service.getUser(userSearch).subscribe({
      next: users => done.fail('expected an error, not heroes'),
      error: error  => {
        expect(error.message).toContain('404 Not Found');
        done();
      }
    });
    httpMock.expectNone(`https://api.github.com/users/${userSearch}`)
  });

  it(`should return an error when the server returns a 404 on stars request`, (done: DoneFn) => {
    const userSearch = 'zxczxcxzcz';
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    spyOn(httpClient,'get').and.returnValue(throwError(() => errorResponse));

    service.getStars(userSearch).subscribe({
      next: users => done.fail('expected an error, not heroes'),
      error: error  => {
        expect(error.message).toContain('404 Not Found');
        done();
      }
    });
    httpMock.expectNone(`https://api.github.com/users/${userSearch}/starred`)
  });
});