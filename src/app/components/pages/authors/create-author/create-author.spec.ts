import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAuthor } from './create-author';

describe('CreateAuthor', () => {
  let component: CreateAuthor;
  let fixture: ComponentFixture<CreateAuthor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAuthor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAuthor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
