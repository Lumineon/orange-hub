import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from './select.component';
import { options } from '../../../core/mocks/optionsMock'
import { By } from '@angular/platform-browser';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ SelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly render the passed @Input label value', () => {
    component.label = 'Ordenar por localização';
    fixture.detectChanges();
    
    const labelCompiled = fixture.debugElement.nativeElement; 
    expect(labelCompiled.querySelector('label').textContent).toBe('Ordenar por localização'); 
  });

  
  it('should correctly render the passed @Input option values', () => {
    component.options = options;
    fixture.detectChanges();
    const optionCompiled = fixture.debugElement.nativeElement; 
    expect(optionCompiled.querySelector('option').textContent).toBe('Localização (A-Z)');
    
    const bareOptions = fixture.debugElement.query(By.css('.select-options'));
    expect(bareOptions.properties['value']).toBe('localAsc');

    const allOptions = fixture.debugElement.nativeElement.querySelectorAll('option')
    const last = allOptions[allOptions.length- 1];
    expect(last.textContent).toBe('Menos forks'); 
  });

});
