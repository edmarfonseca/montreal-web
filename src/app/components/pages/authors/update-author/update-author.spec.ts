import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAuthor } from './update-author';

describe('UpdateAuthor', () => {
  let component: UpdateAuthor;
  let fixture: ComponentFixture<UpdateAuthor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateAuthor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAuthor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
