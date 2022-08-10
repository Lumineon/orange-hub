import { getTestBed, TestBed, waitForAsync } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';
import { mockLocalStorage } from '../../mocks/local-storage-service/localStorageMock'
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  let injector: TestBed;
  let httpClient: HttpClient;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LocalStorageService]
    })

    service = TestBed.get(LocalStorageService);

    spyOn(localStorage, 'getItem')
    .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
    .and.callFake(mockLocalStorage.setItem);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store the data in localStorage', () => {
    service.setData('id', JSON.stringify('bar'));
    expect(JSON.parse(localStorage.getItem('id') || '{}')).toBe('bar'); 
  });

  it('should return stored data from localStorage', () => {
    localStorage.setItem('id', JSON.stringify('foo'));
    expect(service.getData('id')).toEqual('foo');
  });

  it('should return null for non existing items', () => {
    expect(localStorage.getItem('foo')).toBeNull(); 
  });
});