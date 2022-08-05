import { ComponentFixture, TestBed, getTestBed, fakeAsync, flush } from '@angular/core/testing';
import { Observable, of, throwError, EMPTY } from 'rxjs';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks';
import { HomeComponent } from './home.component';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserComponent } from 'src/app/shared/components/user/user.component';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../shared/components/button/button.component'
import { RouterTestingModule } from '@angular/router/testing';
import { LoadingComponent } from '../../shared/components/loading/loading.component'
import { User } from 'src/app/core/models/user';

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
        MockComponent(ButtonComponent), 
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

  it(`should return user and stars data`, fakeAsync(() => {
    const mockResponse: User = {
        login: 'teste', 
        id: 46164268, 
        avatar_url: 'https://avatars.githubusercontent.com/u/46164268?v=4', 
        name: 'teste', 
        location: 'teste2', 
        bio: 'lorem ipsum', 
        followers: 1, 
        following: 5
    }

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
    }
    ]
    
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

// it(`should return error message on error`, fakeAsync(() => {
//     const errorResponse = {
//       status: 400,
//       message: 'Usuário não encontrado.'
//     };
    
//     spyOn(component, 'searchUser').and.callThrough();
//     userServiceSpy = spyOn(userService, 'getUser').and.returnValue(EMPTY);
//     starsServiceSpy = spyOn(userService, 'getStars').and.returnValue(throwError(errorResponse));
//     component.error = true;

//     const button = fixture.nativeElement.querySelector('.home-button');
//     button.click();

//     component.searchUser();
//     fixture.detectChanges();

//     const error = fixture.nativeElement.querySelector('.error');
//     console.log(component, errorResponse)
//     expect(userServiceSpy).toHaveBeenCalledTimes(1);
//     expect(starsServiceSpy).toHaveBeenCalledTimes(1);
//     expect(error.textContent).toContain(errorResponse.message);
//   }));
});
