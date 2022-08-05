import { TestBed, async, getTestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

const mockResponse = {
  login: "Lumineon",
  id: 46164268,
  avatar_url: "https://avatars.githubusercontent.com/u/46164268?v=4",
  name: "Milena Franco",
  location: "São Paulo, Brazil",
  bio: "Front end developer and games enthusiast. Always searching solutions for my problems and always curious about new stuff ",
  followers: 12,
  following: 5,
};

const starsMockResponse = [{
  id: 201570219,
  node_id: "MDEwOlJlcG9zaXRvcnkyMDE1NzAyMTk=",
  name: "responsively-app",
  full_name: "responsively-org/responsively-app",
},
{
  id: 54346799,
  node_id: "MDEwOlJlcG9zaXRvcnk1NDM0Njc5OQ==",
  name: "public-apis",
  full_name: "public-apis/public-apis",
}]

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