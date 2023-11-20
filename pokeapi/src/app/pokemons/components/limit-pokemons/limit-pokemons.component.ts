import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'pokemons-limit-pokemons',
  templateUrl: './limit-pokemons.component.html',
  styleUrl: './limit-pokemons.component.css'
})
export class LimitPokemonsComponent {
  @Output() limitChanged = new EventEmitter<number>();
  constructor(){}
  updateLimit(limit: number | null) {
    if (limit === null) return;
    this.limitChanged.emit(limit);
  }

}
