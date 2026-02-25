import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAuthor } from './list-author';

describe('ListAuthor', () => {
  let component: ListAuthor;
  let fixture: ComponentFixture<ListAuthor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAuthor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAuthor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
