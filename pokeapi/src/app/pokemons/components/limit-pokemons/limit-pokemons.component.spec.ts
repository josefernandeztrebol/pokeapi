import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitPokemonsComponent } from './limit-pokemons.component';

describe('LimitPokemonsComponent', () => {
  let component: LimitPokemonsComponent;
  let fixture: ComponentFixture<LimitPokemonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LimitPokemonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LimitPokemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
