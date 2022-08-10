import { ComponentFixture, TestBed, getTestBed, fakeAsync, flush } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { mockResponse } from '../../../core/mocks/user-service/userMock'

describe('UserComponent', () => {
  let component: UserComponent;
  let injector: TestBed;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ UserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    injector = getTestBed();
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly render the passed @Input values', () => {
    const starsMockResponse = 35;
    component.user = mockResponse;
    component.stars = starsMockResponse;
    fixture.detectChanges();
    const userCompiled = fixture.debugElement.nativeElement; 
    expect(userCompiled.querySelector('h1').textContent).toBe('Lumineon'); 
    expect(userCompiled.querySelector('li').textContent).toBe('Nome: Milena Franco');

    const starsCompiled = fixture.debugElement.nativeElement.querySelectorAll('li');
    const last = starsCompiled[starsCompiled.length- 1];
    expect(last.textContent).toBe('Estrelas: 35'); 
  });
});
