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
  public pokemonEdited: { index: number, pokemon: PokemonRow } | null = null;
  @Input()
  public listPokemons: PokemonRow[] = []
  public pokemonEditing: boolean = false




  deletePokemon(index: number): void{
    if (index >= 0 && index < this.listPokemons.length) {
      this.listPokemons.splice(index, 1);
    }
  }

  editarPokemon(index: number, pokemon: PokemonRow): void{
    this.pokemonEditing = true;
    this.onEditPokemon.emit({ index, pokemon });
  }

  updatePokemon(updatedPokemon: PokemonRow, index: number): void {
    this.listPokemons[index] = {
      name: updatedPokemon.name,
      attack: updatedPokemon.attack,
      first_types: updatedPokemon.first_types,
      second_types: updatedPokemon.second_types,
      image: updatedPokemon.image
    };
    this.pokemonSetEditing()
  }

  createPokemon(){
    this.pokemonEditing = true;
  }

  pokemonSetEditing(){
    this.pokemonEditing = false;
  }

}
