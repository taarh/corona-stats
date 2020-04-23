import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcountriesComponent } from './listcountries.component';

describe('ListcountriesComponent', () => {
  let component: ListcountriesComponent;
  let fixture: ComponentFixture<ListcountriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListcountriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
