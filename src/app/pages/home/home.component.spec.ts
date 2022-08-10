import { ComponentFixture, TestBed, getTestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { Observable, of, throwError, EMPTY } from 'rxjs';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks';
import { HomeComponent } from './home.component';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserComponent } from 'src/app/shared/components/user/user.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoadingComponent } from '../../shared/components/loading/loading.component'
import { User } from 'src/app/core/models/user';
import { mockResponse, starsMockResponse } from '../../core/mocks/user-service/userMock'
import { HttpErrorResponse } from '@angular/common/http';

class MockUserService {
  getUser(): Observable<User> { 
    return EMPTY; 
  }
  getStars(): Observable<Array<Object>> {
    return EMPTY;
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let injector: TestBed;
  let fixture: ComponentFixture<HomeComponent>;
  let userService: UserService;
  let userServiceSpy;
  let starsServiceSpy;

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, RouterTestingModule ],
      declarations: [ 
        HomeComponent, 
        MockComponent(UserComponent), 
        MockComponent(LoadingComponent) 
      ],
      providers: [
        { provide: UserService, useClass: MockUserService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    injector = getTestBed();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.debugElement.componentInstance;
    userService = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have getUser function', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service.getUser).toBeTruthy();
   });

  it('should have getStars function', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service.getStars).toBeTruthy();
   });

  it('should call search function on form submit', fakeAsync( () => {
    fixture.detectChanges();
    spyOn(component, 'searchUser');
    const form = fixture.debugElement.query(By.css('.home-form-container > form'));
    form.triggerEventHandler('ngSubmit', null);
    tick(); 
    fixture.detectChanges();
    expect(component.searchUser).toHaveBeenCalled();
  }));

  it('should call search function on submit button click', fakeAsync( () => {
    fixture.detectChanges();
    spyOn(component, 'searchUser');
    
    const btn = fixture.debugElement.query(By.css('.home-button'));
    btn.nativeElement.click();

    tick(); 
    fixture.detectChanges();
    expect(component.searchUser).toHaveBeenCalled();
  }));

  it(`should return user and stars data`, fakeAsync(() => {
    spyOn(component, 'searchUser').and.callThrough();
    userServiceSpy = spyOn(userService, 'getUser').and.returnValue(of(mockResponse));
    starsServiceSpy = spyOn(userService, 'getStars').and.returnValue(of(starsMockResponse));

    component.search = 'teste';

    component.searchUser();
    fixture.detectChanges();

    const user = fixture.debugElement.query(By.directive(MockComponent(UserComponent)));

    expect(userServiceSpy).toHaveBeenCalledTimes(1);
    expect(starsServiceSpy).toHaveBeenCalledTimes(1);

    expect(userServiceSpy).toHaveBeenCalledWith("teste");
    expect(starsServiceSpy).toHaveBeenCalledWith("teste");

    expect(user).toBeTruthy();
    flush();
  }));

it(`should return error message on user error`, fakeAsync(() => {
    const errorResponse = new HttpErrorResponse({ status: 404, error: {}});
    const errorContainer = fixture.debugElement.query(By.css('.error'));
    
    spyOn(component, 'searchUser').and.callThrough();
    userServiceSpy = spyOn(userService, 'getUser').and.returnValue(throwError(() => errorResponse));

    component.error = true;
    component.errorMessage = errorResponse.message;

    component.search = 'user123';
    const btn = fixture.debugElement.query(By.css('.home-button'));
    btn.nativeElement.click();

    tick();
    fixture.detectChanges();

    const error = fixture.nativeElement.querySelector('.error');
    expect(error.textContent).toContain(`Erro! Usuário não encontrado.`);
    expect(component.error).toBe(true);
    expect(errorContainer).toBeTrue
  }));
});
