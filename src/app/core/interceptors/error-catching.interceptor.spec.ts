import { fakeAsync, getTestBed, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { ErrorCatchingInterceptor } from './error-catching.interceptor';

describe('ErrorCatchingInterceptor', () => {
  let injector: TestBed;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let interceptor: ErrorCatchingInterceptor;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [],
      providers: [ErrorCatchingInterceptor]
    }).compileComponents()
    .then(() => {
        injector = getTestBed();
        httpClient = injector.get(HttpClient);
        httpMock = injector.get(HttpTestingController);
        interceptor = injector.get(ErrorCatchingInterceptor);
      });
  }));

  it('should be created', () => {
    const interceptor: ErrorCatchingInterceptor = TestBed.inject(ErrorCatchingInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
