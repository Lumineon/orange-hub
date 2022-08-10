import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MockComponent } from 'ng-mocks';
import { FooterComponent } from './shared/components/footer/footer.component'
import { HeaderComponent } from './shared/components/header/header.component'
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let router: Router;
  let fixture: ComponentFixture<AppComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        MockComponent(FooterComponent),
        MockComponent(HeaderComponent)
      ],
    }).compileComponents()
    .then(() => {
      router = TestBed.inject(Router);
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
    });
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render header', () => {
    const header = fixture.debugElement.query(By.directive(MockComponent(HeaderComponent)));
    expect(header).toBeTruthy();
  });

  it('should validate hasRoute on home', () => {
    spyOnProperty(router, 'url', 'get').and.returnValue('/');
    expect(component.hasRoute('repository-results', '/')).toBeTruthy();
  });

  it('should validate hasRoute on repository page', () => {
    spyOnProperty(router, 'url', 'get').and.returnValue('/repository-results');
    expect(component.hasRoute('repository-results', '/')).toBeFalse();
  });
});
