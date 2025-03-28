import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter by nombre', () => {
    const event = { target: { value: 'Doña Clara' } } as unknown as Event;
    component.handleInput(event);
    expect(component.results.length).toBe(1);
    expect(component.results[0].nombre).toBe('Doña Clara');
  });

  it('should filter by comida', () => {
    const event = { target: { value: 'pizza' } } as unknown as Event;
    component.handleInput(event);
    expect(component.results.some(local => local.nombre === 'Donde Raul')).toBeTrue();
  });
});