import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsProductsComponent } from './news-products.component';

describe('NewsProductsComponent', () => {
  let component: NewsProductsComponent;
  let fixture: ComponentFixture<NewsProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewsProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
