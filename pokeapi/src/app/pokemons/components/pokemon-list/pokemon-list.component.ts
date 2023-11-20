import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PokemonServiceService } from '../../service/pokemon-service.service';
import { PokemonRow } from '../../interface/pokemon.interfaces';

@Component({
  selector: 'pokemons-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent{

  @Output()
  public onEditPokemon: EventEmitter<{ index: number, pokemon: PokemonRow }> = new EventEmitter();

  @Input()
  public listPokemons: PokemonRow[] = [
    { name: 'Pikachu', first_types: 'Electric', second_types: 'aguacate', attack: 55, image: 'pikachu.jpg' },
    { name: 'Charmander', first_types: 'Fire', second_types: 'aguacate2', attack: 52, image: 'charmander.jpg' },
  ]





  deletePokemon(index: number): void{
    if (index >= 0 && index < this.listPokemons.length) {
      this.listPokemons.splice(index, 1);
    }
  }

  editarPokemon(index: number, pokemon: PokemonRow): void{
    this.onEditPokemon.emit({ index, pokemon });
  }

}
