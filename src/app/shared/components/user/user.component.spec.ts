import { ComponentFixture, TestBed, getTestBed, fakeAsync, flush } from '@angular/core/testing';
import { UserComponent } from './user.component';

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
});
